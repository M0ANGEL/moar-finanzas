// // export default App;
// import React, { useState, useEffect } from "react";
// import { supabase } from "./lib/supabase";
// import Auth from "./components/Auth";
// import {
//   fetchLists,
//   createList,
//   updateListBalance,
//   deleteList as deleteListFromDB,
//   fetchTransactions,
//   createTransaction,
//   updateTransaction as updateTransactionInDB,
//   deleteTransaction as deleteTransactionFromDB,
//   fetchPockets,
//   createPocket,
//   updatePocket,
//   deletePocket as deletePocketFromDB,
//   fetchCreditCards,
//   createCreditCard,
//   updateCreditCard,
//   deleteCreditCard,
//   fetchCardTransactions,
//   createCardTransaction,
//   updateCardTransaction,
//   deleteCardTransaction,
//   fetchFixedItems,
//   createFixedItem,
//   updateFixedItem,
//   deleteFixedItem,
//   fetchReceivables,
//   createReceivable,
//   updateReceivable,
//   deleteReceivable,
//   fetchCategories,
//   createCategory,
//   deleteCategory as deleteCategoryFromDB,
// } from "./services/supabaseService";
// import "./App.css";

// function App() {
//   // ========== ESTADOS DE AUTENTICACIÓN ==========
//   const [session, setSession] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // ========== ESTADOS PRINCIPALES ==========
//   const [theme, setTheme] = useState("light");
//   const [lists, setLists] = useState([]);
//   const [activeList, setActiveList] = useState(null);
//   const [animateBalance, setAnimateBalance] = useState(false);
//   const [lastChange, setLastChange] = useState({ amount: 0, type: "" });

//   const [transactions, setTransactions] = useState([]);
//   const [showAddTransaction, setShowAddTransaction] = useState(false);
//   const [transactionType, setTransactionType] = useState("gasto");
//   const [amount, setAmount] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [selectedPocket, setSelectedPocket] = useState("");
//   const [paymentMethod, setPaymentMethod] = useState("efectivo");
//   const [selectedCard, setSelectedCard] = useState("");

//   const [editingTransaction, setEditingTransaction] = useState(null);
//   const [showEditModal, setShowEditModal] = useState(false);

//   const [creditCards, setCreditCards] = useState([]);
//   const [showCardModal, setShowCardModal] = useState(false);
//   const [cardName, setCardName] = useState("");
//   const [cardLimit, setCardLimit] = useState("");
//   const [cardCutoffDay, setCardCutoffDay] = useState("");
//   const [cardPaymentDay, setCardPaymentDay] = useState("");
//   const [cardIcon, setCardIcon] = useState("💳");
//   const [cardTransactions, setCardTransactions] = useState([]);
//   const [showCardTransaction, setShowCardTransaction] = useState(false);

//   const [fixedItems, setFixedItems] = useState([]);
//   const [showFixedItem, setShowFixedItem] = useState(false);
//   const [fixedItemType, setFixedItemType] = useState("gasto");
//   const [fixedItemName, setFixedItemName] = useState("");
//   const [fixedItemAmount, setFixedItemAmount] = useState("");
//   const [fixedItemDueDay, setFixedItemDueDay] = useState("");
//   const [fixedItemIcon, setFixedItemIcon] = useState("📋");
//   const [showPartialExpense, setShowPartialExpense] = useState(false);
//   const [selectedFixedItem, setSelectedFixedItem] = useState(null);
//   const [partialAmount, setPartialAmount] = useState("");
//   const [partialDescription, setPartialDescription] = useState("");

//   const [receivables, setReceivables] = useState([]);
//   const [showReceivable, setShowReceivable] = useState(false);
//   const [receivableName, setReceivableName] = useState("");
//   const [receivableAmount, setReceivableAmount] = useState("");
//   const [receivableDueDay, setReceivableDueDay] = useState("");
//   const [receivableIcon, setReceivableIcon] = useState("👤");
//   const [showPartialIncome, setShowPartialIncome] = useState(false);
//   const [selectedReceivable, setSelectedReceivable] = useState(null);
//   const [partialIncomeAmount, setPartialIncomeAmount] = useState("");
//   const [partialIncomeDescription, setPartialIncomeDescription] = useState("");

//   const [categories, setCategories] = useState([]);
//   const [showCategory, setShowCategory] = useState(false);
//   const [newCategoryName, setNewCategoryName] = useState("");
//   const [newCategoryIcon, setNewCategoryIcon] = useState("📦");
//   const [newCategoryType, setNewCategoryType] = useState("gasto");
//   const [customEmoji, setCustomEmoji] = useState("");

//   const [pockets, setPockets] = useState([]);
//   const [showPocket, setShowPocket] = useState(false);
//   const [pocketName, setPocketName] = useState("");
//   const [pocketAmount, setPocketAmount] = useState("");
//   const [pocketGoal, setPocketGoal] = useState("");
//   const [pocketIcon, setPocketIcon] = useState("🏦");
//   const [showTransferModal, setShowTransferModal] = useState(false);
//   const [selectedPocketForTransfer, setSelectedPocketForTransfer] = useState(null);
//   const [transferAmount, setTransferAmount] = useState("");

//   const [alerts, setAlerts] = useState([]);
//   const [activeView, setActiveView] = useState("dashboard");

//   const suggestedIcons = ["🍔","🚗","🎬","🛒","🏠","💡","📱","💵","💻","📚","🏥","🎮","☕","🍷","✈️","🏨"];
//   const pocketIcons = ["🏦","💰","💎","🎯","🏠","🚗","✈️","🎓"];
//   const cardIcons = ["💳","🏦","💎","🌟","🔥"];
//   const receivableIcons = ["👤","👨‍👩‍👧","🏢","💼","🤝"];

//   // ========== HELPERS ==========
//   const getUserId = () => session?.user?.id;

//   const formatCOP = (amount) =>
//     new Intl.NumberFormat("es-CO", {
//       style: "currency",
//       currency: "COP",
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount);

//   const handleAmountChange = (e, setter) => {
//     let value = e.target.value.replace(/[^0-9]/g, "");
//     if (value === "") { setter(""); return; }
//     setter(parseInt(value, 10).toString());
//   };

//   const triggerBalanceAnimation = (amountChanged, type) => {
//     setLastChange({ amount: amountChanged, type });
//     setAnimateBalance(true);
//     setTimeout(() => setAnimateBalance(false), 1000);
//   };

//   // ========== CARGAR DATOS ==========
//   const loadAllData = async (userId, listId) => {
//     try {
//       const [
//         listsData,
//         transactionsData,
//         pocketsData,
//         cardsData,
//         fixedData,
//         receivablesData,
//         categoriesData,
//         cardTxData,
//       ] = await Promise.all([
//         fetchLists(userId),
//         listId ? fetchTransactions(userId, listId) : fetchTransactions(userId, null),
//         listId ? fetchPockets(userId, listId) : Promise.resolve([]),
//         listId ? fetchCreditCards(userId, listId) : Promise.resolve([]),
//         listId ? fetchFixedItems(userId, listId) : Promise.resolve([]),
//         listId ? fetchReceivables(userId, listId) : Promise.resolve([]),
//         fetchCategories(userId),
//         fetchCardTransactions(userId),
//       ]);

//       setLists(listsData);
//       setTransactions(transactionsData);
//       setPockets(pocketsData);
//       setCreditCards(cardsData);
//       setFixedItems(fixedData);
//       setReceivables(receivablesData);
//       setCategories(categoriesData);
//       setCardTransactions(cardTxData);

//       if (listsData.length > 0 && !listId) {
//         setActiveList(listsData[0].id);
//       }
//     } catch (error) {
//       console.error("Error loading data:", error);
//     }
//   };

