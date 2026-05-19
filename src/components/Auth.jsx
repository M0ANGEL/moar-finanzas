// // // export default Auth;
// // import React, { useState } from 'react';
// // import { supabase } from '../lib/supabase';

// // function Auth({ onAuthSuccess }) {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [fullName, setFullName] = useState('');
// //   const [phone, setPhone] = useState('');
// //   const [acceptedTerms, setAcceptedTerms] = useState(false);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [successMessage, setSuccessMessage] = useState('');
// //   const [showGuide, setShowGuide] = useState(false);

// //   // Función para crear perfil, lista y categorías de ejemplo
// //   const setupNewUser = async (userId, email, fullName, phone) => {
// //     console.log('Configurando nuevo usuario:', userId);
    
// //     // 1. Crear perfil
// //     const { error: profileError } = await supabase
// //       .from('profiles')
// //       .insert([{ id: userId, email, full_name: fullName, phone: phone || null }]);
    
// //     if (profileError) {
// //       console.error('Error perfil:', profileError);
// //       return false;
// //     }
    
// //     // 2. Crear lista por defecto
// //     const { error: listError } = await supabase
// //       .from('lists')
// //       .insert([{ user_id: userId, name: 'Personal', balance: 0, icon: '👤' }]);
    
// //     if (listError) {
// //       console.error('Error lista:', listError);
// //       return false;
// //     }
    
// //     // 3. Crear categorías de ejemplo (para que el usuario vea cómo funciona)
// //     const exampleCategories = [
// //       { user_id: userId, name: 'Comida', icon: '🍔', type: 'gasto' },
// //       { user_id: userId, name: 'Transporte', icon: '🚗', type: 'gasto' },
// //       { user_id: userId, name: 'Entretenimiento', icon: '🎬', type: 'gasto' },
// //       { user_id: userId, name: 'Salario', icon: '💵', type: 'ingreso' },
// //       { user_id: userId, name: 'Freelance', icon: '💻', type: 'ingreso' },
// //     ];
    
// //     for (const cat of exampleCategories) {
// //       const { error: catError } = await supabase
// //         .from('categories')
// //         .insert([cat]);
// //       if (catError) console.error('Error categoría:', catError);
// //     }
    
// //     console.log('✅ Usuario configurado correctamente');
// //     return true;
// //   };

// //   const handleSignUp = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
    
// //     if (password !== confirmPassword) {
// //       setError('Las contraseñas no coinciden');
// //       setLoading(false);
// //       return;
// //     }
    
// //     if (password.length < 6) {
// //       setError('La contraseña debe tener al menos 6 caracteres');
// //       setLoading(false);
// //       return;
// //     }
    
// //     if (!fullName.trim()) {
// //       setError('Ingresa tu nombre completo');
// //       setLoading(false);
// //       return;
// //     }
    
// //     if (!acceptedTerms) {
// //       setError('Acepta los términos y condiciones');
// //       setLoading(false);
// //       return;
// //     }
    
// //     try {
// //       const { data, error } = await supabase.auth.signUp({
// //         email,
// //         password,
// //         options: { data: { full_name: fullName, phone } }
// //       });
      
// //       if (error) throw error;
      
// //       if (data.user) {
// //         await setupNewUser(data.user.id, email, fullName, phone);
// //         setSuccessMessage('¡Cuenta creada!');
// //         setShowGuide(true);
// //         setTimeout(() => {
// //           onAuthSuccess(data.user);
// //         }, 2000);
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
// //       if (error) throw error;
// //       onAuthSuccess(data.user);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Modal de guía para nuevos usuarios
// //   const GuideModal = () => (
// //     <div className="modal guide-modal" onClick={() => setShowGuide(false)}>
// //       <div className="modal-content guide-content" onClick={(e) => e.stopPropagation()}>
// //         <h2>🎉 ¡Bienvenido a MOAR!</h2>
// //         <p>Aquí tienes una guía rápida para empezar:</p>
// //         <div className="guide-body">
// //           <div className="guide-section">
// //             <h3>1️⃣ Crea tus categorías</h3>
// //             <p>Ve a la pestaña "Categorías" y agrega las que necesites (Comida, Transporte, etc.)</p>
// //           </div>
// //           <div className="guide-section">
// //             <h3>2️⃣ Registra tus movimientos</h3>
// //             <p>Usa los botones "Gasto" o "Ingreso" para llevar tu registro financiero</p>
// //           </div>
// //           <div className="guide-section">
// //             <h3>3️⃣ Explora las funcionalidades</h3>
// //             <p>Tarjetas de crédito, presupuestos, bolsillos de ahorro y más</p>
// //           </div>
// //         </div>
// //         <button className="guide-close-btn" onClick={() => setShowGuide(false)}>Entendido</button>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <>
// //       {showGuide && <GuideModal />}
// //       <div className="auth-container">
// //         <div className="auth-card">
// //           <div className="auth-header">
// //             <h1>💰 MOAR</h1>
// //             <p>{isLogin ? 'Bienvenido' : 'Crea tu cuenta'}</p>
// //           </div>
          
