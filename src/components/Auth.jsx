// import React, { useState, useEffect } from 'react';
// import { supabase } from '../lib/supabase';

// function Auth({ onAuthSuccess }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [fullName, setFullName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [acceptedTerms, setAcceptedTerms] = useState(false);
//   const [rememberEmail, setRememberEmail] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const [showGuide, setShowGuide] = useState(false);
//   const [showTerms, setShowTerms] = useState(false);
//   const [resetPasswordMode, setResetPasswordMode] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');
//   const [resetMessage, setResetMessage] = useState('');

//   // Cargar email guardado al iniciar
//   useEffect(() => {
//     const savedEmail = localStorage.getItem('moar_saved_email');
//     if (savedEmail) {
//       setEmail(savedEmail);
//       setRememberEmail(true);
//     }
//   }, []);

//   // Función para traducir errores de Supabase
//   const translateError = (errorMessage) => {
//     const errorMap = {
//       'Invalid login credentials': '❌ Correo o contraseña incorrectos',
//       'Email not confirmed': '❌ Por favor confirma tu correo electrónico antes de iniciar sesión',
//       'User already registered': '❌ Este correo ya está registrado. Inicia sesión o recupera tu contraseña',
//       'Password should be at least 6 characters': '❌ La contraseña debe tener al menos 6 caracteres',
//       'Email rate limit exceeded': '❌ Demasiados intentos. Espera un momento antes de intentar nuevamente',
//       'Invalid email': '❌ Por favor ingresa un correo electrónico válido',
//       'Email not confirmed': '❌ Por favor confirma tu correo electrónico. Revisa tu bandeja de entrada',
//       'Unable to validate email address': '❌ El correo electrónico no es válido. Verifica que esté bien escrito',
//       'Password recovery requires an email': '❌ Ingresa tu correo electrónico para recuperar tu contraseña',
//       'User not found': '❌ No encontramos una cuenta con este correo electrónico',
//     };
    
//     for (const [key, value] of Object.entries(errorMap)) {
//       if (errorMessage?.toLowerCase().includes(key.toLowerCase())) {
//         return value;
//       }
//     }
//     return `❌ ${errorMessage || 'Ocurrió un error inesperado'}`;
//   };

//   const setupNewUser = async (userId, email, fullName, phone) => {
//     const { error: profileError } = await supabase
//       .from('profiles')
//       .insert([{ id: userId, email, full_name: fullName, phone: phone || null }]);
//     if (profileError) console.error('Error perfil:', profileError);

//     const { error: listError } = await supabase
//       .from('lists')
//       .insert([{ user_id: userId, name: 'Personal', balance: 0, icon: '👤' }]);
//     if (listError) console.error('Error lista:', listError);

//     const exampleCategories = [
//       { user_id: userId, name: 'Comida', icon: '🍔', type: 'gasto' },
//       { user_id: userId, name: 'Transporte', icon: '🚗', type: 'gasto' },
//       { user_id: userId, name: 'Entretenimiento', icon: '🎬', type: 'gasto' },
//       { user_id: userId, name: 'Salud', icon: '🏥', type: 'gasto' },
//       { user_id: userId, name: 'Hogar', icon: '🏠', type: 'gasto' },
//       { user_id: userId, name: 'Salario', icon: '💵', type: 'ingreso' },
//       { user_id: userId, name: 'Freelance', icon: '💻', type: 'ingreso' },
//     ];

//     for (const cat of exampleCategories) {
//       const { error: catError } = await supabase.from('categories').insert([cat]);
//       if (catError) console.error('Error categoría:', catError);
//     }
//   };

//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Validaciones en español
//     if (password !== confirmPassword) { 
//       setError('❌ Las contraseñas no coinciden'); 
//       setLoading(false); 
//       return; 
//     }
//     if (password.length < 6) { 
//       setError('❌ La contraseña debe tener al menos 6 caracteres'); 
//       setLoading(false); 
//       return; 
//     }
//     if (!fullName.trim()) { 
//       setError('❌ Ingresa tu nombre completo'); 
//       setLoading(false); 
//       return; 
//     }
//     if (!acceptedTerms) { 
//       setError('❌ Debes aceptar los términos y condiciones para crear una cuenta'); 
//       setLoading(false); 
//       return; 
//     }
//     if (!email.includes('@')) {
//       setError('❌ Ingresa un correo electrónico válido');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: { data: { full_name: fullName, phone } }
//       });