//   // ========== AUTENTICACIÓN ==========
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data: { session } }) => {
//       setSession(session);
//       if (session?.user?.id) {
//         loadAllData(session.user.id, null);
//       }
//       setLoading(false);
//     });

//     const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//       if (session?.user?.id) {
//         loadAllData(session.user.id, null);
//       }
//     });

//     return () => subscription.unsubscribe();
//   }, []);

//   // Recargar cuando cambia la lista activa
//   useEffect(() => {
//     const userId = getUserId();
//     if (userId && activeList) {
//       Promise.all([
//         fetchTransactions(userId, activeList),
//         fetchPockets(userId, activeList),
//         fetchCreditCards(userId, activeList),
//         fetchFixedItems(userId, activeList),
//         fetchReceivables(userId, activeList),
//       ]).then(([transactionsData, pocketsData, cardsData, fixedData, receivablesData]) => {
//         setTransactions(transactionsData);
//         setPockets(pocketsData);
//         setCreditCards(cardsData);
//         setFixedItems(fixedData);
//         setReceivables(receivablesData);
//       });
//     }
//   }, [activeList, session]);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme") || "light";
//     setTheme(savedTheme);
//     document.documentElement.setAttribute("data-theme", savedTheme);
//   }, []);

//   useEffect(() => {
//     const newAlerts = [];
//     const currentDay = new Date().getDate();

//     creditCards.forEach((card) => {
//       if (card.cutoff_day) {
//         const daysToCutoff = card.cutoff_day - currentDay;
//         if (daysToCutoff === 3)
//           newAlerts.push({ id: Date.now() + Math.random(), message: `⚠️ Corte de ${card.name} en 3 días`, type: "warning" });
//         else if (daysToCutoff === 1)
//           newAlerts.push({ id: Date.now() + Math.random(), message: `🔔 ¡MAÑANA! Corte de ${card.name}`, type: "danger" });
//       }
//       if (card.available_limit < card.limit_amount * 0.1)
//         newAlerts.push({ id: Date.now() + Math.random(), message: `⚠️ ${card.name}: Cupo casi agotado`, type: "danger" });
//     });

//     setAlerts(newAlerts);
//     const timer = setTimeout(() => setAlerts([]), 6000);
//     return () => clearTimeout(timer);
//   }, [creditCards]);

//   // ========== LISTAS ==========
//   const handleAddList = async () => {
//     const name = prompt("Nombre de la lista:", "Nueva Lista");
//     const userId = getUserId();
//     if (name && userId) {
//       const newList = await createList({ user_id: userId, name, balance: 0, icon: "📁" });
//       setLists((prev) => [...prev, newList]);
//       setActiveList(newList.id);
//     }
//   };

//   const handleDeleteList = async (listId) => {
//     if (window.confirm("¿Eliminar esta lista?")) {
//       await deleteListFromDB(listId);
//       setLists((prev) => {
//         const updated = prev.filter((l) => l.id !== listId);
//         if (activeList === listId && updated.length > 0) setActiveList(updated[0].id);
//         return updated;
//       });
//     }
//   };

//   // ========== TRANSACCIONES ==========
//   const canAfford = (amountToSpend) => {
//     const currentBalance = currentList?.balance || 0;
//     const totalInPockets = pockets.reduce((sum, p) => sum + p.current, 0);
//     return currentBalance - totalInPockets >= amountToSpend;
//   };

//   const handleAddTransaction = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!amount || !description || !userId) return;
//     const numAmount = parseFloat(amount);

//     if (paymentMethod === "efectivo" && transactionType === "gasto" && !canAfford(numAmount)) {
//       alert(`❌ Balance insuficiente. Disponible: ${formatCOP((currentList?.balance || 0) - pockets.reduce((sum, p) => sum + p.current, 0))}`);
//       return;
//     }

//     if (paymentMethod === "tarjeta" && transactionType === "gasto") {
//       setShowCardTransaction(true);
//       return;
//     }

//     const selectedCategory = categories.find((c) => c.name === category);
//     const newTransaction = {
//       user_id: userId,
//       list_id: activeList,
//       description,
//       amount: numAmount,
//       type: transactionType,
//       payment_method: paymentMethod,
//       category: category || (transactionType === "gasto" ? "Comida" : "Salario"),
//       category_icon: selectedCategory?.icon || (transactionType === "gasto" ? "🍔" : "💵"),
//       pocket_id: selectedPocket || null,
//       date: new Date().toISOString(),
//       date_formatted: new Date().toLocaleDateString("es-CO"),
//     };

//     const created = await createTransaction(newTransaction);
//     setTransactions((prev) => [created, ...prev]);

//     if (paymentMethod === "efectivo") {
//       const newBalance = (currentList?.balance || 0) + (transactionType === "ingreso" ? numAmount : -numAmount);
//       await updateListBalance(activeList, newBalance);
//       setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//       triggerBalanceAnimation(numAmount, transactionType);
//     }

//     if (selectedPocket && transactionType === "gasto" && paymentMethod === "efectivo") {
//       const pocket = pockets.find((p) => p.id === selectedPocket);
//       if (pocket) {
//         await updatePocket(selectedPocket, { current: pocket.current - numAmount });
//         setPockets((prev) => prev.map((p) => p.id === selectedPocket ? { ...p, current: p.current - numAmount } : p));
//       }
//     }

//     setAmount(""); setDescription(""); setCategory(""); setSelectedPocket("");
//     setShowAddTransaction(false);
//   };

//   const handleUpdateTransaction = async (e) => {
//     e.preventDefault();
//     if (!amount || !description) return;
//     const numAmount = parseFloat(amount);
//     const oldAmount = editingTransaction.amount;
//     const amountDiff = numAmount - oldAmount;

//     await updateTransactionInDB(editingTransaction.id, {
//       description, amount: numAmount, category,
//       date_formatted: new Date().toLocaleDateString("es-CO"),
//     });

//     setTransactions((prev) => prev.map((t) =>
//       t.id === editingTransaction.id ? { ...t, description, amount: numAmount, category } : t
//     ));

//     if (editingTransaction.payment_method === "efectivo" && editingTransaction.type === "gasto") {
//       const newBalance = (currentList?.balance || 0) - amountDiff;
//       await updateListBalance(activeList, newBalance);
//       setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//     }

//     setShowEditModal(false); setEditingTransaction(null);
//     setAmount(""); setDescription(""); setCategory("");
//     alert("✅ Transacción actualizada");
//   };

//   const handleDeleteTransaction = async (transactionId) => {
//     if (window.confirm("¿Eliminar esta transacción?")) {
//       const transaction = transactions.find((t) => t.id === transactionId);
//       await deleteTransactionFromDB(transactionId);

//       if (transaction.payment_method === "efectivo") {
//         const newBalance = (currentList?.balance || 0) + (transaction.type === "gasto" ? transaction.amount : -transaction.amount);
//         await updateListBalance(activeList, newBalance);
//         setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//       }

//       setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
//       alert("✅ Transacción eliminada");
//     }
//   };

//   // ========== TARJETAS ==========
//   const handleAddCreditCard = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!cardName || !cardLimit || !userId) return;

//     const newCard = await createCreditCard({
//       user_id: userId, list_id: activeList, name: cardName,
//       limit: parseFloat(cardLimit),
//       cutoff_day: cardCutoffDay ? parseInt(cardCutoffDay) : null,
//       payment_day: cardPaymentDay ? parseInt(cardPaymentDay) : null,
//       icon: cardIcon,
//     });

//     setCreditCards((prev) => [...prev, newCard]);
//     setCardName(""); setCardLimit(""); setCardCutoffDay(""); setCardPaymentDay(""); setCardIcon("💳");
//     setShowCardModal(false);
//   };

//   const handleAddCardTransaction = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!amount || !description || !userId) return;
//     const numAmount = parseFloat(amount);
//     const card = creditCards.find((c) => c.id === selectedCard);

//     if (numAmount > card.available_limit) {
//       alert(`❌ Cupo insuficiente. Disponible: ${formatCOP(card.available_limit)}`);
//       return;
//     }

//     const selectedCategory = categories.find((c) => c.name === category);
//     const newCardTransaction = {
//       user_id: userId, card_id: selectedCard, list_id: activeList,
//       description, amount: numAmount,
//       category: category || "Otros",
//       category_icon: selectedCategory?.icon || "💳",
//       date: new Date().toISOString(),
//       date_formatted: new Date().toLocaleDateString("es-CO"),
//       is_paid: false,
//     };

//     const created = await createCardTransaction(newCardTransaction);
//     setCardTransactions((prev) => [created, ...prev]);

//     const updatedCard = { available_limit: card.available_limit - numAmount, used_amount: card.used_amount + numAmount };
//     await updateCreditCard(selectedCard, updatedCard);
//     setCreditCards((prev) => prev.map((c) => c.id === selectedCard ? { ...c, ...updatedCard } : c));

//     setAmount(""); setDescription(""); setCategory(""); setSelectedCard("");
//     setShowCardTransaction(false); setShowAddTransaction(false);
//     alert(`✅ Compra registrada. Cupo restante: ${formatCOP(card.available_limit - numAmount)}`);
//   };

//   const payCard = async (cardId) => {
//     const card = creditCards.find((c) => c.id === cardId);
//     if (card.used_amount <= 0) { alert("No hay deuda pendiente"); return; }
//     if ((currentList?.balance || 0) < card.used_amount) {
//       alert(`❌ Balance insuficiente: ${formatCOP(currentList?.balance || 0)}`); return;
//     }
//     if (window.confirm(`¿Pagar ${formatCOP(card.used_amount)} de ${card.name}?`)) {
//       const userId = getUserId();
//       const newBalance = (currentList?.balance || 0) - card.used_amount;
//       await updateListBalance(activeList, newBalance);
//       setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//       triggerBalanceAnimation(card.used_amount, "gasto");

//       await updateCreditCard(cardId, { available_limit: card.limit_amount, used_amount: 0 });
//       setCreditCards((prev) => prev.map((c) => c.id === cardId ? { ...c, available_limit: c.limit_amount, used_amount: 0 } : c));

//       for (const tx of cardTransactions.filter((t) => t.card_id === cardId && !t.is_paid)) {
//         await updateCardTransaction(tx.id, { is_paid: true });
//       }
//       setCardTransactions((prev) => prev.map((t) => t.card_id === cardId ? { ...t, is_paid: true } : t));

//       const paymentTx = {
//         user_id: userId, list_id: activeList,
//         description: `💳 Pago tarjeta ${card.name}`,
//         amount: card.used_amount, type: "gasto", payment_method: "efectivo",
//         category: "Pago Tarjeta", category_icon: "💳",
//         date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
//       };
//       const created = await createTransaction(paymentTx);
//       setTransactions((prev) => [created, ...prev]);
//       alert(`✅ Pagado ${formatCOP(card.used_amount)} de ${card.name}`);
//     }
//   };

//   const deleteCard = async (cardId) => {
//     const card = creditCards.find((c) => c.id === cardId);
//     if (card && card.used_amount > 0) { alert(`Primero paga la deuda de ${formatCOP(card.used_amount)}`); return; }
//     if (window.confirm("¿Eliminar esta tarjeta?")) {
//       await deleteCreditCard(cardId);
//       setCreditCards((prev) => prev.filter((c) => c.id !== cardId));
//     }
//   };

//   // ========== PRESUPUESTOS ==========
//   const handleAddFixedItem = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!fixedItemName || !fixedItemAmount || !userId) return;

//     const newItem = await createFixedItem({
//       user_id: userId, list_id: activeList, name: fixedItemName,
//       amount: parseFloat(fixedItemAmount), collected: 0,
//       due_day: fixedItemDueDay ? parseInt(fixedItemDueDay) : null,
//       type: fixedItemType, icon: fixedItemIcon,
//     });

//     setFixedItems((prev) => [...prev, newItem]);
//     setFixedItemName(""); setFixedItemAmount(""); setFixedItemDueDay(""); setFixedItemIcon("📋");
//     setShowFixedItem(false);
//   };

//   const handleAddPartialExpense = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!partialAmount || parseFloat(partialAmount) <= 0 || !userId) return;
//     const numAmount = parseFloat(partialAmount);
//     const remainingBudget = selectedFixedItem.amount - selectedFixedItem.collected;

//     if (numAmount > remainingBudget) { alert(`⚠️ Solo quedan ${formatCOP(remainingBudget)} de presupuesto`); return; }
//     if ((currentList?.balance || 0) < numAmount) { alert(`❌ Balance insuficiente: ${formatCOP(currentList?.balance || 0)}`); return; }

//     const newCollected = selectedFixedItem.collected + numAmount;
//     await updateFixedItem(selectedFixedItem.id, { collected: newCollected });
//     setFixedItems((prev) => prev.map((item) => item.id === selectedFixedItem.id ? { ...item, collected: newCollected } : item));

//     const newBalance = (currentList?.balance || 0) - numAmount;
//     await updateListBalance(activeList, newBalance);
//     setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//     triggerBalanceAnimation(numAmount, "gasto");

//     const created = await createTransaction({
//       user_id: userId, list_id: activeList,
//       description: partialDescription || selectedFixedItem.name,
//       amount: numAmount, type: "gasto", payment_method: "efectivo",
//       category: selectedFixedItem.name, category_icon: selectedFixedItem.icon,
//       date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
//     });
//     setTransactions((prev) => [created, ...prev]);

//     setShowPartialExpense(false); setPartialAmount(""); setPartialDescription(""); setSelectedFixedItem(null);
//     alert(`✅ Gastaste ${formatCOP(numAmount)}. Restan ${formatCOP(remainingBudget - numAmount)}`);
//   };

//   // ========== POR COBRAR ==========
//   const handleAddReceivable = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!receivableName || !receivableAmount || !userId) return;

//     const newReceivable = await createReceivable({
//       user_id: userId, list_id: activeList, name: receivableName,
//       amount: parseFloat(receivableAmount), collected: 0,
//       due_day: receivableDueDay ? parseInt(receivableDueDay) : null,
//       icon: receivableIcon,
//     });

//     setReceivables((prev) => [...prev, newReceivable]);
//     setReceivableName(""); setReceivableAmount(""); setReceivableDueDay(""); setReceivableIcon("👤");
//     setShowReceivable(false);
//   };

//   const handleAddPartialIncome = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!partialIncomeAmount || parseFloat(partialIncomeAmount) <= 0 || !userId) return;
//     const numAmount = parseFloat(partialIncomeAmount);
//     const remainingReceivable = selectedReceivable.amount - selectedReceivable.collected;

//     if (numAmount > remainingReceivable) { alert(`⚠️ Solo quedan por cobrar ${formatCOP(remainingReceivable)}`); return; }

//     const newCollected = selectedReceivable.collected + numAmount;
//     await updateReceivable(selectedReceivable.id, { collected: newCollected });
//     setReceivables((prev) => prev.map((item) => item.id === selectedReceivable.id ? { ...item, collected: newCollected } : item));

//     const newBalance = (currentList?.balance || 0) + numAmount;
//     await updateListBalance(activeList, newBalance);
//     setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//     triggerBalanceAnimation(numAmount, "ingreso");

//     const created = await createTransaction({
//       user_id: userId, list_id: activeList,
//       description: partialIncomeDescription || `💰 Cobro: ${selectedReceivable.name}`,
//       amount: numAmount, type: "ingreso", payment_method: "efectivo",
//       category: "Deuda Cobrada", category_icon: "💰",
//       date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
//     });
//     setTransactions((prev) => [created, ...prev]);

//     setShowPartialIncome(false); setPartialIncomeAmount(""); setPartialIncomeDescription(""); setSelectedReceivable(null);
//     alert(`✅ Cobraste ${formatCOP(numAmount)}. Restan por cobrar ${formatCOP(remainingReceivable - numAmount)}`);
//   };

//   // ========== BOLSILLOS ==========
//   const handleAddPocket = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();
//     if (!pocketName || !pocketAmount || !userId) return;

//     const newPocket = await createPocket({
//       user_id: userId, list_id: activeList, name: pocketName,
//       total: parseFloat(pocketAmount), current: parseFloat(pocketAmount),
//       goal: pocketGoal ? parseFloat(pocketGoal) : null, icon: pocketIcon,
//     });

//     setPockets((prev) => [...prev, newPocket]);
//     setPocketName(""); setPocketAmount(""); setPocketGoal(""); setPocketIcon("🏦");
//     setShowPocket(false);
//   };

//   const executeTransfer = async () => {
//     const userId = getUserId();
//     if (!transferAmount || parseFloat(transferAmount) <= 0 || !userId) return;
//     const numAmount = parseFloat(transferAmount);
//     const availableMoney = (currentList?.balance || 0) - pockets.reduce((sum, p) => sum + p.current, 0);

//     if (availableMoney >= numAmount) {
//       const newBalance = (currentList?.balance || 0) - numAmount;
//       await updateListBalance(activeList, newBalance);
//       setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//       triggerBalanceAnimation(numAmount, "gasto");

//       const newCurrent = selectedPocketForTransfer.current + numAmount;
//       await updatePocket(selectedPocketForTransfer.id, { current: newCurrent });
//       setPockets((prev) => prev.map((p) => p.id === selectedPocketForTransfer.id ? { ...p, current: newCurrent } : p));

//       const created = await createTransaction({
//         user_id: userId, list_id: activeList,
//         description: `📦 Transferencia a ${selectedPocketForTransfer.name}`,
//         amount: numAmount, type: "gasto", payment_method: "efectivo",
//         category: "Bolsillos", category_icon: "🏦",
//         date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
//       });
//       setTransactions((prev) => [created, ...prev]);

//       alert(`✅ Transferido ${formatCOP(numAmount)} a ${selectedPocketForTransfer.name}`);
//       setShowTransferModal(false); setTransferAmount(""); setSelectedPocketForTransfer(null);
//     } else {
//       alert(`❌ Disponible: ${formatCOP(availableMoney)}`);
//     }
//   };

//   const handleDeletePocket = async (pocketId) => {
//     if (window.confirm("¿Eliminar este bolsillo? El dinero volverá al balance")) {
//       const pocket = pockets.find((p) => p.id === pocketId);
//       if (pocket && pocket.current > 0) {
//         const newBalance = (currentList?.balance || 0) + pocket.current;
//         await updateListBalance(activeList, newBalance);
//         setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//         triggerBalanceAnimation(pocket.current, "ingreso");
//       }
//       await deletePocketFromDB(pocketId);
//       setPockets((prev) => prev.filter((p) => p.id !== pocketId));
//     }
//   };

//   // ========== CATEGORÍAS ==========
//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     const userId = getUserId();

//     if (!newCategoryName.trim()) { alert("❌ Por favor ingresa un nombre para la categoría"); return; }
//     if (!userId) { alert("❌ Sesión no válida. Por favor inicia sesión nuevamente."); return; }

//     const exists = categories.some((c) => c.name.toLowerCase() === newCategoryName.toLowerCase());
//     if (exists) { alert(`❌ Ya existe una categoría llamada "${newCategoryName}"`); return; }

//     const finalIcon = customEmoji || newCategoryIcon;

//     try {
//       const newCategory = await createCategory({
//         user_id: userId, name: newCategoryName,
//         icon: finalIcon, type: newCategoryType,
//       });

//       setCategories((prev) => [...prev, newCategory]);
//       setNewCategoryName(""); setNewCategoryIcon("📦"); setCustomEmoji("");
//       setShowCategory(false);
//       alert("✅ Categoría creada exitosamente");
//     } catch (error) {
//       console.error("Error completo:", error);
//       if (error.message?.includes("duplicate") || error.code === "23505") {
//         alert(`❌ Ya existe una categoría llamada "${newCategoryName}"`);
//       } else {
//         alert(`❌ Error al crear categoría: ${error.message}`);
//       }
//     }
//   };

//   const handleDeleteCategory = async (categoryId) => {
//     if (window.confirm("¿Eliminar esta categoría?")) {
//       await deleteCategoryFromDB(categoryId);
//       setCategories((prev) => prev.filter((c) => c.id !== categoryId));
//     }
//   };

//   // ========== UTILIDADES ==========
//   const toggleTheme = () => {
//     const newTheme = theme === "light" ? "dark" : "light";
//     setTheme(newTheme);
//     document.documentElement.setAttribute("data-theme", newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   const handleLogout = async () => {
//     await supabase.auth.signOut();
//     setSession(null);
//     setLists([]); setTransactions([]); setPockets([]);
//     setCreditCards([]); setFixedItems([]); setReceivables([]);
//     setCategories([]); setActiveList(null);
//   };

//   const currentList = lists.find((l) => l.id === activeList);
//   const listTransactions = transactions.filter((t) => t.list_id === activeList);
//   const totalInPockets = pockets.reduce((sum, p) => sum + p.current, 0);
//   const availableBalance = (currentList?.balance || 0) - totalInPockets;
//   const totalCardDebt = creditCards.reduce((sum, c) => sum + c.used_amount, 0);
//   const totalPendingExpenses = fixedItems.filter((i) => i.type === "gasto").reduce((sum, e) => sum + (e.amount - e.collected), 0);
//   const totalPendingReceivables = receivables.reduce((sum, r) => sum + (r.amount - r.collected), 0);
//   const netWorth = (currentList?.balance || 0) - totalCardDebt + totalPendingReceivables - totalPendingExpenses;

//   if (loading) {
//     return (
//       <div className="auth-loading">
//         <div className="spinner"></div>
//         <p>Cargando...</p>
//       </div>
//     );
//   }

//   if (!session) {
//     return <Auth onAuthSuccess={(session) => setSession(session)} />;
//   }

//   return (
//     <div className="app">
//       <div className="header">
//         <h1>💰 MOAR</h1>
//         <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
//           <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
//             {session.user?.email || ""}
//           </span>
//           <button className="theme-toggle" onClick={toggleTheme}>
//             {theme === "light" ? "🌙" : "☀️"}
//           </button>
//           <button className="theme-toggle" onClick={handleLogout}>🚪</button>
//         </div>
//       </div>

//       {alerts.length > 0 && (
//         <div className="alerts-container">
//           {alerts.map((alert) => (
//             <div key={alert.id} className={`alert ${alert.type}`}>
//               {alert.message}
//               <button onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}>✖</button>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="list-selector">
//         {lists.map((list) => (
//           <button
//             key={list.id}
//             className={`list-btn ${activeList === list.id ? "active" : ""}`}
//             onClick={() => setActiveList(list.id)}
//           >
//             {list.icon} {list.name}
//             <span className="delete-list" onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}>🗑️</span>
//           </button>
//         ))}
//         <button className="list-btn add-list" onClick={handleAddList}>+ Nueva</button>
//       </div>

//       <div className="view-nav">
//         {[
//           { id: "dashboard", label: "📊 Dashboard" },
//           { id: "cards", label: "💳 Tarjetas" },
//           { id: "budgets", label: "🎯 Presupuestos" },
//           { id: "receivables", label: "💰 Por Cobrar" },
//           { id: "pockets", label: "🏦 Bolsillos" },
//           { id: "categories", label: "🏷️ Categorías" },
//         ].map((v) => (
//           <button key={v.id} className={`view-btn ${activeView === v.id ? "active" : ""}`} onClick={() => setActiveView(v.id)}>
//             {v.label}
//           </button>
//         ))}
//       </div>

//       {/* ========== DASHBOARD ========== */}
//       {activeView === "dashboard" && (
//         <>
//           <div className={`balance-card ${animateBalance ? "animate" : ""}`}>
//             <h2>Balance Actual</h2>
//             <div className="balance-amount">{formatCOP(currentList?.balance || 0)}</div>
//             {lastChange.amount > 0 && (
//               <div className={`balance-change ${lastChange.type}`}>
//                 {lastChange.type === "gasto" ? "-" : "+"}{formatCOP(lastChange.amount)}
//               </div>
//             )}
//             <div className="balance-details">
//               <span>💰 Disponible: {formatCOP(availableBalance)}</span>
//               <span>🏦 En bolsillos: {formatCOP(totalInPockets)}</span>
//             </div>
//             {totalCardDebt > 0 && <div className="card-debt-warning">💳 Deuda tarjetas: {formatCOP(totalCardDebt)}</div>}
//             {totalPendingReceivables > 0 && <div className="receivable-info">💰 Por cobrar: {formatCOP(totalPendingReceivables)}</div>}
//             <div className="net-worth">💰 Patrimonio neto: {formatCOP(netWorth)}</div>
//           </div>

//           <div className="action-buttons">
//             <button className="action-btn gasto" onClick={() => { setTransactionType("gasto"); setShowAddTransaction(true); }}>➕ Gasto</button>
//             <button className="action-btn ingreso" onClick={() => { setTransactionType("ingreso"); setShowAddTransaction(true); }}>📈 Ingreso</button>
//             <button className="action-btn card" onClick={() => setActiveView("cards")}>💳 Tarjetas</button>
//           </div>

//           {creditCards.length > 0 && (
//             <div className="cards-summary">
//               <h3>💳 Tarjetas de Crédito</h3>
//               {creditCards.map((card) => {
//                 const usagePercent = (card.used_amount / card.limit_amount) * 100;
//                 return (
//                   <div key={card.id} className="card-mini-card">
//                     <div className="card-mini-header">
//                       <span>{card.icon} {card.name}</span>
//                       <span className={`card-usage ${usagePercent > 80 ? "danger" : usagePercent > 50 ? "warning" : ""}`}>
//                         {formatCOP(card.used_amount)} / {formatCOP(card.limit_amount)}
//                       </span>
//                     </div>
//                     <div className="progress-bar">
//                       <div className="progress-fill" style={{ width: `${Math.min(usagePercent, 100)}%`, background: usagePercent > 80 ? "#e74c3c" : usagePercent > 50 ? "#f39c12" : "#2ecc71" }}></div>
//                     </div>
//                     <div className="card-mini-footer">
//                       <span>Disponible: {formatCOP(card.available_limit)}</span>
//                       {card.used_amount > 0 && <button onClick={() => payCard(card.id)} className="pay-mini-btn">Pagar</button>}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {fixedItems.filter((i) => i.type === "gasto").length > 0 && (
//             <div className="budgets-summary">
//               <h3>🎯 Presupuestos activos</h3>
//               {fixedItems.filter((i) => i.type === "gasto").slice(0, 3).map((budget) => {
//                 const progress = (budget.collected / budget.amount) * 100;
//                 return (
//                   <div key={budget.id} className="budget-progress-item">
//                     <div className="budget-header">
//                       <span>{budget.icon} {budget.name}</span>
//                       <span>{formatCOP(budget.collected)} / {formatCOP(budget.amount)}</span>
//                     </div>
//                     <div className="progress-bar">
//                       <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%`, background: progress > 90 ? "#e74c3c" : "#2ecc71" }}></div>
//                     </div>
//                     <div className="budget-remaining">Restante: {formatCOP(budget.amount - budget.collected)}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {receivables.length > 0 && (
//             <div className="receivables-summary">
//               <h3>💰 Por cobrar</h3>
//               {receivables.slice(0, 3).map((item) => {
//                 const progress = (item.collected / item.amount) * 100;
//                 return (
//                   <div key={item.id} className="receivable-progress-item">
//                     <div className="receivable-header">
//                       <span>{item.icon} {item.name}</span>
//                       <span>{formatCOP(item.collected)} / {formatCOP(item.amount)}</span>
//                     </div>
//                     <div className="progress-bar">
//                       <div className="progress-fill receivable-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
//                     </div>
//                     <div className="receivable-remaining">Por cobrar: {formatCOP(item.amount - item.collected)}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {pockets.length > 0 && (
//             <div className="pockets-summary">
//               <h3>🏦 Mis Bolsillos</h3>
//               <div className="pockets-grid">
//                 {pockets.map((pocket) => (
//                   <div key={pocket.id} className="pocket-mini-card">
//                     <span className="pocket-icon">{pocket.icon}</span>
//                     <span className="pocket-name">{pocket.name}</span>
//                     <span className="pocket-amount">{formatCOP(pocket.current)}</span>
//                     {pocket.goal && (
//                       <div className="pocket-goal-progress">
//                         <div className="goal-fill" style={{ width: `${Math.min((pocket.current / pocket.goal) * 100, 100)}%` }}></div>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           <div className="transactions">
//             <h3>📜 Últimos movimientos</h3>
//             {listTransactions.length === 0 ? (
//               <p className="empty">No hay movimientos aún</p>
//             ) : (
//               listTransactions.slice(0, 10).map((t) => (
//                 <div key={t.id} className={`transaction ${t.type}`} onClick={() => {
//                   setEditingTransaction(t); setAmount(t.amount.toString()); setDescription(t.description); setCategory(t.category); setShowEditModal(true);
//                 }}>
//                   <span className="category-icon">{t.category_icon}</span>
//                   <span className="desc">{t.description}</span>
//                   <span className="payment-method-badge">{t.payment_method === "tarjeta" ? "💳" : "💰"}</span>
//                   <span className="category-name">{t.category}</span>
//                   <span className="amount">{t.type === "gasto" ? "-" : "+"}{formatCOP(t.amount)}</span>
//                   <span className="date">{t.date_formatted}</span>
//                   <button className="delete-transaction-btn" onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(t.id); }}>🗑️</button>
//                 </div>
//               ))
//             )}
//           </div>
//         </>
//       )}

//       {/* ========== TARJETAS ========== */}
//       {activeView === "cards" && (
//         <div className="cards-view">
//           <div className="section-header">
//             <h3>💳 Tarjetas de Crédito</h3>
//             <button onClick={() => setShowCardModal(true)} className="add-fixed-btn">+ Nueva Tarjeta</button>
//           </div>
//           {creditCards.length === 0 ? <p className="empty">No hay tarjetas de crédito</p> : (
//             creditCards.map((card) => {
//               const usagePercent = (card.used_amount / card.limit_amount) * 100;
//               return (
//                 <div key={card.id} className="card-detail">
//                   <div className="card-header">
//                     <div className="card-title">
//                       <span className="card-icon-large">{card.icon}</span>
//                       <div>
//                         <h4>{card.name}</h4>
//                         {card.cutoff_day && <small>Corte día {card.cutoff_day} | Pago día {card.payment_day}</small>}
//                       </div>
//                     </div>
//                     <div className="card-actions">
//                       {card.used_amount > 0 && <button onClick={() => payCard(card.id)} className="pay-card-btn">💰 Pagar {formatCOP(card.used_amount)}</button>}
//                       <button onClick={() => deleteCard(card.id)} className="delete-btn">🗑️</button>
//                     </div>
//                   </div>
//                   <div className="card-stats">
//                     <div className="stat"><span>Cupo total:</span><strong>{formatCOP(card.limit_amount)}</strong></div>
//                     <div className="stat"><span>Usado:</span><strong className="used">{formatCOP(card.used_amount)}</strong></div>
//                     <div className="stat"><span>Disponible:</span><strong className="available">{formatCOP(card.available_limit)}</strong></div>
//                   </div>
//                   <div className="progress-bar">
//                     <div className="progress-fill" style={{ width: `${Math.min(usagePercent, 100)}%`, background: usagePercent > 80 ? "#e74c3c" : usagePercent > 50 ? "#f39c12" : "#2ecc71" }}></div>
//                   </div>
//                   {cardTransactions.filter((t) => t.card_id === card.id).length > 0 && (
//                     <div className="card-transactions-list">
//                       <h5>Compras recientes</h5>
//                       {cardTransactions.filter((t) => t.card_id === card.id).map((t) => (
//                         <div key={t.id} className="card-transaction-item">
//                           <span className="card-tx-icon">{t.category_icon}</span>
//                           <span className="card-tx-desc">{t.description}</span>
//                           <span className="card-tx-amount">{formatCOP(t.amount)}</span>
//                           <span className="card-tx-date">{t.date_formatted}</span>
//                           {!t.is_paid && <button onClick={() => deleteCardTransaction(t.id)} className="cancel-tx-btn">Cancelar</button>}
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}

