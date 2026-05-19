import { supabase } from '../lib/supabase';

// ==================== LISTS ====================
export const fetchLists = async (userId) => {
  const { data, error } = await supabase
    .from('lists')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const createList = async (list) => {
  const { data, error } = await supabase
    .from('lists')
    .insert([list])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateListBalance = async (listId, newBalance) => {
  const { error } = await supabase
    .from('lists')
    .update({ balance: newBalance })
    .eq('id', listId);
  if (error) throw error;
};

export const deleteList = async (listId) => {
  const { error } = await supabase.from('lists').delete().eq('id', listId);
  if (error) throw error;
};

// ==================== TRANSACTIONS ====================
export const fetchTransactions = async (userId, listId) => {
  let query = supabase.from('transactions').select('*').eq('user_id', userId);
  if (listId) query = query.eq('list_id', listId);
  const { data, error } = await query.order('date', { ascending: false });
  if (error) throw error;
  return data;
};

export const createTransaction = async (transaction) => {
  const { data, error } = await supabase
    .from('transactions')
    .insert([transaction])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateTransaction = async (transactionId, updates) => {
  const { error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', transactionId);
  if (error) throw error;
};

export const deleteTransaction = async (transactionId) => {
  const { error } = await supabase.from('transactions').delete().eq('id', transactionId);
  if (error) throw error;
};

// ==================== POCKETS ====================
export const fetchPockets = async (userId, listId) => {
  const { data, error } = await supabase
    .from('pockets')
    .select('*')
    .eq('user_id', userId)
    .eq('list_id', listId);
  if (error) throw error;
  return data;
};

export const createPocket = async (pocket) => {
  const { data, error } = await supabase
    .from('pockets')
    .insert([pocket])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updatePocket = async (pocketId, updates) => {
  const { error } = await supabase
    .from('pockets')
    .update(updates)
    .eq('id', pocketId);
  if (error) throw error;
};

export const deletePocket = async (pocketId) => {
  const { error } = await supabase.from('pockets').delete().eq('id', pocketId);
  if (error) throw error;
};

// ==================== CREDIT CARDS ====================
export const fetchCreditCards = async (userId, listId) => {
  const { data, error } = await supabase
    .from('credit_cards')
    .select('*')
    .eq('user_id', userId)
    .eq('list_id', listId);
  if (error) throw error;
  return data;
};

export const createCreditCard = async (card) => {
  const { data, error } = await supabase
    .from('credit_cards')
    .insert([{
      user_id: card.user_id,
      list_id: card.list_id,
      name: card.name,
      limit_amount: card.limit,
      available_limit: card.limit,
      used_amount: 0,
      cutoff_day: card.cutoff_day || null,
      payment_day: card.payment_day || null,
      icon: card.icon || '💳',
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateCreditCard = async (cardId, updates) => {
  const { error } = await supabase
    .from('credit_cards')
    .update(updates)
    .eq('id', cardId);
  if (error) throw error;
};

export const deleteCreditCard = async (cardId) => {
  const { error } = await supabase.from('credit_cards').delete().eq('id', cardId);
  if (error) throw error;
};

// ==================== CARD TRANSACTIONS ====================
export const fetchCardTransactions = async (userId, cardId = null) => {
  let query = supabase.from('card_transactions').select('*').eq('user_id', userId);
  if (cardId) query = query.eq('card_id', cardId);
  const { data, error } = await query.order('date', { ascending: false });
  if (error) throw error;
  return data;
};

export const createCardTransaction = async (cardTransaction) => {
  const { data, error } = await supabase
    .from('card_transactions')
    .insert([cardTransaction])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateCardTransaction = async (transactionId, updates) => {
  const { error } = await supabase
    .from('card_transactions')
    .update(updates)
    .eq('id', transactionId);
  if (error) throw error;
};

export const deleteCardTransaction = async (transactionId) => {
  const { error } = await supabase.from('card_transactions').delete().eq('id', transactionId);
  if (error) throw error;
};

// ==================== FIXED ITEMS ====================
export const fetchFixedItems = async (userId, listId) => {
  const { data, error } = await supabase
    .from('fixed_items')
    .select('*')
    .eq('user_id', userId)
    .eq('list_id', listId);
  if (error) throw error;
  return data;
};

export const createFixedItem = async (item) => {
  const { data, error } = await supabase
    .from('fixed_items')
    .insert([item])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateFixedItem = async (itemId, updates) => {
  const { error } = await supabase
    .from('fixed_items')
    .update(updates)
    .eq('id', itemId);
  if (error) throw error;
};

export const deleteFixedItem = async (itemId) => {
  const { error } = await supabase.from('fixed_items').delete().eq('id', itemId);
  if (error) throw error;
};

// ==================== RECEIVABLES ====================
export const fetchReceivables = async (userId, listId) => {
  const { data, error } = await supabase
    .from('receivables')
    .select('*')
    .eq('user_id', userId)
    .eq('list_id', listId);
  if (error) throw error;
  return data;
};

export const createReceivable = async (receivable) => {
  const { data, error } = await supabase
    .from('receivables')
    .insert([receivable])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const updateReceivable = async (receivableId, updates) => {
  const { error } = await supabase
    .from('receivables')
    .update(updates)
    .eq('id', receivableId);
  if (error) throw error;
};

export const deleteReceivable = async (receivableId) => {
  const { error } = await supabase.from('receivables').delete().eq('id', receivableId);
  if (error) throw error;
};

// ==================== CATEGORIES ====================
// Trae solo las categorías del usuario (no hay globales)
export const fetchCategories = async (userId) => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: true });
  if (error) throw error;
  return data;
};

export const createCategory = async (category) => {
  // Solo insertamos los campos que existen en la tabla
  const { data, error } = await supabase
    .from('categories')
    .insert([{
      user_id: category.user_id,
      name: category.name,
      icon: category.icon,
      type: category.type,
    }])
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteCategory = async (categoryId) => {
  const { error } = await supabase.from('categories').delete().eq('id', categoryId);
  if (error) throw error;
};