//       if (error) throw error;

//       if (data.user) {
//         await setupNewUser(data.user.id, email, fullName, phone);
//         setSuccessMessage('✅ ¡Cuenta creada exitosamente! Redirigiendo...');
//         setShowGuide(true);

//         const { data: sessionData } = await supabase.auth.getSession();
//         setTimeout(() => {
//           onAuthSuccess(sessionData.session);
//         }, 2000);
//       }
//     } catch (err) {
//       setError(translateError(err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');

//     // Validación básica
//     if (!email.includes('@')) {
//       setError('❌ Ingresa un correo electrónico válido');
//       setLoading(false);
//       return;
//     }
//     if (!password) {
//       setError('❌ Ingresa tu contraseña');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({ email, password });
//       if (error) throw error;
      
//       // Guardar email si "recordarme" está activado
//       if (rememberEmail) {
//         localStorage.setItem('moar_saved_email', email);
//       } else {
//         localStorage.removeItem('moar_saved_email');
//       }
      
//       onAuthSuccess(data.session);
//     } catch (err) {
//       setError(translateError(err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setResetMessage('');

//     if (!resetEmail.includes('@')) {
//       setError('❌ Ingresa un correo electrónico válido');
//       setLoading(false);
//       return;
//     }

//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
//         redirectTo: window.location.origin + '/reset-password',
//       });
//       if (error) throw error;
//       setResetMessage('✅ Te enviamos un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.');
//       setTimeout(() => {
//         setResetPasswordMode(false);
//         setResetEmail('');
//         setResetMessage('');
//       }, 5000);
//     } catch (err) {
//       setError(translateError(err.message));
//     } finally {
//       setLoading(false);
//     }
//   };

//   const TermsModal = () => (
//     <div className="terms-modal-overlay" onClick={() => setShowTerms(false)}>
//       <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="terms-header">
//           <h2>📋 Términos y Condiciones</h2>
//           <button className="terms-close" onClick={() => setShowTerms(false)}>✖</button>
//         </div>
//         <div className="terms-content">
//           <section>
//             <h3>1. Aceptación de los Términos</h3>
//             <p>Al crear una cuenta en MOAR, aceptas cumplir con estos términos y condiciones.</p>
//           </section>
//           <section>
//             <h3>2. Privacidad de tus Datos</h3>
//             <p>Tus datos financieros son completamente privados. MOAR no comparte tu información con terceros. Toda la información está protegida por Supabase y solo tú tienes acceso.</p>
//           </section>
//           <section>
//             <h3>3. Responsabilidad del Usuario</h3>
//             <p>Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.</p>
//           </section>
//           <section>
//             <h3>4. Uso de la Aplicación</h3>
//             <p>MOAR es una herramienta de gestión financiera personal. No nos hacemos responsables por decisiones financieras tomadas basadas en los datos de la aplicación.</p>
//           </section>
//           <section>
//             <h3>5. Modificaciones</h3>
//             <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados por correo electrónico.</p>
//           </section>
//           <section>
//             <h3>6. Contacto</h3>
//             <p>Si tienes preguntas sobre estos términos, contáctanos a: soporte@moar.com</p>
//           </section>
//         </div>
//         <div className="terms-footer">
//           <button className="terms-accept-btn" onClick={() => {
//             setAcceptedTerms(true);
//             setShowTerms(false);
//           }}>✅ Acepto los Términos</button>
//         </div>
//       </div>
//     </div>
//   );

//   const GuideModal = () => (
//     <div className="guide-modal-overlay" onClick={() => setShowGuide(false)}>
//       <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
//         <div className="guide-icon">🎉</div>
//         <h2>¡Bienvenido a MOAR!</h2>
//         <p className="guide-subtitle">Todo lo que crees es tuyo y solo tú lo verás.</p>
        