//       {/* ========== PRESUPUESTOS ========== */}
//       {activeView === "budgets" && (
//         <div className="budgets-view">
//           <div className="section-header">
//             <h3>🎯 Presupuestos de Gastos</h3>
//             <button onClick={() => { setFixedItemType("gasto"); setShowFixedItem(true); }} className="add-fixed-btn">+ Nuevo Presupuesto</button>
//           </div>
//           {fixedItems.filter((i) => i.type === "gasto").length === 0 ? <p className="empty">No hay presupuestos creados</p> : (
//             fixedItems.filter((i) => i.type === "gasto").map((item) => {
//               const progress = (item.collected / item.amount) * 100;
//               const remaining = item.amount - item.collected;
//               return (
//                 <div key={item.id} className="budget-card">
//                   <div className="budget-card-header">
//                     <div className="budget-title">
//                       <span className="budget-icon">{item.icon}</span>
//                       <div><h4>{item.name}</h4>{item.due_day && <small>Vence día {item.due_day}</small>}</div>
//                     </div>
//                     <div className="budget-stats">
//                       <span className="budget-spent">{formatCOP(item.collected)}</span>
//                       <span className="budget-divider">/</span>
//                       <span className="budget-total">{formatCOP(item.amount)}</span>
//                     </div>
//                   </div>
//                   <div className="progress-bar">
//                     <div className={`progress-fill ${progress >= 100 ? "over-budget" : ""}`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
//                   </div>
//                   <div className={`budget-remaining ${remaining < 0 ? "negative" : ""}`}>
//                     {progress >= 100 ? "✅ Completado" : `📊 Restante: ${formatCOP(remaining)} (${Math.round(progress)}% usado)`}
//                   </div>
//                   <div className="budget-actions">
//                     <button onClick={() => { setSelectedFixedItem(item); setShowPartialExpense(true); }} className="partial-btn">💸 Registrar gasto</button>
//                     {remaining > 0 && (
//                       <button onClick={async () => {
//                         if (window.confirm(`¿Pagar los ${formatCOP(remaining)} restantes de ${item.name}?`)) {
//                           await updateFixedItem(item.id, { collected: item.amount });
//                           setFixedItems((prev) => prev.map((i) => i.id === item.id ? { ...i, collected: item.amount } : i));
//                           const newBalance = (currentList?.balance || 0) - remaining;
//                           await updateListBalance(activeList, newBalance);
//                           setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//                           triggerBalanceAnimation(remaining, "gasto");
//                           alert(`✅ Pagado ${formatCOP(remaining)} de ${item.name}`);
//                         }
//                       }} className="full-btn">✅ Pagar todo</button>
//                     )}
//                     <button onClick={() => deleteFixedItem(item.id)} className="delete-btn">🗑️</button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}

//       {/* ========== POR COBRAR ========== */}
//       {activeView === "receivables" && (
//         <div className="receivables-view">
//           <div className="section-header">
//             <h3>💰 Ingresos por Cobrar</h3>
//             <button onClick={() => setShowReceivable(true)} className="add-fixed-btn">+ Nueva Deuda</button>
//           </div>
//           {receivables.length === 0 ? <p className="empty">No hay ingresos por cobrar</p> : (
//             receivables.map((item) => {
//               const progress = (item.collected / item.amount) * 100;
//               const remaining = item.amount - item.collected;
//               return (
//                 <div key={item.id} className="receivable-card">
//                   <div className="receivable-card-header">
//                     <div className="receivable-title">
//                       <span className="receivable-icon">{item.icon}</span>
//                       <div><h4>{item.name}</h4>{item.due_day && <small>Vence día {item.due_day}</small>}</div>
//                     </div>
//                     <div className="receivable-stats">
//                       <span className="receivable-collected">{formatCOP(item.collected)}</span>
//                       <span className="receivable-divider">/</span>
//                       <span className="receivable-total">{formatCOP(item.amount)}</span>
//                     </div>
//                   </div>
//                   <div className="progress-bar">
//                     <div className="progress-fill receivable-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
//                   </div>
//                   <div className="receivable-remaining">
//                     {progress >= 100 ? "✅ Completado" : `💰 Por cobrar: ${formatCOP(remaining)} (${Math.round(progress)}% cobrado)`}
//                   </div>
//                   <div className="receivable-actions">
//                     <button onClick={() => { setSelectedReceivable(item); setShowPartialIncome(true); }} className="partial-income-btn">💵 Registrar cobro</button>
//                     {remaining > 0 && (
//                       <button onClick={async () => {
//                         if (window.confirm(`¿Registrar cobro completo de ${formatCOP(remaining)} de ${item.name}?`)) {
//                           await updateReceivable(item.id, { collected: item.amount });
//                           setReceivables((prev) => prev.map((r) => r.id === item.id ? { ...r, collected: item.amount } : r));
//                           const newBalance = (currentList?.balance || 0) + remaining;
//                           await updateListBalance(activeList, newBalance);
//                           setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
//                           triggerBalanceAnimation(remaining, "ingreso");
//                           alert(`✅ Cobrado ${formatCOP(remaining)} de ${item.name}`);
//                         }
//                       }} className="full-income-btn">✅ Cobrar todo</button>
//                     )}
//                     <button onClick={() => deleteReceivable(item.id)} className="delete-btn">🗑️</button>
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}