// //           <div className="auth-tabs">
// //             <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}>
// //               Iniciar Sesión
// //             </button>
// //             <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}>
// //               Crear Cuenta
// //             </button>
// //           </div>
          
// //           {error && <div className="auth-error">{error}</div>}
// //           {successMessage && <div className="auth-success">{successMessage}</div>}
          
// //           <form onSubmit={isLogin ? handleLogin : handleSignUp}>
// //             {!isLogin && (
// //               <>
// //                 <div className="form-group">
// //                   <label>Nombre Completo *</label>
// //                   <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Juan Pérez" />
// //                 </div>
// //                 <div className="form-group">
// //                   <label>Teléfono</label>
// //                   <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="300 123 4567" />
// //                 </div>
// //               </>
// //             )}
            
// //             <div className="form-group">
// //               <label>Correo Electrónico *</label>
// //               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Contraseña *</label>
// //               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
// //             </div>
            
// //             {!isLogin && (
// //               <>
// //                 <div className="form-group">
// //                   <label>Confirmar Contraseña *</label>
// //                   <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
// //                 </div>
// //                 <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
// //                   <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} style={{ width: 'auto' }} />
// //                   <label htmlFor="terms" style={{ margin: 0, fontSize: '0.75rem' }}>Acepto los términos y condiciones</label>
// //                 </div>
// //               </>
// //             )}
            
// //             <button type="submit" className="auth-btn primary" disabled={loading}>
// //               {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
// //             </button>
// //           </form>
          
// //           <div className="auth-footer">
// //             <p>Protegido por Supabase 🔒</p>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default Auth;
// import React, { useState } from 'react';
// import { supabase } from '../lib/supabase';

// function Auth({ onAuthSuccess }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showGuide, setShowGuide] = useState(false);

//   const setupNewUser = async (userId, email, fullName, phone) => {
//     console.log('Configurando nuevo usuario:', userId);

//     const { error: profileError } = await supabase
//       .from('profiles')
//       .insert([{ id: userId, email, full_name: fullName, phone: phone || null }]);
//     if (profileError) console.error('Error perfil:', profileError);

//     const { error: listError } = await supabase
//       .from('lists')
//       .insert([{ user_id: userId, name: 'Personal', balance: 0, icon: '👤' }]);
//     if (listError) console.error('Error lista:', listError);

//     const exampleCategories = [
//       { user_id: userId, name: 'Comida', icon: '🍔', type: 'gasto', is_default: false },
//       { user_id: userId, name: 'Transporte', icon: '🚗', type: 'gasto', is_default: false },
//       { user_id: userId, name: 'Entretenimiento', icon: '🎬', type: 'gasto', is_default: false },
//       { user_id: userId, name: 'Salario', icon: '💵', type: 'ingreso', is_default: false },
//       { user_id: userId, name: 'Freelance', icon: '💻', type: 'ingreso', is_default: false },
//     ];

//     for (const cat of exampleCategories) {
//       const { error: catError } = await supabase.from('categories').insert([cat]);
//       if (catError) console.error('Error categoría:', catError);
//     }

//     console.log('✅ Usuario configurado correctamente');
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); setLoading(false); return; }
//     if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); setLoading(false); return; }
//     if (!fullName.trim()) { setError('Ingresa tu nombre completo'); setLoading(false); return; }
//     if (!acceptedTerms) { setError('Acepta los términos y condiciones'); setLoading(false); return; }