//         <div className="guide-steps">
//           <div className="guide-step">
//             <span className="step-number">1</span>
//             <div className="step-content">
//               <h3>Registra tus movimientos</h3>
//               <p>Usa los botones "Gasto" o "Ingreso" para llevar tu registro financiero.</p>
//             </div>
//           </div>
//           <div className="guide-step">
//             <span className="step-number">2</span>
//             <div className="step-content">
//               <h3>Crea más categorías</h3>
//               <p>Ya tienes algunas de ejemplo. Puedes agregar las que necesites.</p>
//             </div>
//           </div>
//           <div className="guide-step">
//             <span className="step-number">3</span>
//             <div className="step-content">
//               <h3>Explora todas las funciones</h3>
//               <p>Tarjetas de crédito, presupuestos, bolsillos de ahorro y más.</p>
//             </div>
//           </div>
//         </div>
        
//         <button className="guide-btn" onClick={() => setShowGuide(false)}>
//           Comenzar
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {showGuide && <GuideModal />}
//       {showTerms && <TermsModal />}
      
//       <div className="auth-container">
//         <div className="auth-card">
//           <div className="auth-header">
//             <h1>💲 MOAR</h1>
//             <p>{resetPasswordMode ? 'Recuperar contraseña' : (isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta')}</p>
//           </div>

//           {!resetPasswordMode ? (
//             <>
//               <div className="auth-tabs">
//                 <button 
//                   className={`auth-tab ${isLogin ? 'active' : ''}`} 
//                   onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
//                 >
//                   Iniciar Sesión
//                 </button>
//                 <button 
//                   className={`auth-tab ${!isLogin ? 'active' : ''}`} 
//                   onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
//                 >
//                   Crear Cuenta
//                 </button>
//               </div>

//               {error && <div className="auth-error">{error}</div>}
//               {successMessage && <div className="auth-success">{successMessage}</div>}

//               <form onSubmit={isLogin ? handleLogin : handleSignUp}>
//                 {!isLogin && (
//                   <>
//                     <div className="form-group">
//                       <label>Nombre completo</label>
//                       <input 
//                         type="text" 
//                         value={fullName} 
//                         onChange={(e) => setFullName(e.target.value)} 
//                         required 
//                         placeholder="Juan Pérez"
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label>Teléfono (opcional)</label>
//                       <input 
//                         type="tel" 
//                         value={phone} 
//                         onChange={(e) => setPhone(e.target.value)} 
//                         placeholder="300 123 4567"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div className="form-group">
//                   <label>Correo electrónico</label>
//                   <input 
//                     type="email" 
//                     value={email} 
//                     onChange={(e) => setEmail(e.target.value)} 
//                     required 
//                     placeholder="tu@email.com"
//                     autoComplete="email"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Contraseña</label>
//                   <input 
//                     type="password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     required 
//                     placeholder="••••••••"
//                     autoComplete={isLogin ? "current-password" : "new-password"}
//                   />
//                 </div>

//                 {!isLogin && (
//                   <>
//                     <div className="form-group">
//                       <label>Confirmar contraseña</label>
//                       <input 
//                         type="password" 
//                         value={confirmPassword} 
//                         onChange={(e) => setConfirmPassword(e.target.value)} 
//                         required 
//                         placeholder="••••••••"
//                         autoComplete="new-password"
//                       />
//                     </div>
//                     <label className="checkbox-label">
//                       <input 
//                         type="checkbox" 
//                         checked={acceptedTerms} 
//                         onChange={(e) => setAcceptedTerms(e.target.checked)} 
//                       />
//                       <span>
//                         Acepto los <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>términos y condiciones</button>
//                       </span>
//                     </label>
//                   </>
//                 )}

//                 {isLogin && (
//                   <label className="checkbox-label">
//                     <input 
//                       type="checkbox" 
//                       checked={rememberEmail} 
//                       onChange={(e) => setRememberEmail(e.target.checked)} 
//                     />
//                     <span>Recordar mi correo electrónico</span>
//                   </label>
//                 )}