//       {/* ========== BOLSILLOS ========== */}
//       {activeView === "pockets" && (
//         <div className="pockets-view">
//           <div className="section-header">
//             <h3>🏦 Mis Bolsillos</h3>
//             <button onClick={() => setShowPocket(true)} className="add-fixed-btn">+ Nuevo Bolsillo</button>
//           </div>
//           <div className="balance-info">
//             <div className="info-card"><span>💰 Balance disponible:</span><strong>{formatCOP(availableBalance)}</strong></div>
//           </div>
//           {pockets.length === 0 ? <p className="empty">No hay bolsillos</p> : (
//             pockets.map((pocket) => {
//               const progress = pocket.goal ? (pocket.current / pocket.goal) * 100 : 0;
//               return (
//                 <div key={pocket.id} className="pocket-card">
//                   <div className="pocket-header">
//                     <div className="pocket-title">
//                       <span className="pocket-icon-large">{pocket.icon}</span>
//                       <div><h4>{pocket.name}</h4>{pocket.goal && <small>Meta: {formatCOP(pocket.goal)}</small>}</div>
//                     </div>
//                     <div className="pocket-actions">
//                       <button onClick={() => { setSelectedPocketForTransfer(pocket); setShowTransferModal(true); }} className="transfer-btn">➕ Transferir</button>
//                       <button onClick={() => handleDeletePocket(pocket.id)} className="delete-btn">🗑️</button>
//                     </div>
//                   </div>
//                   <div className="pocket-balance">
//                     <span className="balance-label">Ahorrado:</span>
//                     <span className="balance-value">{formatCOP(pocket.current)}</span>
//                   </div>
//                   {pocket.goal && (
//                     <>
//                       <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div></div>
//                       <div className="pocket-goal-info">{progress >= 100 ? "🎉 ¡Meta alcanzada!" : `Falta ${formatCOP(pocket.goal - pocket.current)}`}</div>
//                     </>
//                   )}
//                 </div>
//               );
//             })
//           )}
//         </div>
//       )}

//       {/* ========== CATEGORÍAS ========== */}
//       {activeView === "categories" && (
//         <div className="categories-view">
//           <div className="section-header">
//             <h3>🏷️ Categorías</h3>
//             <button onClick={() => setShowCategory(true)} className="add-fixed-btn">+ Nueva</button>
//           </div>
//           <div className="categories-grid">
//             {categories.map((cat) => (
//               <div key={cat.id} className="category-card">
//                 <span className="category-icon-large">{cat.icon}</span>
//                 <span className="category-name">{cat.name}</span>
//                 <span className={`category-type ${cat.type}`}>{cat.type}</span>
//                 <button onClick={() => handleDeleteCategory(cat.id)} className="delete-cat-btn">🗑️</button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* ========== MODALES ========== */}