//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: fullName, phone } }
//       });

//       if (error) throw error;

//       if (data.user) {
//         await setupNewUser(data.user.id, email, fullName, phone);
//         setSuccessMessage('¡Cuenta creada! Iniciando sesión...');
//         setShowGuide(true);

//         // Obtener la sesión completa y pasarla
//         const { data: sessionData } = await supabase.auth.getSession();
//         setTimeout(() => {
//           onAuthSuccess(sessionData.session);
//         }, 2000);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//       if (error) throw error;
//       // Pasar la sesión completa (data.session tiene { user, access_token, ... })
//       onAuthSuccess(data.session);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const GuideModal = () => (
//     <div className="modal guide-modal" onClick={() => setShowGuide(false)}>
//       <div className="modal-content guide-content" onClick={(e) => e.stopPropagation()}>
//         <h2>🎉 ¡Bienvenido a MOAR!</h2>
//         <p>Aquí tienes una guía rápida para empezar:</p>
//         <div className="guide-body">
//           <div className="guide-section">
//             <h3>1️⃣ Tus datos son tuyos</h3>
//             <p>Todo lo que crees — categorías, gastos, listas — es privado y solo tuyo.</p>
//           </div>
//           <div className="guide-section">
//             <h3>2️⃣ Registra tus movimientos</h3>
//             <p>Usa los botones "Gasto" o "Ingreso" para llevar tu registro financiero.</p>
//           </div>
//           <div className="guide-section">
//             <h3>3️⃣ Explora las funcionalidades</h3>
//             <p>Tarjetas de crédito, presupuestos, bolsillos de ahorro y más.</p>
//           </div>
//         </div>
//         <button className="guide-close-btn" onClick={() => setShowGuide(false)}>Entendido</button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {showGuide && <GuideModal />}
//       <div className="auth-container">
//         <div className="auth-card">
//           <div className="auth-header">
//             <h1>💰 MOAR</h1>
//             <p>{isLogin ? 'Bienvenido' : 'Crea tu cuenta'}</p>
//           </div>

//           <div className="auth-tabs">
//             <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}>
//               Iniciar Sesión
//             </button>
//             <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}>
//               Crear Cuenta
//             </button>
//           </div>

//           {error && <div className="auth-error">{error}</div>}
//           {successMessage && <div className="auth-success">{successMessage}</div>}

//           <form onSubmit={isLogin ? handleLogin : handleSignUp}>
//             {!isLogin && (
//               <>
//                 <div className="form-group">
//                   <label>Nombre Completo *</label>
//                   <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Juan Pérez" />
//                 </div>
//                 <div className="form-group">
//                   <label>Teléfono</label>
//                   <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="300 123 4567" />
//                 </div>
//               </>
//             )}

//             <div className="form-group">
//               <label>Correo Electrónico *</label>
//               <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" />
//             </div>

//             <div className="form-group">
//               <label>Contraseña *</label>
//               <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
//             </div>

//             {!isLogin && (
//               <>
//                 <div className="form-group">
//                   <label>Confirmar Contraseña *</label>
//                   <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
//                 </div>
//                 <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
//                   <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} style={{ width: 'auto' }} />
//                   <label htmlFor="terms" style={{ margin: 0, fontSize: '0.75rem' }}>Acepto los términos y condiciones</label>
//                 </div>
//               </>
//             )}

//             <button type="submit" className="auth-btn primary" disabled={loading}>
//               {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
//             </button>
//           </form>

//           <div className="auth-footer">
//             <p>Protegido por Supabase 🔒</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Auth;