//                 <button type="submit" className="auth-btn" disabled={loading}>
//                   {loading ? (
//                     <span>⏳ Cargando...</span>
//                   ) : (
//                     isLogin ? '🔓 Iniciar Sesión' : '📝 Crear Cuenta'
//                   )}
//                 </button>

//                 {isLogin && (
//                   <button 
//                     type="button" 
//                     className="forgot-password-btn"
//                     onClick={() => setResetPasswordMode(true)}
//                   >
//                     ¿Olvidaste tu contraseña?
//                   </button>
//                 )}
//               </form>
//             </>
//           ) : (
//             <form onSubmit={handleResetPassword}>
//               <div className="form-group">
//                 <label>Correo electrónico</label>
//                 <input 
//                   type="email" 
//                   value={resetEmail} 
//                   onChange={(e) => setResetEmail(e.target.value)} 
//                   required 
//                   placeholder="tu@email.com"
//                 />
//               </div>
              
//               {resetMessage && <div className="auth-success">{resetMessage}</div>}
//               {error && <div className="auth-error">{error}</div>}
              
//               <button type="submit" className="auth-btn" disabled={loading}>
//                 {loading ? '⏳ Enviando...' : '📧 Enviar correo de recuperación'}
//               </button>
              
//               <button 
//                 type="button" 
//                 className="back-to-login-btn"
//                 onClick={() => {
//                   setResetPasswordMode(false);
//                   setError('');
//                   setResetMessage('');
//                   setResetEmail('');
//                 }}
//               >
//                 ← Volver al inicio de sesión
//               </button>
//             </form>
//           )}