//       {showAddTransaction && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>{transactionType === "gasto" ? "💰 Gasto" : "📈 Ingreso"}</h3>
//             <form onSubmit={handleAddTransaction}>
//               <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="0" value={amount ? formatCOP(parseInt(amount)) : ""} onChange={(e) => handleAmountChange(e, setAmount)} required />
//               </div>
//               <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
//                 <option value="efectivo">💰 Efectivo / Débito</option>
//                 <option value="tarjeta">💳 Tarjeta de Crédito</option>
//               </select>
//               {paymentMethod === "tarjeta" && transactionType === "gasto" && (
//                 <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)} required>
//                   <option value="">Seleccionar tarjeta</option>
//                   {creditCards.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name} (Disponible: {formatCOP(c.available_limit)})</option>)}
//                 </select>
//               )}
//               <select value={category} onChange={(e) => setCategory(e.target.value)}>
//                 <option value="">Seleccionar categoría</option>
//                 {categories.filter((c) => c.type === transactionType).map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
//               </select>
//               {transactionType === "gasto" && paymentMethod === "efectivo" && pockets.length > 0 && (
//                 <select value={selectedPocket} onChange={(e) => setSelectedPocket(e.target.value)}>
//                   <option value="">Sin bolsillo</option>
//                   {pockets.map((p) => <option key={p.id} value={p.id}>{p.icon} {p.name} ({formatCOP(p.current)})</option>)}
//                 </select>
//               )}
//               <div className="modal-buttons">
//                 <button type="submit">Guardar</button>
//                 <button type="button" onClick={() => setShowAddTransaction(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showEditModal && editingTransaction && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>✏️ Editar Transacción</h3>
//             <form onSubmit={handleUpdateTransaction}>
//               <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="0" value={amount ? formatCOP(parseInt(amount)) : ""} onChange={(e) => handleAmountChange(e, setAmount)} required />
//               </div>
//               <select value={category} onChange={(e) => setCategory(e.target.value)}>
//                 <option value="">Seleccionar categoría</option>
//                 {categories.filter((c) => c.type === editingTransaction.type).map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
//               </select>
//               <div className="modal-buttons">
//                 <button type="submit">Actualizar</button>
//                 <button type="button" onClick={() => setShowEditModal(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showCardTransaction && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>💳 Registrar compra con tarjeta</h3>
//             <form onSubmit={handleAddCardTransaction}>
//               <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="0" value={amount ? formatCOP(parseInt(amount)) : ""} onChange={(e) => handleAmountChange(e, setAmount)} required />
//               </div>
//               <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)} required>
//                 <option value="">Seleccionar tarjeta</option>
//                 {creditCards.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name} (Disponible: {formatCOP(c.available_limit)})</option>)}
//               </select>
//               <select value={category} onChange={(e) => setCategory(e.target.value)}>
//                 <option value="">Seleccionar categoría</option>
//                 {categories.filter((c) => c.type === "gasto").map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
//               </select>
//               <div className="modal-buttons">
//                 <button type="submit">Registrar Compra</button>
//                 <button type="button" onClick={() => setShowCardTransaction(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showPartialExpense && selectedFixedItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>💸 Registrar gasto de {selectedFixedItem.name}</h3>
//             <form onSubmit={handleAddPartialExpense}>
//               <input type="text" placeholder="Descripción" value={partialDescription} onChange={(e) => setPartialDescription(e.target.value)} />
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="Monto" value={partialAmount ? formatCOP(parseInt(partialAmount)) : ""} onChange={(e) => handleAmountChange(e, setPartialAmount)} required />
//               </div>
//               <div className="budget-info-modal">
//                 <div className="info-row"><span>Presupuesto total:</span><strong>{formatCOP(selectedFixedItem.amount)}</strong></div>
//                 <div className="info-row"><span>Gastado:</span><strong>{formatCOP(selectedFixedItem.collected)}</strong></div>
//                 <div className="info-row highlight"><span>Disponible:</span><strong>{formatCOP(selectedFixedItem.amount - selectedFixedItem.collected)}</strong></div>
//               </div>
//               <div className="modal-buttons">
//                 <button type="submit">Registrar</button>
//                 <button type="button" onClick={() => setShowPartialExpense(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showPartialIncome && selectedReceivable && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>💰 Registrar cobro de {selectedReceivable.name}</h3>
//             <form onSubmit={handleAddPartialIncome}>
//               <input type="text" placeholder="Descripción" value={partialIncomeDescription} onChange={(e) => setPartialIncomeDescription(e.target.value)} />
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="Monto cobrado" value={partialIncomeAmount ? formatCOP(parseInt(partialIncomeAmount)) : ""} onChange={(e) => handleAmountChange(e, setPartialIncomeAmount)} required />
//               </div>
//               <div className="budget-info-modal">
//                 <div className="info-row"><span>Total por cobrar:</span><strong>{formatCOP(selectedReceivable.amount)}</strong></div>
//                 <div className="info-row"><span>Cobrado:</span><strong>{formatCOP(selectedReceivable.collected)}</strong></div>
//                 <div className="info-row highlight"><span>Pendiente:</span><strong>{formatCOP(selectedReceivable.amount - selectedReceivable.collected)}</strong></div>
//               </div>
//               <div className="modal-buttons">
//                 <button type="submit">Registrar Cobro</button>
//                 <button type="button" onClick={() => setShowPartialIncome(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showTransferModal && selectedPocketForTransfer && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>🏦 Transferir a {selectedPocketForTransfer.name}</h3>
//             <form onSubmit={(e) => { e.preventDefault(); executeTransfer(); }}>
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="0" value={transferAmount ? formatCOP(parseInt(transferAmount)) : ""} onChange={(e) => handleAmountChange(e, setTransferAmount)} required />
//               </div>
//               <div className="balance-info-text">Disponible: {formatCOP(availableBalance)}</div>
//               <div className="modal-buttons">
//                 <button type="submit">Transferir</button>
//                 <button type="button" onClick={() => setShowTransferModal(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showFixedItem && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>{fixedItemType === "gasto" ? "🎯 Nuevo Presupuesto" : "✨ Nuevo Ingreso Fijo"}</h3>
//             <form onSubmit={handleAddFixedItem}>
//               <input type="text" placeholder="Nombre" value={fixedItemName} onChange={(e) => setFixedItemName(e.target.value)} required />
//               <div className="emoji-selector">
//                 <label>Icono:</label>
//                 <div className="emoji-grid">
//                   {suggestedIcons.slice(0, 16).map((icon) => (
//                     <span key={icon} className={`emoji-option ${fixedItemIcon === icon ? "selected" : ""}`} onClick={() => setFixedItemIcon(icon)}>{icon}</span>
//                   ))}
//                 </div>
//                 <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setFixedItemIcon(e.target.value)} />
//               </div>
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder={fixedItemType === "gasto" ? "Monto del presupuesto" : "Monto del ingreso"} value={fixedItemAmount ? formatCOP(parseInt(fixedItemAmount)) : ""} onChange={(e) => handleAmountChange(e, setFixedItemAmount)} required />
//               </div>
//               <input type="number" placeholder="Día de pago/cobro (1-31)" value={fixedItemDueDay} onChange={(e) => setFixedItemDueDay(e.target.value)} />
//               <div className="modal-buttons">
//                 <button type="submit">Crear</button>
//                 <button type="button" onClick={() => setShowFixedItem(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showCardModal && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>💳 Nueva Tarjeta</h3>
//             <form onSubmit={handleAddCreditCard}>
//               <input type="text" placeholder="Nombre" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
//               <div className="emoji-selector">
//                 <label>Icono:</label>
//                 <div className="emoji-grid">
//                   {cardIcons.map((icon) => (
//                     <span key={icon} className={`emoji-option ${cardIcon === icon ? "selected" : ""}`} onClick={() => setCardIcon(icon)}>{icon}</span>
//                   ))}
//                 </div>
//                 <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setCardIcon(e.target.value)} />
//               </div>
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="Cupo total" value={cardLimit ? formatCOP(parseInt(cardLimit)) : ""} onChange={(e) => handleAmountChange(e, setCardLimit)} required />
//               </div>
//               <input type="number" placeholder="Día de corte" value={cardCutoffDay} onChange={(e) => setCardCutoffDay(e.target.value)} />
//               <input type="number" placeholder="Día de pago" value={cardPaymentDay} onChange={(e) => setCardPaymentDay(e.target.value)} />
//               <div className="modal-buttons">
//                 <button type="submit">Crear</button>
//                 <button type="button" onClick={() => setShowCardModal(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showReceivable && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>💰 Nueva Deuda por Cobrar</h3>
//             <form onSubmit={handleAddReceivable}>
//               <input type="text" placeholder="¿Quién te debe?" value={receivableName} onChange={(e) => setReceivableName(e.target.value)} required />
//               <div className="emoji-selector">
//                 <label>Icono:</label>
//                 <div className="emoji-grid">
//                   {receivableIcons.map((icon) => (
//                     <span key={icon} className={`emoji-option ${receivableIcon === icon ? "selected" : ""}`} onClick={() => setReceivableIcon(icon)}>{icon}</span>
//                   ))}
//                 </div>
//                 <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setReceivableIcon(e.target.value)} />
//               </div>
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="Monto a cobrar" value={receivableAmount ? formatCOP(parseInt(receivableAmount)) : ""} onChange={(e) => handleAmountChange(e, setReceivableAmount)} required />
//               </div>
//               <input type="number" placeholder="Día de pago (1-31)" value={receivableDueDay} onChange={(e) => setReceivableDueDay(e.target.value)} />
//               <div className="modal-buttons">
//                 <button type="submit">Crear</button>
//                 <button type="button" onClick={() => setShowReceivable(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showPocket && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>🏦 Nuevo Bolsillo</h3>
//             <form onSubmit={handleAddPocket}>
//               <input type="text" placeholder="Nombre" value={pocketName} onChange={(e) => setPocketName(e.target.value)} required />
//               <div className="emoji-selector">
//                 <label>Icono:</label>
//                 <div className="emoji-grid">
//                   {pocketIcons.slice(0, 12).map((icon) => (
//                     <span key={icon} className={`emoji-option ${pocketIcon === icon ? "selected" : ""}`} onClick={() => setPocketIcon(icon)}>{icon}</span>
//                   ))}
//                 </div>
//                 <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setPocketIcon(e.target.value)} />
//               </div>
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="Cantidad a ahorrar" value={pocketAmount ? formatCOP(parseInt(pocketAmount)) : ""} onChange={(e) => handleAmountChange(e, setPocketAmount)} required />
//               </div>
//               <div className="amount-input-wrapper">
//                 <span className="currency-symbol">$</span>
//                 <input type="text" placeholder="Meta (opcional)" value={pocketGoal ? formatCOP(parseInt(pocketGoal)) : ""} onChange={(e) => handleAmountChange(e, setPocketGoal)} />
//               </div>
//               <div className="modal-buttons">
//                 <button type="submit">Crear</button>
//                 <button type="button" onClick={() => setShowPocket(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {showCategory && (
//         <div className="modal">
//           <div className="modal-content">
//             <h3>🏷️ Nueva Categoría</h3>
//             <form onSubmit={handleAddCategory}>
//               <input type="text" placeholder="Nombre" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
//               <div className="emoji-selector">
//                 <label>Icono:</label>
//                 <div className="emoji-grid">
//                   {suggestedIcons.slice(0, 16).map((icon) => (
//                     <span key={icon} className={`emoji-option ${newCategoryIcon === icon ? "selected" : ""}`} onClick={() => setNewCategoryIcon(icon)}>{icon}</span>
//                   ))}
//                 </div>
//                 <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" value={customEmoji} onChange={(e) => setCustomEmoji(e.target.value)} />
//               </div>
//               <select value={newCategoryType} onChange={(e) => setNewCategoryType(e.target.value)}>
//                 <option value="gasto">Gasto</option>
//                 <option value="ingreso">Ingreso</option>
//               </select>
//               <div className="modal-buttons">
//                 <button type="submit">Crear</button>
//                 <button type="button" onClick={() => setShowCategory(false)}>Cancelar</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
// export default App;
import React, { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";
import Auth from "./components/Auth";
import {
  fetchLists,
  createList,
  updateListBalance,
  deleteList as deleteListFromDB,
  fetchTransactions,
  createTransaction,
  updateTransaction as updateTransactionInDB,
  deleteTransaction as deleteTransactionFromDB,
  fetchPockets,
  createPocket,
  updatePocket,
  deletePocket as deletePocketFromDB,
  fetchCreditCards,
  createCreditCard,
  updateCreditCard,
  deleteCreditCard,
  fetchCardTransactions,
  createCardTransaction,
  updateCardTransaction,
  deleteCardTransaction,
  fetchFixedItems,
  createFixedItem,
  updateFixedItem,
  deleteFixedItem,
  fetchReceivables,
  createReceivable,
  updateReceivable,
  deleteReceivable,
  fetchCategories,
  createCategory,
  deleteCategory as deleteCategoryFromDB,
} from "./services/supabaseService";
import "./App.css";

function App() {
  // ========== ESTADOS DE AUTENTICACIÓN ==========
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== ESTADOS PRINCIPALES ==========
  const [theme, setTheme] = useState("light");
  const [lists, setLists] = useState([]);
  const [activeList, setActiveList] = useState(null);
  const [animateBalance, setAnimateBalance] = useState(false);
  const [lastChange, setLastChange] = useState({ amount: 0, type: "" });

  const [transactions, setTransactions] = useState([]);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [transactionType, setTransactionType] = useState("gasto");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedPocket, setSelectedPocket] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("efectivo");
  const [selectedCard, setSelectedCard] = useState("");

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [creditCards, setCreditCards] = useState([]);
  const [showCardModal, setShowCardModal] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardLimit, setCardLimit] = useState("");
  const [cardCutoffDay, setCardCutoffDay] = useState("");
  const [cardPaymentDay, setCardPaymentDay] = useState("");
  const [cardIcon, setCardIcon] = useState("💳");
  const [cardTransactions, setCardTransactions] = useState([]);
  const [showCardTransaction, setShowCardTransaction] = useState(false);

  const [fixedItems, setFixedItems] = useState([]);
  const [showFixedItem, setShowFixedItem] = useState(false);
  const [fixedItemType, setFixedItemType] = useState("gasto");
  const [fixedItemName, setFixedItemName] = useState("");
  const [fixedItemAmount, setFixedItemAmount] = useState("");
  const [fixedItemDueDay, setFixedItemDueDay] = useState("");
  const [fixedItemIcon, setFixedItemIcon] = useState("📋");
  const [showPartialExpense, setShowPartialExpense] = useState(false);
  const [selectedFixedItem, setSelectedFixedItem] = useState(null);
  const [partialAmount, setPartialAmount] = useState("");
  const [partialDescription, setPartialDescription] = useState("");

  const [receivables, setReceivables] = useState([]);
  const [showReceivable, setShowReceivable] = useState(false);
  const [receivableName, setReceivableName] = useState("");
  const [receivableAmount, setReceivableAmount] = useState("");
  const [receivableDueDay, setReceivableDueDay] = useState("");
  const [receivableIcon, setReceivableIcon] = useState("👤");
  const [showPartialIncome, setShowPartialIncome] = useState(false);
  const [selectedReceivable, setSelectedReceivable] = useState(null);
  const [partialIncomeAmount, setPartialIncomeAmount] = useState("");
  const [partialIncomeDescription, setPartialIncomeDescription] = useState("");

  const [categories, setCategories] = useState([]);
  const [showCategory, setShowCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryIcon, setNewCategoryIcon] = useState("📦");
  const [newCategoryType, setNewCategoryType] = useState("gasto");
  const [customEmoji, setCustomEmoji] = useState("");

  const [pockets, setPockets] = useState([]);
  const [showPocket, setShowPocket] = useState(false);
  const [pocketName, setPocketName] = useState("");
  const [pocketAmount, setPocketAmount] = useState("");
  const [pocketGoal, setPocketGoal] = useState("");
  const [pocketIcon, setPocketIcon] = useState("🏦");
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [selectedPocketForTransfer, setSelectedPocketForTransfer] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");

  const [alerts, setAlerts] = useState([]);
  const [activeView, setActiveView] = useState("dashboard");

  // ========== ESTADOS PARA EL TOUR ==========
  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [tourPosition, setTourPosition] = useState({ top: 0, left: 0 });

  const suggestedIcons = ["🍔","🚗","🎬","🛒","🏠","💡","📱","💵","💻","📚","🏥","🎮","☕","🍷","✈️","🏨"];
  const pocketIcons = ["🏦","💰","💎","🎯","🏠","🚗","✈️","🎓"];
  const cardIcons = ["💳","🏦","💎","🌟","🔥"];
  const receivableIcons = ["👤","👨‍👩‍👧","🏢","💼","🤝"];

  // ========== PASOS DEL TOUR ==========
  const tourSteps = [
    {
      target: ".balance-card",
      title: "💰 Balance Actual",
      content: "Aquí puedes ver tu saldo disponible, el dinero guardado en bolsillos y tu patrimonio neto. ¡Los números se animan cuando hay cambios!",
    },
    {
      target: ".action-buttons",
      title: "⚡ Acciones Rápidas",
      content: "Agrega gastos o ingresos fácilmente desde aquí. También puedes acceder rápidamente a tus tarjetas de crédito.",
    },
    {
      target: ".transactions",
      title: "📜 Últimos Movimientos",
      content: "Todos tus gastos e ingresos aparecen aquí. Puedes editar cualquier transacción haciendo clic en ella o eliminarla con la papelera.",
    },
    {
      target: ".list-selector",
      title: "📁 Listas",
      content: "Crea múltiples listas para organizar diferentes presupuestos (Ej: Personal, Hogar, Negocio). Cada lista tiene su propio balance.",
    },
    {
      target: ".view-nav",
      title: "📱 Navegación",
      content: "Cambia entre las diferentes secciones: Dashboard, Tarjetas, Presupuestos, Por Cobrar, Bolsillos y Categorías.",
    },
    {
      target: ".add-fixed-btn",
      title: "➕ Crear Contenido",
      content: "Usa este botón para crear nuevas tarjetas, presupuestos, bolsillos o categorías según la sección donde te encuentres.",
    }
  ];

  // ========== HELPERS ==========
  const getUserId = () => session?.user?.id;

  const formatCOP = (amount) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  const handleAmountChange = (e, setter) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") { setter(""); return; }
    setter(parseInt(value, 10).toString());
  };

  const triggerBalanceAnimation = (amountChanged, type) => {
    setLastChange({ amount: amountChanged, type });
    setAnimateBalance(true);
    setTimeout(() => setAnimateBalance(false), 1000);
  };

  // ========== FUNCIONES DEL TOUR ==========
  const updateTourPosition = () => {
    if (tourStep >= tourSteps.length) {
      setShowTour(false);
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`tour_seen_${userId}`, "true");
      }
      return;
    }

    const step = tourSteps[tourStep];
    const targetElement = document.querySelector(step.target);
    
    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      setTourPosition({
        top: rect.top + window.scrollY - 10,
        left: rect.left + window.scrollX - 10,
        width: rect.width,
        height: rect.height
      });
    }
  };

  useEffect(() => {
    if (showTour) {
      updateTourPosition();
      window.addEventListener('scroll', updateTourPosition);
      window.addEventListener('resize', updateTourPosition);
      return () => {
        window.removeEventListener('scroll', updateTourPosition);
        window.removeEventListener('resize', updateTourPosition);
      };
    }
  }, [showTour, tourStep]);

  const nextTourStep = () => {
    if (tourStep + 1 < tourSteps.length) {
      setTourStep(tourStep + 1);
      setTimeout(updateTourPosition, 100);
    } else {
      const userId = getUserId();
      if (userId) {
        localStorage.setItem(`tour_seen_${userId}`, "true");
      }
      setShowTour(false);
      setTourStep(0);
    }
  };

  const prevTourStep = () => {
    if (tourStep > 0) {
      setTourStep(tourStep - 1);
      setTimeout(updateTourPosition, 100);
    }
  };

  const skipTour = () => {
    const userId = getUserId();
    if (userId) {
      localStorage.setItem(`tour_seen_${userId}`, "true");
    }
    setShowTour(false);
    setTourStep(0);
  };

  const startTour = () => {
    setTourStep(0);
    setShowTour(true);
    setTimeout(updateTourPosition, 100);
  };

  // ========== CARGAR DATOS ==========
  const loadAllData = async (userId, listId) => {
    try {
      const [
        listsData,
        transactionsData,
        pocketsData,
        cardsData,
        fixedData,
        receivablesData,
        categoriesData,
        cardTxData,
      ] = await Promise.all([
        fetchLists(userId),
        listId ? fetchTransactions(userId, listId) : fetchTransactions(userId, null),
        listId ? fetchPockets(userId, listId) : Promise.resolve([]),
        listId ? fetchCreditCards(userId, listId) : Promise.resolve([]),
        listId ? fetchFixedItems(userId, listId) : Promise.resolve([]),
        listId ? fetchReceivables(userId, listId) : Promise.resolve([]),
        fetchCategories(userId),
        fetchCardTransactions(userId),
      ]);

      setLists(listsData);
      setTransactions(transactionsData);
      setPockets(pocketsData);
      setCreditCards(cardsData);
      setFixedItems(fixedData);
      setReceivables(receivablesData);
      setCategories(categoriesData);
      setCardTransactions(cardTxData);

      if (listsData.length > 0 && !listId) {
        setActiveList(listsData[0].id);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  // ========== AUTENTICACIÓN ==========
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user?.id) {
        loadAllData(session.user.id, null);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user?.id) {
        loadAllData(session.user.id, null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Verificar nuevo usuario para mostrar tour automático
  useEffect(() => {
    const checkNewUser = async () => {
      const userId = getUserId();
      if (userId && !loading) {
        const tourSeen = localStorage.getItem(`tour_seen_${userId}`);
        if (!tourSeen) {
          setTimeout(() => {
            startTour();
          }, 1500);
        }
      }
    };
    checkNewUser();
  }, [session, loading]);

  // Recargar cuando cambia la lista activa
  useEffect(() => {
    const userId = getUserId();
    if (userId && activeList) {
      Promise.all([
        fetchTransactions(userId, activeList),
        fetchPockets(userId, activeList),
        fetchCreditCards(userId, activeList),
        fetchFixedItems(userId, activeList),
        fetchReceivables(userId, activeList),
      ]).then(([transactionsData, pocketsData, cardsData, fixedData, receivablesData]) => {
        setTransactions(transactionsData);
        setPockets(pocketsData);
        setCreditCards(cardsData);
        setFixedItems(fixedData);
        setReceivables(receivablesData);
      });
    }
  }, [activeList, session]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  useEffect(() => {
    const newAlerts = [];
    const currentDay = new Date().getDate();

    creditCards.forEach((card) => {
      if (card.cutoff_day) {
        const daysToCutoff = card.cutoff_day - currentDay;
        if (daysToCutoff === 3)
          newAlerts.push({ id: Date.now() + Math.random(), message: `⚠️ Corte de ${card.name} en 3 días`, type: "warning" });
        else if (daysToCutoff === 1)
          newAlerts.push({ id: Date.now() + Math.random(), message: `🔔 ¡MAÑANA! Corte de ${card.name}`, type: "danger" });
      }
      if (card.available_limit < card.limit_amount * 0.1)
        newAlerts.push({ id: Date.now() + Math.random(), message: `⚠️ ${card.name}: Cupo casi agotado`, type: "danger" });
    });

    setAlerts(newAlerts);
    const timer = setTimeout(() => setAlerts([]), 6000);
    return () => clearTimeout(timer);
  }, [creditCards]);

  // ========== LISTAS ==========
  const handleAddList = async () => {
    const name = prompt("Nombre de la lista:", "Nueva Lista");
    const userId = getUserId();
    if (name && userId) {
      const newList = await createList({ user_id: userId, name, balance: 0, icon: "📁" });
      setLists((prev) => [...prev, newList]);
      setActiveList(newList.id);
    }
  };

  const handleDeleteList = async (listId) => {
    if (window.confirm("¿Eliminar esta lista?")) {
      await deleteListFromDB(listId);
      setLists((prev) => {
        const updated = prev.filter((l) => l.id !== listId);
        if (activeList === listId && updated.length > 0) setActiveList(updated[0].id);
        return updated;
      });
    }
  };

  // ========== TRANSACCIONES ==========
  const canAfford = (amountToSpend) => {
    const currentBalance = currentList?.balance || 0;
    const totalInPockets = pockets.reduce((sum, p) => sum + p.current, 0);
    return currentBalance - totalInPockets >= amountToSpend;
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!amount || !description || !userId) return;
    const numAmount = parseFloat(amount);

    if (paymentMethod === "efectivo" && transactionType === "gasto" && !canAfford(numAmount)) {
      alert(`❌ Balance insuficiente. Disponible: ${formatCOP((currentList?.balance || 0) - pockets.reduce((sum, p) => sum + p.current, 0))}`);
      return;
    }

    if (paymentMethod === "tarjeta" && transactionType === "gasto") {
      setShowCardTransaction(true);
      return;
    }

    const selectedCategory = categories.find((c) => c.name === category);
    const newTransaction = {
      user_id: userId,
      list_id: activeList,
      description,
      amount: numAmount,
      type: transactionType,
      payment_method: paymentMethod,
      category: category || (transactionType === "gasto" ? "Comida" : "Salario"),
      category_icon: selectedCategory?.icon || (transactionType === "gasto" ? "🍔" : "💵"),
      pocket_id: selectedPocket || null,
      date: new Date().toISOString(),
      date_formatted: new Date().toLocaleDateString("es-CO"),
    };

    const created = await createTransaction(newTransaction);
    setTransactions((prev) => [created, ...prev]);

    if (paymentMethod === "efectivo") {
      const newBalance = (currentList?.balance || 0) + (transactionType === "ingreso" ? numAmount : -numAmount);
      await updateListBalance(activeList, newBalance);
      setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
      triggerBalanceAnimation(numAmount, transactionType);
    }

    if (selectedPocket && transactionType === "gasto" && paymentMethod === "efectivo") {
      const pocket = pockets.find((p) => p.id === selectedPocket);
      if (pocket) {
        await updatePocket(selectedPocket, { current: pocket.current - numAmount });
        setPockets((prev) => prev.map((p) => p.id === selectedPocket ? { ...p, current: p.current - numAmount } : p));
      }
    }

    setAmount(""); setDescription(""); setCategory(""); setSelectedPocket("");
    setShowAddTransaction(false);
  };

  const handleUpdateTransaction = async (e) => {
    e.preventDefault();
    if (!amount || !description) return;
    const numAmount = parseFloat(amount);
    const oldAmount = editingTransaction.amount;
    const amountDiff = numAmount - oldAmount;

    await updateTransactionInDB(editingTransaction.id, {
      description, amount: numAmount, category,
      date_formatted: new Date().toLocaleDateString("es-CO"),
    });

    setTransactions((prev) => prev.map((t) =>
      t.id === editingTransaction.id ? { ...t, description, amount: numAmount, category } : t
    ));

    if (editingTransaction.payment_method === "efectivo" && editingTransaction.type === "gasto") {
      const newBalance = (currentList?.balance || 0) - amountDiff;
      await updateListBalance(activeList, newBalance);
      setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
    }

    setShowEditModal(false); setEditingTransaction(null);
    setAmount(""); setDescription(""); setCategory("");
    alert("✅ Transacción actualizada");
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (window.confirm("¿Eliminar esta transacción?")) {
      const transaction = transactions.find((t) => t.id === transactionId);
      await deleteTransactionFromDB(transactionId);

      if (transaction.payment_method === "efectivo") {
        const newBalance = (currentList?.balance || 0) + (transaction.type === "gasto" ? transaction.amount : -transaction.amount);
        await updateListBalance(activeList, newBalance);
        setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
      }

      setTransactions((prev) => prev.filter((t) => t.id !== transactionId));
      alert("✅ Transacción eliminada");
    }
  };

  // ========== TARJETAS ==========
  const handleAddCreditCard = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!cardName || !cardLimit || !userId) return;

    const newCard = await createCreditCard({
      user_id: userId, list_id: activeList, name: cardName,
      limit: parseFloat(cardLimit),
      cutoff_day: cardCutoffDay ? parseInt(cardCutoffDay) : null,
      payment_day: cardPaymentDay ? parseInt(cardPaymentDay) : null,
      icon: cardIcon,
    });

    setCreditCards((prev) => [...prev, newCard]);
    setCardName(""); setCardLimit(""); setCardCutoffDay(""); setCardPaymentDay(""); setCardIcon("💳");
    setShowCardModal(false);
  };

  const handleAddCardTransaction = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!amount || !description || !userId) return;
    const numAmount = parseFloat(amount);
    const card = creditCards.find((c) => c.id === selectedCard);

    if (numAmount > card.available_limit) {
      alert(`❌ Cupo insuficiente. Disponible: ${formatCOP(card.available_limit)}`);
      return;
    }

    const selectedCategory = categories.find((c) => c.name === category);
    const newCardTransaction = {
      user_id: userId, card_id: selectedCard, list_id: activeList,
      description, amount: numAmount,
      category: category || "Otros",
      category_icon: selectedCategory?.icon || "💳",
      date: new Date().toISOString(),
      date_formatted: new Date().toLocaleDateString("es-CO"),
      is_paid: false,
    };

    const created = await createCardTransaction(newCardTransaction);
    setCardTransactions((prev) => [created, ...prev]);

    const updatedCard = { available_limit: card.available_limit - numAmount, used_amount: card.used_amount + numAmount };
    await updateCreditCard(selectedCard, updatedCard);
    setCreditCards((prev) => prev.map((c) => c.id === selectedCard ? { ...c, ...updatedCard } : c));

    setAmount(""); setDescription(""); setCategory(""); setSelectedCard("");
    setShowCardTransaction(false); setShowAddTransaction(false);
    alert(`✅ Compra registrada. Cupo restante: ${formatCOP(card.available_limit - numAmount)}`);
  };

  const payCard = async (cardId) => {
    const card = creditCards.find((c) => c.id === cardId);
    if (card.used_amount <= 0) { alert("No hay deuda pendiente"); return; }
    if ((currentList?.balance || 0) < card.used_amount) {
      alert(`❌ Balance insuficiente: ${formatCOP(currentList?.balance || 0)}`); return;
    }
    if (window.confirm(`¿Pagar ${formatCOP(card.used_amount)} de ${card.name}?`)) {
      const userId = getUserId();
      const newBalance = (currentList?.balance || 0) - card.used_amount;
      await updateListBalance(activeList, newBalance);
      setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
      triggerBalanceAnimation(card.used_amount, "gasto");

      await updateCreditCard(cardId, { available_limit: card.limit_amount, used_amount: 0 });
      setCreditCards((prev) => prev.map((c) => c.id === cardId ? { ...c, available_limit: c.limit_amount, used_amount: 0 } : c));

      for (const tx of cardTransactions.filter((t) => t.card_id === cardId && !t.is_paid)) {
        await updateCardTransaction(tx.id, { is_paid: true });
      }
      setCardTransactions((prev) => prev.map((t) => t.card_id === cardId ? { ...t, is_paid: true } : t));

      const paymentTx = {
        user_id: userId, list_id: activeList,
        description: `💳 Pago tarjeta ${card.name}`,
        amount: card.used_amount, type: "gasto", payment_method: "efectivo",
        category: "Pago Tarjeta", category_icon: "💳",
        date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
      };
      const created = await createTransaction(paymentTx);
      setTransactions((prev) => [created, ...prev]);
      alert(`✅ Pagado ${formatCOP(card.used_amount)} de ${card.name}`);
    }
  };

  const deleteCard = async (cardId) => {
    const card = creditCards.find((c) => c.id === cardId);
    if (card && card.used_amount > 0) { alert(`Primero paga la deuda de ${formatCOP(card.used_amount)}`); return; }
    if (window.confirm("¿Eliminar esta tarjeta?")) {
      await deleteCreditCard(cardId);
      setCreditCards((prev) => prev.filter((c) => c.id !== cardId));
    }
  };

  // ========== PRESUPUESTOS ==========
  const handleAddFixedItem = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!fixedItemName || !fixedItemAmount || !userId) return;

    const newItem = await createFixedItem({
      user_id: userId, list_id: activeList, name: fixedItemName,
      amount: parseFloat(fixedItemAmount), collected: 0,
      due_day: fixedItemDueDay ? parseInt(fixedItemDueDay) : null,
      type: fixedItemType, icon: fixedItemIcon,
    });

    setFixedItems((prev) => [...prev, newItem]);
    setFixedItemName(""); setFixedItemAmount(""); setFixedItemDueDay(""); setFixedItemIcon("📋");
    setShowFixedItem(false);
  };

  const handleAddPartialExpense = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!partialAmount || parseFloat(partialAmount) <= 0 || !userId) return;
    const numAmount = parseFloat(partialAmount);
    const remainingBudget = selectedFixedItem.amount - selectedFixedItem.collected;

    if (numAmount > remainingBudget) { alert(`⚠️ Solo quedan ${formatCOP(remainingBudget)} de presupuesto`); return; }
    if ((currentList?.balance || 0) < numAmount) { alert(`❌ Balance insuficiente: ${formatCOP(currentList?.balance || 0)}`); return; }

    const newCollected = selectedFixedItem.collected + numAmount;
    await updateFixedItem(selectedFixedItem.id, { collected: newCollected });
    setFixedItems((prev) => prev.map((item) => item.id === selectedFixedItem.id ? { ...item, collected: newCollected } : item));

    const newBalance = (currentList?.balance || 0) - numAmount;
    await updateListBalance(activeList, newBalance);
    setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
    triggerBalanceAnimation(numAmount, "gasto");

    const created = await createTransaction({
      user_id: userId, list_id: activeList,
      description: partialDescription || selectedFixedItem.name,
      amount: numAmount, type: "gasto", payment_method: "efectivo",
      category: selectedFixedItem.name, category_icon: selectedFixedItem.icon,
      date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
    });
    setTransactions((prev) => [created, ...prev]);

    setShowPartialExpense(false); setPartialAmount(""); setPartialDescription(""); setSelectedFixedItem(null);
    alert(`✅ Gastaste ${formatCOP(numAmount)}. Restan ${formatCOP(remainingBudget - numAmount)}`);
  };

  // ========== POR COBRAR ==========
  const handleAddReceivable = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!receivableName || !receivableAmount || !userId) return;

    const newReceivable = await createReceivable({
      user_id: userId, list_id: activeList, name: receivableName,
      amount: parseFloat(receivableAmount), collected: 0,
      due_day: receivableDueDay ? parseInt(receivableDueDay) : null,
      icon: receivableIcon,
    });

    setReceivables((prev) => [...prev, newReceivable]);
    setReceivableName(""); setReceivableAmount(""); setReceivableDueDay(""); setReceivableIcon("👤");
    setShowReceivable(false);
  };

  const handleAddPartialIncome = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!partialIncomeAmount || parseFloat(partialIncomeAmount) <= 0 || !userId) return;
    const numAmount = parseFloat(partialIncomeAmount);
    const remainingReceivable = selectedReceivable.amount - selectedReceivable.collected;

    if (numAmount > remainingReceivable) { alert(`⚠️ Solo quedan por cobrar ${formatCOP(remainingReceivable)}`); return; }

    const newCollected = selectedReceivable.collected + numAmount;
    await updateReceivable(selectedReceivable.id, { collected: newCollected });
    setReceivables((prev) => prev.map((item) => item.id === selectedReceivable.id ? { ...item, collected: newCollected } : item));

    const newBalance = (currentList?.balance || 0) + numAmount;
    await updateListBalance(activeList, newBalance);
    setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
    triggerBalanceAnimation(numAmount, "ingreso");

    const created = await createTransaction({
      user_id: userId, list_id: activeList,
      description: partialIncomeDescription || `💰 Cobro: ${selectedReceivable.name}`,
      amount: numAmount, type: "ingreso", payment_method: "efectivo",
      category: "Deuda Cobrada", category_icon: "💰",
      date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
    });
    setTransactions((prev) => [created, ...prev]);

    setShowPartialIncome(false); setPartialIncomeAmount(""); setPartialIncomeDescription(""); setSelectedReceivable(null);
    alert(`✅ Cobraste ${formatCOP(numAmount)}. Restan por cobrar ${formatCOP(remainingReceivable - numAmount)}`);
  };

  // ========== BOLSILLOS ==========
  const handleAddPocket = async (e) => {
    e.preventDefault();
    const userId = getUserId();
    if (!pocketName || !pocketAmount || !userId) return;

    const newPocket = await createPocket({
      user_id: userId, list_id: activeList, name: pocketName,
      total: parseFloat(pocketAmount), current: parseFloat(pocketAmount),
      goal: pocketGoal ? parseFloat(pocketGoal) : null, icon: pocketIcon,
    });

    setPockets((prev) => [...prev, newPocket]);
    setPocketName(""); setPocketAmount(""); setPocketGoal(""); setPocketIcon("🏦");
    setShowPocket(false);
  };

  const executeTransfer = async () => {
    const userId = getUserId();
    if (!transferAmount || parseFloat(transferAmount) <= 0 || !userId) return;
    const numAmount = parseFloat(transferAmount);
    const availableMoney = (currentList?.balance || 0) - pockets.reduce((sum, p) => sum + p.current, 0);

    if (availableMoney >= numAmount) {
      const newBalance = (currentList?.balance || 0) - numAmount;
      await updateListBalance(activeList, newBalance);
      setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
      triggerBalanceAnimation(numAmount, "gasto");

      const newCurrent = selectedPocketForTransfer.current + numAmount;
      await updatePocket(selectedPocketForTransfer.id, { current: newCurrent });
      setPockets((prev) => prev.map((p) => p.id === selectedPocketForTransfer.id ? { ...p, current: newCurrent } : p));

      const created = await createTransaction({
        user_id: userId, list_id: activeList,
        description: `📦 Transferencia a ${selectedPocketForTransfer.name}`,
        amount: numAmount, type: "gasto", payment_method: "efectivo",
        category: "Bolsillos", category_icon: "🏦",
        date: new Date().toISOString(), date_formatted: new Date().toLocaleDateString("es-CO"),
      });
      setTransactions((prev) => [created, ...prev]);

      alert(`✅ Transferido ${formatCOP(numAmount)} a ${selectedPocketForTransfer.name}`);
      setShowTransferModal(false); setTransferAmount(""); setSelectedPocketForTransfer(null);
    } else {
      alert(`❌ Disponible: ${formatCOP(availableMoney)}`);
    }
  };

  const handleDeletePocket = async (pocketId) => {
    if (window.confirm("¿Eliminar este bolsillo? El dinero volverá al balance")) {
      const pocket = pockets.find((p) => p.id === pocketId);
      if (pocket && pocket.current > 0) {
        const newBalance = (currentList?.balance || 0) + pocket.current;
        await updateListBalance(activeList, newBalance);
        setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
        triggerBalanceAnimation(pocket.current, "ingreso");
      }
      await deletePocketFromDB(pocketId);
      setPockets((prev) => prev.filter((p) => p.id !== pocketId));
    }
  };

  // ========== CATEGORÍAS ==========
  const handleAddCategory = async (e) => {
    e.preventDefault();
    const userId = getUserId();

    if (!newCategoryName.trim()) { alert("❌ Por favor ingresa un nombre para la categoría"); return; }
    if (!userId) { alert("❌ Sesión no válida. Por favor inicia sesión nuevamente."); return; }

    const exists = categories.some((c) => c.name.toLowerCase() === newCategoryName.toLowerCase());
    if (exists) { alert(`❌ Ya existe una categoría llamada "${newCategoryName}"`); return; }

    const finalIcon = customEmoji || newCategoryIcon;

    try {
      const newCategory = await createCategory({
        user_id: userId, name: newCategoryName,
        icon: finalIcon, type: newCategoryType,
      });

      setCategories((prev) => [...prev, newCategory]);
      setNewCategoryName(""); setNewCategoryIcon("📦"); setCustomEmoji("");
      setShowCategory(false);
      alert("✅ Categoría creada exitosamente");
    } catch (error) {
      console.error("Error completo:", error);
      if (error.message?.includes("duplicate") || error.code === "23505") {
        alert(`❌ Ya existe una categoría llamada "${newCategoryName}"`);
      } else {
        alert(`❌ Error al crear categoría: ${error.message}`);
      }
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("¿Eliminar esta categoría?")) {
      await deleteCategoryFromDB(categoryId);
      setCategories((prev) => prev.filter((c) => c.id !== categoryId));
    }
  };

  // ========== UTILIDADES ==========
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setLists([]); setTransactions([]); setPockets([]);
    setCreditCards([]); setFixedItems([]); setReceivables([]);
    setCategories([]); setActiveList(null);
  };

  const currentList = lists.find((l) => l.id === activeList);
  const listTransactions = transactions.filter((t) => t.list_id === activeList);
  const totalInPockets = pockets.reduce((sum, p) => sum + p.current, 0);
  const availableBalance = (currentList?.balance || 0) - totalInPockets;
  const totalCardDebt = creditCards.reduce((sum, c) => sum + c.used_amount, 0);
  const totalPendingExpenses = fixedItems.filter((i) => i.type === "gasto").reduce((sum, e) => sum + (e.amount - e.collected), 0);
  const totalPendingReceivables = receivables.reduce((sum, r) => sum + (r.amount - r.collected), 0);
  const netWorth = (currentList?.balance || 0) - totalCardDebt + totalPendingReceivables - totalPendingExpenses;

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!session) {
    return <Auth onAuthSuccess={(session) => setSession(session)} />;
  }

  return (
    <div className="app">
      {/* Tour Modal */}
      {showTour && tourStep < tourSteps.length && (
        <div className="tour-overlay">
          <div 
            className="tour-highlight"
            style={{
              top: tourPosition.top,
              left: tourPosition.left,
              width: tourPosition.width,
              height: tourPosition.height
            }}
          />
          <div 
            className="tour-card"
            style={{
              top: tourPosition.top + tourPosition.height + 15,
              left: tourPosition.left
            }}
          >
            <div className="tour-header">
              <span className="tour-icon">💡</span>
              <h3>{tourSteps[tourStep].title}</h3>
              <button className="tour-close" onClick={skipTour}>✖</button>
            </div>
            <div className="tour-content">
              <p>{tourSteps[tourStep].content}</p>
            </div>
            <div className="tour-footer">
              <div className="tour-dots">
                {tourSteps.map((_, idx) => (
                  <span key={idx} className={`tour-dot ${idx === tourStep ? "active" : ""}`} />
                ))}
              </div>
              <div className="tour-buttons">
                {tourStep > 0 && (
                  <button className="tour-prev" onClick={prevTourStep}>Anterior</button>
                )}
                <button className="tour-next" onClick={nextTourStep}>
                  {tourStep + 1 === tourSteps.length ? "Finalizar" : "Siguiente"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="header">
        <h1>💲 MOAR</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className="help-btn" onClick={startTour} title="Ayuda">
            💡
          </button>
          <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>
            {session.user?.email?.split('@')[0] || session.user?.email || ""}
          </span>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? "🌙" : "☀️"}
          </button>
          <button className="theme-toggle" onClick={handleLogout}>🚪</button>
        </div>
      </div>

      {alerts.length > 0 && (
        <div className="alerts-container">
          {alerts.map((alert) => (
            <div key={alert.id} className={`alert ${alert.type}`}>
              {alert.message}
              <button onClick={() => setAlerts((prev) => prev.filter((a) => a.id !== alert.id))}>✖</button>
            </div>
          ))}
        </div>
      )}

      <div className="list-selector">
        {lists.map((list) => (
          <button
            key={list.id}
            className={`list-btn ${activeList === list.id ? "active" : ""}`}
            onClick={() => setActiveList(list.id)}
          >
            {list.icon} {list.name}
            <span className="delete-list" onClick={(e) => { e.stopPropagation(); handleDeleteList(list.id); }}>🗑️</span>
          </button>
        ))}
        <button className="list-btn add-list" onClick={handleAddList}>+ Nueva</button>
      </div>

      <div className="view-nav">
        {[
          { id: "dashboard", label: "📊 Dashboard" },
          { id: "cards", label: "💳 Tarjetas" },
          { id: "budgets", label: "🎯 Presupuestos" },
          { id: "receivables", label: "💰 Por Cobrar" },
          { id: "pockets", label: "🏦 Bolsillos" },
          { id: "categories", label: "🏷️ Categorías" },
        ].map((v) => (
          <button key={v.id} className={`view-btn ${activeView === v.id ? "active" : ""}`} onClick={() => setActiveView(v.id)}>
            {v.label}
          </button>
        ))}
      </div>

      {/* ========== DASHBOARD ========== */}
      {activeView === "dashboard" && (
        <>
          <div className={`balance-card ${animateBalance ? "animate" : ""}`}>
            <h2>Balance Actual</h2>
            <div className="balance-amount">{formatCOP(currentList?.balance || 0)}</div>
            {lastChange.amount > 0 && (
              <div className={`balance-change ${lastChange.type}`}>
                {lastChange.type === "gasto" ? "-" : "+"}{formatCOP(lastChange.amount)}
              </div>
            )}
            <div className="balance-details">
              <span>💰 Disponible: {formatCOP(availableBalance)}</span>
              <span>🏦 En bolsillos: {formatCOP(totalInPockets)}</span>
            </div>
            {totalCardDebt > 0 && <div className="card-debt-warning">💳 Deuda tarjetas: {formatCOP(totalCardDebt)}</div>}
            {totalPendingReceivables > 0 && <div className="receivable-info">💰 Por cobrar: {formatCOP(totalPendingReceivables)}</div>}
            <div className="net-worth">💰 Patrimonio neto: {formatCOP(netWorth)}</div>
          </div>

          <div className="action-buttons">
            <button className="action-btn gasto" onClick={() => { setTransactionType("gasto"); setShowAddTransaction(true); }}>➕ Gasto</button>
            <button className="action-btn ingreso" onClick={() => { setTransactionType("ingreso"); setShowAddTransaction(true); }}>📈 Ingreso</button>
            <button className="action-btn card" onClick={() => setActiveView("cards")}>💳 Tarjetas</button>
          </div>

          {creditCards.length > 0 && (
            <div className="cards-summary">
              <h3>💳 Tarjetas de Crédito</h3>
              {creditCards.map((card) => {
                const usagePercent = (card.used_amount / card.limit_amount) * 100;
                return (
                  <div key={card.id} className="card-mini-card">
                    <div className="card-mini-header">
                      <span>{card.icon} {card.name}</span>
                      <span className={`card-usage ${usagePercent > 80 ? "danger" : usagePercent > 50 ? "warning" : ""}`}>
                        {formatCOP(card.used_amount)} / {formatCOP(card.limit_amount)}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.min(usagePercent, 100)}%`, background: usagePercent > 80 ? "#e74c3c" : usagePercent > 50 ? "#f39c12" : "#2ecc71" }}></div>
                    </div>
                    <div className="card-mini-footer">
                      <span>Disponible: {formatCOP(card.available_limit)}</span>
                      {card.used_amount > 0 && <button onClick={() => payCard(card.id)} className="pay-mini-btn">Pagar</button>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {fixedItems.filter((i) => i.type === "gasto").length > 0 && (
            <div className="budgets-summary">
              <h3>🎯 Presupuestos activos</h3>
              {fixedItems.filter((i) => i.type === "gasto").slice(0, 3).map((budget) => {
                const progress = (budget.collected / budget.amount) * 100;
                return (
                  <div key={budget.id} className="budget-progress-item">
                    <div className="budget-header">
                      <span>{budget.icon} {budget.name}</span>
                      <span>{formatCOP(budget.collected)} / {formatCOP(budget.amount)}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%`, background: progress > 90 ? "#e74c3c" : "#2ecc71" }}></div>
                    </div>
                    <div className="budget-remaining">Restante: {formatCOP(budget.amount - budget.collected)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {receivables.length > 0 && (
            <div className="receivables-summary">
              <h3>💰 Por cobrar</h3>
              {receivables.slice(0, 3).map((item) => {
                const progress = (item.collected / item.amount) * 100;
                return (
                  <div key={item.id} className="receivable-progress-item">
                    <div className="receivable-header">
                      <span>{item.icon} {item.name}</span>
                      <span>{formatCOP(item.collected)} / {formatCOP(item.amount)}</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill receivable-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                    </div>
                    <div className="receivable-remaining">Por cobrar: {formatCOP(item.amount - item.collected)}</div>
                  </div>
                );
              })}
            </div>
          )}

          {pockets.length > 0 && (
            <div className="pockets-summary">
              <h3>🏦 Mis Bolsillos</h3>
              <div className="pockets-grid">
                {pockets.map((pocket) => (
                  <div key={pocket.id} className="pocket-mini-card">
                    <span className="pocket-icon">{pocket.icon}</span>
                    <span className="pocket-name">{pocket.name}</span>
                    <span className="pocket-amount">{formatCOP(pocket.current)}</span>
                    {pocket.goal && (
                      <div className="pocket-goal-progress">
                        <div className="goal-fill" style={{ width: `${Math.min((pocket.current / pocket.goal) * 100, 100)}%` }}></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="transactions">
            <h3>📜 Últimos movimientos</h3>
            {listTransactions.length === 0 ? (
              <p className="empty">No hay movimientos aún</p>
            ) : (
              listTransactions.slice(0, 10).map((t) => (
                <div key={t.id} className={`transaction ${t.type}`} onClick={() => {
                  setEditingTransaction(t); setAmount(t.amount.toString()); setDescription(t.description); setCategory(t.category); setShowEditModal(true);
                }}>
                  <span className="category-icon">{t.category_icon}</span>
                  <span className="desc">{t.description}</span>
                  <span className="payment-method-badge">{t.payment_method === "tarjeta" ? "💳" : "💰"}</span>
                  <span className="category-name">{t.category}</span>
                  <span className="amount">{t.type === "gasto" ? "-" : "+"}{formatCOP(t.amount)}</span>
                  <span className="date">{t.date_formatted}</span>
                  <button className="delete-transaction-btn" onClick={(e) => { e.stopPropagation(); handleDeleteTransaction(t.id); }}>🗑️</button>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ========== TARJETAS ========== */}
      {activeView === "cards" && (
        <div className="cards-view">
          <div className="section-header">
            <h3>💳 Tarjetas de Crédito</h3>
            <button onClick={() => setShowCardModal(true)} className="add-fixed-btn">+ Nueva Tarjeta</button>
          </div>
          {creditCards.length === 0 ? <p className="empty">No hay tarjetas de crédito</p> : (
            creditCards.map((card) => {
              const usagePercent = (card.used_amount / card.limit_amount) * 100;
              return (
                <div key={card.id} className="card-detail">
                  <div className="card-header">
                    <div className="card-title">
                      <span className="card-icon-large">{card.icon}</span>
                      <div>
                        <h4>{card.name}</h4>
                        {card.cutoff_day && <small>Corte día {card.cutoff_day} | Pago día {card.payment_day}</small>}
                      </div>
                    </div>
                    <div className="card-actions">
                      {card.used_amount > 0 && <button onClick={() => payCard(card.id)} className="pay-card-btn">💰 Pagar {formatCOP(card.used_amount)}</button>}
                      <button onClick={() => deleteCard(card.id)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                  <div className="card-stats">
                    <div className="stat"><span>Cupo total:</span><strong>{formatCOP(card.limit_amount)}</strong></div>
                    <div className="stat"><span>Usado:</span><strong className="used">{formatCOP(card.used_amount)}</strong></div>
                    <div className="stat"><span>Disponible:</span><strong className="available">{formatCOP(card.available_limit)}</strong></div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(usagePercent, 100)}%`, background: usagePercent > 80 ? "#e74c3c" : usagePercent > 50 ? "#f39c12" : "#2ecc71" }}></div>
                  </div>
                  {cardTransactions.filter((t) => t.card_id === card.id).length > 0 && (
                    <div className="card-transactions-list">
                      <h5>Compras recientes</h5>
                      {cardTransactions.filter((t) => t.card_id === card.id).map((t) => (
                        <div key={t.id} className="card-transaction-item">
                          <span className="card-tx-icon">{t.category_icon}</span>
                          <span className="card-tx-desc">{t.description}</span>
                          <span className="card-tx-amount">{formatCOP(t.amount)}</span>
                          <span className="card-tx-date">{t.date_formatted}</span>
                          {!t.is_paid && <button onClick={() => deleteCardTransaction(t.id)} className="cancel-tx-btn">Cancelar</button>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========== PRESUPUESTOS ========== */}
      {activeView === "budgets" && (
        <div className="budgets-view">
          <div className="section-header">
            <h3>🎯 Presupuestos de Gastos</h3>
            <button onClick={() => { setFixedItemType("gasto"); setShowFixedItem(true); }} className="add-fixed-btn">+ Nuevo Presupuesto</button>
          </div>
          {fixedItems.filter((i) => i.type === "gasto").length === 0 ? <p className="empty">No hay presupuestos creados</p> : (
            fixedItems.filter((i) => i.type === "gasto").map((item) => {
              const progress = (item.collected / item.amount) * 100;
              const remaining = item.amount - item.collected;
              return (
                <div key={item.id} className="budget-card">
                  <div className="budget-card-header">
                    <div className="budget-title">
                      <span className="budget-icon">{item.icon}</span>
                      <div><h4>{item.name}</h4>{item.due_day && <small>Vence día {item.due_day}</small>}</div>
                    </div>
                    <div className="budget-stats">
                      <span className="budget-spent">{formatCOP(item.collected)}</span>
                      <span className="budget-divider">/</span>
                      <span className="budget-total">{formatCOP(item.amount)}</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${progress >= 100 ? "over-budget" : ""}`} style={{ width: `${Math.min(progress, 100)}%` }}></div>
                  </div>
                  <div className={`budget-remaining ${remaining < 0 ? "negative" : ""}`}>
                    {progress >= 100 ? "✅ Completado" : `📊 Restante: ${formatCOP(remaining)} (${Math.round(progress)}% usado)`}
                  </div>
                  <div className="budget-actions">
                    <button onClick={() => { setSelectedFixedItem(item); setShowPartialExpense(true); }} className="partial-btn">💸 Registrar gasto</button>
                    {remaining > 0 && (
                      <button onClick={async () => {
                        if (window.confirm(`¿Pagar los ${formatCOP(remaining)} restantes de ${item.name}?`)) {
                          await updateFixedItem(item.id, { collected: item.amount });
                          setFixedItems((prev) => prev.map((i) => i.id === item.id ? { ...i, collected: item.amount } : i));
                          const newBalance = (currentList?.balance || 0) - remaining;
                          await updateListBalance(activeList, newBalance);
                          setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
                          triggerBalanceAnimation(remaining, "gasto");
                          alert(`✅ Pagado ${formatCOP(remaining)} de ${item.name}`);
                        }
                      }} className="full-btn">✅ Pagar todo</button>
                    )}
                    <button onClick={() => deleteFixedItem(item.id)} className="delete-btn">🗑️</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========== POR COBRAR ========== */}
      {activeView === "receivables" && (
        <div className="receivables-view">
          <div className="section-header">
            <h3>💰 Ingresos por Cobrar</h3>
            <button onClick={() => setShowReceivable(true)} className="add-fixed-btn">+ Nueva Deuda</button>
          </div>
          {receivables.length === 0 ? <p className="empty">No hay ingresos por cobrar</p> : (
            receivables.map((item) => {
              const progress = (item.collected / item.amount) * 100;
              const remaining = item.amount - item.collected;
              return (
                <div key={item.id} className="receivable-card">
                  <div className="receivable-card-header">
                    <div className="receivable-title">
                      <span className="receivable-icon">{item.icon}</span>
                      <div><h4>{item.name}</h4>{item.due_day && <small>Vence día {item.due_day}</small>}</div>
                    </div>
                    <div className="receivable-stats">
                      <span className="receivable-collected">{formatCOP(item.collected)}</span>
                      <span className="receivable-divider">/</span>
                      <span className="receivable-total">{formatCOP(item.amount)}</span>
                    </div>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill receivable-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div>
                  </div>
                  <div className="receivable-remaining">
                    {progress >= 100 ? "✅ Completado" : `💰 Por cobrar: ${formatCOP(remaining)} (${Math.round(progress)}% cobrado)`}
                  </div>
                  <div className="receivable-actions">
                    <button onClick={() => { setSelectedReceivable(item); setShowPartialIncome(true); }} className="partial-income-btn">💵 Registrar cobro</button>
                    {remaining > 0 && (
                      <button onClick={async () => {
                        if (window.confirm(`¿Registrar cobro completo de ${formatCOP(remaining)} de ${item.name}?`)) {
                          await updateReceivable(item.id, { collected: item.amount });
                          setReceivables((prev) => prev.map((r) => r.id === item.id ? { ...r, collected: item.amount } : r));
                          const newBalance = (currentList?.balance || 0) + remaining;
                          await updateListBalance(activeList, newBalance);
                          setLists((prev) => prev.map((l) => l.id === activeList ? { ...l, balance: newBalance } : l));
                          triggerBalanceAnimation(remaining, "ingreso");
                          alert(`✅ Cobrado ${formatCOP(remaining)} de ${item.name}`);
                        }
                      }} className="full-income-btn">✅ Cobrar todo</button>
                    )}
                    <button onClick={() => deleteReceivable(item.id)} className="delete-btn">🗑️</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========== BOLSILLOS ========== */}
      {activeView === "pockets" && (
        <div className="pockets-view">
          <div className="section-header">
            <h3>🏦 Mis Bolsillos</h3>
            <button onClick={() => setShowPocket(true)} className="add-fixed-btn">+ Nuevo Bolsillo</button>
          </div>
          <div className="balance-info">
            <div className="info-card"><span>💰 Balance disponible:</span><strong>{formatCOP(availableBalance)}</strong></div>
          </div>
          {pockets.length === 0 ? <p className="empty">No hay bolsillos</p> : (
            pockets.map((pocket) => {
              const progress = pocket.goal ? (pocket.current / pocket.goal) * 100 : 0;
              return (
                <div key={pocket.id} className="pocket-card">
                  <div className="pocket-header">
                    <div className="pocket-title">
                      <span className="pocket-icon-large">{pocket.icon}</span>
                      <div><h4>{pocket.name}</h4>{pocket.goal && <small>Meta: {formatCOP(pocket.goal)}</small>}</div>
                    </div>
                    <div className="pocket-actions">
                      <button onClick={() => { setSelectedPocketForTransfer(pocket); setShowTransferModal(true); }} className="transfer-btn">➕ Transferir</button>
                      <button onClick={() => handleDeletePocket(pocket.id)} className="delete-btn">🗑️</button>
                    </div>
                  </div>
                  <div className="pocket-balance">
                    <span className="balance-label">Ahorrado:</span>
                    <span className="balance-value">{formatCOP(pocket.current)}</span>
                  </div>
                  {pocket.goal && (
                    <>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${Math.min(progress, 100)}%` }}></div></div>
                      <div className="pocket-goal-info">{progress >= 100 ? "🎉 ¡Meta alcanzada!" : `Falta ${formatCOP(pocket.goal - pocket.current)}`}</div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ========== CATEGORÍAS ========== */}
      {activeView === "categories" && (
        <div className="categories-view">
          <div className="section-header">
            <h3>🏷️ Categorías</h3>
            <button onClick={() => setShowCategory(true)} className="add-fixed-btn">+ Nueva</button>
          </div>
          <div className="categories-grid">
            {categories.map((cat) => (
              <div key={cat.id} className="category-card">
                <span className="category-icon-large">{cat.icon}</span>
                <span className="category-name">{cat.name}</span>
                <span className={`category-type ${cat.type}`}>{cat.type}</span>
                <button onClick={() => handleDeleteCategory(cat.id)} className="delete-cat-btn">🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========== MODALES ========== */}

      {showAddTransaction && (
        <div className="modal">
          <div className="modal-content">
            <h3>{transactionType === "gasto" ? "💰 Gasto" : "📈 Ingreso"}</h3>
            <form onSubmit={handleAddTransaction}>
              <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="0" value={amount ? formatCOP(parseInt(amount)) : ""} onChange={(e) => handleAmountChange(e, setAmount)} required />
              </div>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                <option value="efectivo">💰 Efectivo / Débito</option>
                <option value="tarjeta">💳 Tarjeta de Crédito</option>
              </select>
              {paymentMethod === "tarjeta" && transactionType === "gasto" && (
                <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)} required>
                  <option value="">Seleccionar tarjeta</option>
                  {creditCards.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name} (Disponible: {formatCOP(c.available_limit)})</option>)}
                </select>
              )}
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Seleccionar categoría</option>
                {categories.filter((c) => c.type === transactionType).map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
              </select>
              {transactionType === "gasto" && paymentMethod === "efectivo" && pockets.length > 0 && (
                <select value={selectedPocket} onChange={(e) => setSelectedPocket(e.target.value)}>
                  <option value="">Sin bolsillo</option>
                  {pockets.map((p) => <option key={p.id} value={p.id}>{p.icon} {p.name} ({formatCOP(p.current)})</option>)}
                </select>
              )}
              <div className="modal-buttons">
                <button type="submit">Guardar</button>
                <button type="button" onClick={() => setShowAddTransaction(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && editingTransaction && (
        <div className="modal">
          <div className="modal-content">
            <h3>✏️ Editar Transacción</h3>
            <form onSubmit={handleUpdateTransaction}>
              <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="0" value={amount ? formatCOP(parseInt(amount)) : ""} onChange={(e) => handleAmountChange(e, setAmount)} required />
              </div>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Seleccionar categoría</option>
                {categories.filter((c) => c.type === editingTransaction.type).map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
              </select>
              <div className="modal-buttons">
                <button type="submit">Actualizar</button>
                <button type="button" onClick={() => setShowEditModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCardTransaction && (
        <div className="modal">
          <div className="modal-content">
            <h3>💳 Registrar compra con tarjeta</h3>
            <form onSubmit={handleAddCardTransaction}>
              <input type="text" placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} required />
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="0" value={amount ? formatCOP(parseInt(amount)) : ""} onChange={(e) => handleAmountChange(e, setAmount)} required />
              </div>
              <select value={selectedCard} onChange={(e) => setSelectedCard(e.target.value)} required>
                <option value="">Seleccionar tarjeta</option>
                {creditCards.map((c) => <option key={c.id} value={c.id}>{c.icon} {c.name} (Disponible: {formatCOP(c.available_limit)})</option>)}
              </select>
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">Seleccionar categoría</option>
                {categories.filter((c) => c.type === "gasto").map((c) => <option key={c.id} value={c.name}>{c.icon} {c.name}</option>)}
              </select>
              <div className="modal-buttons">
                <button type="submit">Registrar Compra</button>
                <button type="button" onClick={() => setShowCardTransaction(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPartialExpense && selectedFixedItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>💸 Registrar gasto de {selectedFixedItem.name}</h3>
            <form onSubmit={handleAddPartialExpense}>
              <input type="text" placeholder="Descripción" value={partialDescription} onChange={(e) => setPartialDescription(e.target.value)} />
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="Monto" value={partialAmount ? formatCOP(parseInt(partialAmount)) : ""} onChange={(e) => handleAmountChange(e, setPartialAmount)} required />
              </div>
              <div className="budget-info-modal">
                <div className="info-row"><span>Presupuesto total:</span><strong>{formatCOP(selectedFixedItem.amount)}</strong></div>
                <div className="info-row"><span>Gastado:</span><strong>{formatCOP(selectedFixedItem.collected)}</strong></div>
                <div className="info-row highlight"><span>Disponible:</span><strong>{formatCOP(selectedFixedItem.amount - selectedFixedItem.collected)}</strong></div>
              </div>
              <div className="modal-buttons">
                <button type="submit">Registrar</button>
                <button type="button" onClick={() => setShowPartialExpense(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPartialIncome && selectedReceivable && (
        <div className="modal">
          <div className="modal-content">
            <h3>💰 Registrar cobro de {selectedReceivable.name}</h3>
            <form onSubmit={handleAddPartialIncome}>
              <input type="text" placeholder="Descripción" value={partialIncomeDescription} onChange={(e) => setPartialIncomeDescription(e.target.value)} />
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="Monto cobrado" value={partialIncomeAmount ? formatCOP(parseInt(partialIncomeAmount)) : ""} onChange={(e) => handleAmountChange(e, setPartialIncomeAmount)} required />
              </div>
              <div className="budget-info-modal">
                <div className="info-row"><span>Total por cobrar:</span><strong>{formatCOP(selectedReceivable.amount)}</strong></div>
                <div className="info-row"><span>Cobrado:</span><strong>{formatCOP(selectedReceivable.collected)}</strong></div>
                <div className="info-row highlight"><span>Pendiente:</span><strong>{formatCOP(selectedReceivable.amount - selectedReceivable.collected)}</strong></div>
              </div>
              <div className="modal-buttons">
                <button type="submit">Registrar Cobro</button>
                <button type="button" onClick={() => setShowPartialIncome(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTransferModal && selectedPocketForTransfer && (
        <div className="modal">
          <div className="modal-content">
            <h3>🏦 Transferir a {selectedPocketForTransfer.name}</h3>
            <form onSubmit={(e) => { e.preventDefault(); executeTransfer(); }}>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="0" value={transferAmount ? formatCOP(parseInt(transferAmount)) : ""} onChange={(e) => handleAmountChange(e, setTransferAmount)} required />
              </div>
              <div className="balance-info-text">Disponible: {formatCOP(availableBalance)}</div>
              <div className="modal-buttons">
                <button type="submit">Transferir</button>
                <button type="button" onClick={() => setShowTransferModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showFixedItem && (
        <div className="modal">
          <div className="modal-content">
            <h3>{fixedItemType === "gasto" ? "🎯 Nuevo Presupuesto" : "✨ Nuevo Ingreso Fijo"}</h3>
            <form onSubmit={handleAddFixedItem}>
              <input type="text" placeholder="Nombre" value={fixedItemName} onChange={(e) => setFixedItemName(e.target.value)} required />
              <div className="emoji-selector">
                <label>Icono:</label>
                <div className="emoji-grid">
                  {suggestedIcons.slice(0, 16).map((icon) => (
                    <span key={icon} className={`emoji-option ${fixedItemIcon === icon ? "selected" : ""}`} onClick={() => setFixedItemIcon(icon)}>{icon}</span>
                  ))}
                </div>
                <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setFixedItemIcon(e.target.value)} />
              </div>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder={fixedItemType === "gasto" ? "Monto del presupuesto" : "Monto del ingreso"} value={fixedItemAmount ? formatCOP(parseInt(fixedItemAmount)) : ""} onChange={(e) => handleAmountChange(e, setFixedItemAmount)} required />
              </div>
              <input type="number" placeholder="Día de pago/cobro (1-31)" value={fixedItemDueDay} onChange={(e) => setFixedItemDueDay(e.target.value)} />
              <div className="modal-buttons">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowFixedItem(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCardModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>💳 Nueva Tarjeta</h3>
            <form onSubmit={handleAddCreditCard}>
              <input type="text" placeholder="Nombre" value={cardName} onChange={(e) => setCardName(e.target.value)} required />
              <div className="emoji-selector">
                <label>Icono:</label>
                <div className="emoji-grid">
                  {cardIcons.map((icon) => (
                    <span key={icon} className={`emoji-option ${cardIcon === icon ? "selected" : ""}`} onClick={() => setCardIcon(icon)}>{icon}</span>
                  ))}
                </div>
                <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setCardIcon(e.target.value)} />
              </div>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="Cupo total" value={cardLimit ? formatCOP(parseInt(cardLimit)) : ""} onChange={(e) => handleAmountChange(e, setCardLimit)} required />
              </div>
              <input type="number" placeholder="Día de corte" value={cardCutoffDay} onChange={(e) => setCardCutoffDay(e.target.value)} />
              <input type="number" placeholder="Día de pago" value={cardPaymentDay} onChange={(e) => setCardPaymentDay(e.target.value)} />
              <div className="modal-buttons">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowCardModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showReceivable && (
        <div className="modal">
          <div className="modal-content">
            <h3>💰 Nueva Deuda por Cobrar</h3>
            <form onSubmit={handleAddReceivable}>
              <input type="text" placeholder="¿Quién te debe?" value={receivableName} onChange={(e) => setReceivableName(e.target.value)} required />
              <div className="emoji-selector">
                <label>Icono:</label>
                <div className="emoji-grid">
                  {receivableIcons.map((icon) => (
                    <span key={icon} className={`emoji-option ${receivableIcon === icon ? "selected" : ""}`} onClick={() => setReceivableIcon(icon)}>{icon}</span>
                  ))}
                </div>
                <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setReceivableIcon(e.target.value)} />
              </div>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="Monto a cobrar" value={receivableAmount ? formatCOP(parseInt(receivableAmount)) : ""} onChange={(e) => handleAmountChange(e, setReceivableAmount)} required />
              </div>
              <input type="number" placeholder="Día de pago (1-31)" value={receivableDueDay} onChange={(e) => setReceivableDueDay(e.target.value)} />
              <div className="modal-buttons">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowReceivable(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPocket && (
        <div className="modal">
          <div className="modal-content">
            <h3>🏦 Nuevo Bolsillo</h3>
            <form onSubmit={handleAddPocket}>
              <input type="text" placeholder="Nombre" value={pocketName} onChange={(e) => setPocketName(e.target.value)} required />
              <div className="emoji-selector">
                <label>Icono:</label>
                <div className="emoji-grid">
                  {pocketIcons.slice(0, 12).map((icon) => (
                    <span key={icon} className={`emoji-option ${pocketIcon === icon ? "selected" : ""}`} onClick={() => setPocketIcon(icon)}>{icon}</span>
                  ))}
                </div>
                <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" onChange={(e) => e.target.value && setPocketIcon(e.target.value)} />
              </div>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="Cantidad a ahorrar" value={pocketAmount ? formatCOP(parseInt(pocketAmount)) : ""} onChange={(e) => handleAmountChange(e, setPocketAmount)} required />
              </div>
              <div className="amount-input-wrapper">
                <span className="currency-symbol">$</span>
                <input type="text" placeholder="Meta (opcional)" value={pocketGoal ? formatCOP(parseInt(pocketGoal)) : ""} onChange={(e) => handleAmountChange(e, setPocketGoal)} />
              </div>
              <div className="modal-buttons">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowPocket(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategory && (
        <div className="modal">
          <div className="modal-content">
            <h3>🏷️ Nueva Categoría</h3>
            <form onSubmit={handleAddCategory}>
              <input type="text" placeholder="Nombre" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} required />
              <div className="emoji-selector">
                <label>Icono:</label>
                <div className="emoji-grid">
                  {suggestedIcons.slice(0, 16).map((icon) => (
                    <span key={icon} className={`emoji-option ${newCategoryIcon === icon ? "selected" : ""}`} onClick={() => setNewCategoryIcon(icon)}>{icon}</span>
                  ))}
                </div>
                <input type="text" placeholder="O escribe tu propio emoji" maxLength="2" value={customEmoji} onChange={(e) => setCustomEmoji(e.target.value)} />
              </div>
              <select value={newCategoryType} onChange={(e) => setNewCategoryType(e.target.value)}>
                <option value="gasto">Gasto</option>
                <option value="ingreso">Ingreso</option>
              </select>
              <div className="modal-buttons">
                <button type="submit">Crear</button>
                <button type="button" onClick={() => setShowCategory(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;