import React, { useState } from 'react';
import { supabase } from '../lib/supabase';

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);

  const setupNewUser = async (userId, email, fullName, phone) => {
    console.log('Configurando nuevo usuario:', userId);

    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, email, full_name: fullName, phone: phone || null }]);
    if (profileError) console.error('Error perfil:', profileError);

    const { error: listError } = await supabase
      .from('lists')
      .insert([{ user_id: userId, name: 'Personal', balance: 0, icon: '👤' }]);
    if (listError) console.error('Error lista:', listError);

    // SIN is_default — columna no existe en la tabla
    const exampleCategories = [
      { user_id: userId, name: 'Comida', icon: '🍔', type: 'gasto' },
      { user_id: userId, name: 'Transporte', icon: '🚗', type: 'gasto' },
      { user_id: userId, name: 'Entretenimiento', icon: '🎬', type: 'gasto' },
      { user_id: userId, name: 'Salud', icon: '🏥', type: 'gasto' },
      { user_id: userId, name: 'Hogar', icon: '🏠', type: 'gasto' },
      { user_id: userId, name: 'Salario', icon: '💵', type: 'ingreso' },
      { user_id: userId, name: 'Freelance', icon: '💻', type: 'ingreso' },
    ];

    for (const cat of exampleCategories) {
      const { error: catError } = await supabase.from('categories').insert([cat]);
      if (catError) console.error('Error categoría:', catError);
    }

    console.log('✅ Usuario configurado correctamente');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) { setError('Las contraseñas no coinciden'); setLoading(false); return; }
    if (password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres'); setLoading(false); return; }
    if (!fullName.trim()) { setError('Ingresa tu nombre completo'); setLoading(false); return; }
    if (!acceptedTerms) { setError('Acepta los términos y condiciones'); setLoading(false); return; }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone } }
      });

      if (error) throw error;

      if (data.user) {
        await setupNewUser(data.user.id, email, fullName, phone);
        setSuccessMessage('¡Cuenta creada! Iniciando sesión...');
        setShowGuide(true);

        const { data: sessionData } = await supabase.auth.getSession();
        setTimeout(() => {
          onAuthSuccess(sessionData.session);
        }, 2000);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      onAuthSuccess(data.session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const GuideModal = () => (
    <div className="modal guide-modal" onClick={() => setShowGuide(false)}>
      <div className="modal-content guide-content" onClick={(e) => e.stopPropagation()}>
        <h2>🎉 ¡Bienvenido a MOAR!</h2>
        <p>Todo lo que crees es tuyo y solo tú lo verás.</p>
        <div className="guide-body">
          <div className="guide-section">
            <h3>1️⃣ Registra tus movimientos</h3>
            <p>Usa los botones "Gasto" o "Ingreso" para llevar tu registro financiero.</p>
          </div>
          <div className="guide-section">
            <h3>2️⃣ Crea más categorías</h3>
            <p>Ya tienes algunas de ejemplo. Puedes agregar las que necesites en la pestaña Categorías.</p>
          </div>
          <div className="guide-section">
            <h3>3️⃣ Explora</h3>
            <p>Tarjetas de crédito, presupuestos, bolsillos de ahorro y más.</p>
          </div>
        </div>
        <button className="guide-close-btn" onClick={() => setShowGuide(false)}>¡Empezar!</button>
      </div>
    </div>
  );

  return (
    <>
      {showGuide && <GuideModal />}
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1>💰 MOAR</h1>
            <p>{isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta'}</p>
          </div>

          <div className="auth-tabs">
            <button className={`auth-tab ${isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}>
              Iniciar Sesión
            </button>
            <button className={`auth-tab ${!isLogin ? 'active' : ''}`} onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}>
              Crear Cuenta
            </button>
          </div>

          {error && <div className="auth-error">{error}</div>}
          {successMessage && <div className="auth-success">{successMessage}</div>}

          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required placeholder="Juan Pérez" />
                </div>
                <div className="form-group">
                  <label>Teléfono</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="300 123 4567" />
                </div>
              </>
            )}

            <div className="form-group">
              <label>Correo Electrónico *</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="tu@email.com" />
            </div>

            <div className="form-group">
              <label>Contraseña *</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" />
            </div>

            {!isLogin && (
              <>
                <div className="form-group">
                  <label>Confirmar Contraseña *</label>
                  <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required placeholder="••••••••" />
                </div>
                <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
                  <input type="checkbox" id="terms" checked={acceptedTerms} onChange={(e) => setAcceptedTerms(e.target.checked)} style={{ width: 'auto' }} />
                  <label htmlFor="terms" style={{ margin: 0, fontSize: '0.75rem' }}>Acepto los términos y condiciones</label>
                </div>
              </>
            )}

            <button type="submit" className="auth-btn primary" disabled={loading}>
              {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
            </button>
          </form>

          <div className="auth-footer">
            <p>Protegido por Supabase 🔒</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;