//           <div className="auth-footer">
//             <p>🔒 Protegido por Supabase</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Auth;
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [rememberEmail, setRememberEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showGuide, setShowGuide] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [resetPasswordMode, setResetPasswordMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  // Cargar email guardado al iniciar
  useEffect(() => {
    const savedEmail = localStorage.getItem('moar_saved_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberEmail(true);
    }
  }, []);

  // Función para traducir errores de Supabase
  const translateError = (errorMessage) => {
    const errorMap = {
      'Invalid login credentials': '❌ Correo o contraseña incorrectos',
      'Email not confirmed': '❌ Por favor confirma tu correo electrónico antes de iniciar sesión',
      'User already registered': '❌ Este correo ya está registrado. Inicia sesión o recupera tu contraseña',
      'Password should be at least 6 characters': '❌ La contraseña debe tener al menos 6 caracteres',
      'Email rate limit exceeded': '❌ Demasiados intentos. Espera un momento antes de intentar nuevamente',
      'Invalid email': '❌ Por favor ingresa un correo electrónico válido',
      'Unable to validate email address': '❌ El correo electrónico no es válido. Verifica que esté bien escrito',
      'Password recovery requires an email': '❌ Ingresa tu correo electrónico para recuperar tu contraseña',
      'User not found': '❌ No encontramos una cuenta con este correo electrónico',
    };
    
    for (const [key, value] of Object.entries(errorMap)) {
      if (errorMessage?.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
    return `❌ ${errorMessage || 'Ocurrió un error inesperado'}`;
  };

  const setupNewUser = async (userId, email, fullName, phone) => {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, email, full_name: fullName, phone: phone || null }]);
    if (profileError) console.error('Error perfil:', profileError);

    const { error: listError } = await supabase
      .from('lists')
      .insert([{ user_id: userId, name: 'Personal', balance: 0, icon: '👤' }]);
    if (listError) console.error('Error lista:', listError);

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
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password !== confirmPassword) { 
      setError('❌ Las contraseñas no coinciden'); 
      setLoading(false); 
      return; 
    }
    if (password.length < 6) { 
      setError('❌ La contraseña debe tener al menos 6 caracteres'); 
      setLoading(false); 
      return; 
    }
    if (!fullName.trim()) { 
      setError('❌ Ingresa tu nombre completo'); 
      setLoading(false); 
      return; 
    }
    if (!acceptedTerms) { 
      setError('❌ Debes aceptar los términos y condiciones para crear una cuenta'); 
      setLoading(false); 
      return; 
    }
    if (!email.includes('@')) {
      setError('❌ Ingresa un correo electrónico válido');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone } }
      });

      if (error) throw error;

      if (data.user) {
        await setupNewUser(data.user.id, email, fullName, phone);
        setSuccessMessage('✅ ¡Cuenta creada exitosamente! Redirigiendo...');
        setShowGuide(true);

        const { data: sessionData } = await supabase.auth.getSession();
        setTimeout(() => {
          onAuthSuccess(sessionData.session);
        }, 2000);
      }
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!email.includes('@')) {
      setError('❌ Ingresa un correo electrónico válido');
      setLoading(false);
      return;
    }
    if (!password) {
      setError('❌ Ingresa tu contraseña');
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      if (rememberEmail) {
        localStorage.setItem('moar_saved_email', email);
      } else {
        localStorage.removeItem('moar_saved_email');
      }
      
      onAuthSuccess(data.session);
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResetMessage('');

    if (!resetEmail.includes('@')) {
      setError('❌ Ingresa un correo electrónico válido');
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: window.location.origin + '/reset-password',
      });
      if (error) throw error;
      setResetMessage('✅ Te enviamos un correo para restablecer tu contraseña. Revisa tu bandeja de entrada.');
      setTimeout(() => {
        setResetPasswordMode(false);
        setResetEmail('');
        setResetMessage('');
      }, 5000);
    } catch (err) {
      setError(translateError(err.message));
    } finally {
      setLoading(false);
    }
  };

  const TermsModal = () => (
    <div className="terms-modal-overlay" onClick={() => setShowTerms(false)}>
      <div className="terms-modal" onClick={(e) => e.stopPropagation()}>
        <div className="terms-header">
          <h2>📋 Términos y Condiciones</h2>
          <button className="terms-close" onClick={() => setShowTerms(false)}>✖</button>
        </div>
        <div className="terms-content">
          <section>
            <h3>1. Aceptación de los Términos</h3>
            <p>Al crear una cuenta en MOAR, aceptas cumplir con estos términos y condiciones.</p>
          </section>
          <section>
            <h3>2. Privacidad de tus Datos</h3>
            <p>Tus datos financieros son completamente privados. MOAR no comparte tu información con terceros. Toda la información está protegida por Supabase y solo tú tienes acceso.</p>
          </section>
          <section>
            <h3>3. Responsabilidad del Usuario</h3>
            <p>Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta.</p>
          </section>
          <section>
            <h3>4. Uso de la Aplicación</h3>
            <p>MOAR es una herramienta de gestión financiera personal. No nos hacemos responsables por decisiones financieras tomadas basadas en los datos de la aplicación.</p>
          </section>
          <section>
            <h3>5. Modificaciones</h3>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados por correo electrónico.</p>
          </section>
          <section>
            <h3>6. Contacto</h3>
            <p>Si tienes preguntas sobre estos términos, contáctanos a: soporte@moar.com</p>
          </section>
        </div>
        <div className="terms-footer">
          <button className="terms-accept-btn" onClick={() => {
            setAcceptedTerms(true);
            setShowTerms(false);
          }}>✅ Acepto los Términos</button>
        </div>
      </div>
    </div>
  );

  const GuideModal = () => (
    <div className="guide-modal-overlay" onClick={() => setShowGuide(false)}>
      <div className="guide-modal" onClick={(e) => e.stopPropagation()}>
        <div className="guide-icon">🎉</div>
        <h2>¡Bienvenido a MOAR!</h2>
        <p className="guide-subtitle">Todo lo que crees es tuyo y solo tú lo verás.</p>
        
        <div className="guide-steps">
          <div className="guide-step">
            <span className="step-number">1</span>
            <div className="step-content">
              <h3>Registra tus movimientos</h3>
              <p>Usa los botones "Gasto" o "Ingreso" para llevar tu registro financiero.</p>
            </div>
          </div>
          <div className="guide-step">
            <span className="step-number">2</span>
            <div className="step-content">
              <h3>Crea más categorías</h3>
              <p>Ya tienes algunas de ejemplo. Puedes agregar las que necesites.</p>
            </div>
          </div>
          <div className="guide-step">
            <span className="step-number">3</span>
            <div className="step-content">
              <h3>Explora todas las funciones</h3>
              <p>Tarjetas de crédito, presupuestos, bolsillos de ahorro y más.</p>
            </div>
          </div>
        </div>
        
        <button className="guide-btn" onClick={() => setShowGuide(false)}>
          Comenzar
        </button>
      </div>
    </div>
  );

  return (
    <>
      {showGuide && <GuideModal />}
      {showTerms && <TermsModal />}
      
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="logo-area">
              <img src="/logo.png" alt="MOAR" className="auth-logo" />
              <h1>MOAR</h1>
            </div>
            <p>{resetPasswordMode ? 'Recuperar contraseña' : (isLogin ? 'Bienvenido de vuelta' : 'Crea tu cuenta')}</p>
          </div>

          {!resetPasswordMode ? (
            <>
              <div className="auth-tabs">
                <button 
                  className={`auth-tab ${isLogin ? 'active' : ''}`} 
                  onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
                >
                  Iniciar Sesión
                </button>
                <button 
                  className={`auth-tab ${!isLogin ? 'active' : ''}`} 
                  onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
                >
                  Crear Cuenta
                </button>
              </div>

              {error && <div className="auth-error">{error}</div>}
              {successMessage && <div className="auth-success">{successMessage}</div>}

              <form onSubmit={isLogin ? handleLogin : handleSignUp}>
                {!isLogin && (
                  <>
                    <div className="form-group">
                      <label>Nombre completo</label>
                      <input 
                        type="text" 
                        value={fullName} 
                        onChange={(e) => setFullName(e.target.value)} 
                        required 
                        placeholder="Juan Pérez"
                      />
                    </div>
                    <div className="form-group">
                      <label>Teléfono (opcional)</label>
                      <input 
                        type="tel" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        placeholder="300 123 4567"
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>Correo electrónico</label>
                  <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    placeholder="tu@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña</label>
                  <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    placeholder="••••••••"
                    autoComplete={isLogin ? "current-password" : "new-password"}
                  />
                </div>

                {!isLogin && (
                  <>
                    <div className="form-group">
                      <label>Confirmar contraseña</label>
                      <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />
                    </div>
                    <label className="checkbox-label">
                      <input 
                        type="checkbox" 
                        checked={acceptedTerms} 
                        onChange={(e) => setAcceptedTerms(e.target.checked)} 
                      />
                      <span>
                        Acepto los <button type="button" className="terms-link" onClick={() => setShowTerms(true)}>términos y condiciones</button>
                      </span>
                    </label>
                  </>
                )}

                {isLogin && (
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      checked={rememberEmail} 
                      onChange={(e) => setRememberEmail(e.target.checked)} 
                    />
                    <span>Recordar mi correo electrónico</span>
                  </label>
                )}

                <button type="submit" className="auth-btn" disabled={loading}>
                  {loading ? (
                    <span>⏳ Cargando...</span>
                  ) : (
                    isLogin ? '🔓 Iniciar Sesión' : '📝 Crear Cuenta'
                  )}
                </button>

                {isLogin && (
                  <button 
                    type="button" 
                    className="forgot-password-btn"
                    onClick={() => setResetPasswordMode(true)}
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                )}
              </form>
            </>
          ) : (
            <form onSubmit={handleResetPassword}>
              <div className="form-group">
                <label>Correo electrónico</label>
                <input 
                  type="email" 
                  value={resetEmail} 
                  onChange={(e) => setResetEmail(e.target.value)} 
                  required 
                  placeholder="tu@email.com"
                />
              </div>
              
              {resetMessage && <div className="auth-success">{resetMessage}</div>}
              {error && <div className="auth-error">{error}</div>}
              
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? '⏳ Enviando...' : '📧 Enviar correo de recuperación'}
              </button>
              
              <button 
                type="button" 
                className="back-to-login-btn"
                onClick={() => {
                  setResetPasswordMode(false);
                  setError('');
                  setResetMessage('');
                  setResetEmail('');
                }}
              >
                ← Volver al inicio de sesión
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>🔒 Protegido por Supabase</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Auth;