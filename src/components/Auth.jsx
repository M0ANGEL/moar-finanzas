// // // import React, { useState } from 'react';
// // // import { supabase } from '../lib/supabase';

// // // function Auth({ onAuthSuccess }) {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [email, setEmail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [acceptedTerms, setAcceptedTerms] = useState(false);
// // //   const [loading, setLoading] = useState(false);
// // //   const [error, setError] = useState('');
// // //   const [successMessage, setSuccessMessage] = useState('');
// // //   const [showTermsModal, setShowTermsModal] = useState(false);

// // //   const handleLogin = async (e) => {
// // //     e.preventDefault();
// // //     setLoading(true);
// // //     setError('');
    
// // //     try {
// // //       const { data, error } = await supabase.auth.signInWithPassword({
// // //         email,
// // //         password,
// // //       });
      
// // //       if (error) throw error;
      
// // //       onAuthSuccess(data.user);
// // //     } catch (err) {
// // //       setError(err.message);
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //  const handleSignUp = async (e) => {
// // //   e.preventDefault();
// // //   setLoading(true);
// // //   setError('');
  
// // //   if (password !== confirmPassword) {
// // //     setError('Las contraseñas no coinciden');
// // //     setLoading(false);
// // //     return;
// // //   }
  
// // //   if (!acceptedTerms) {
// // //     setError('Debes aceptar los términos y condiciones');
// // //     setLoading(false);
// // //     return;
// // //   }
  
// // //   try {
// // //     const { data, error } = await supabase.auth.signUp({
// // //       email,
// // //       password,
// // //       options: {
// // //         data: {
// // //           accepted_terms: true,
// // //           accepted_terms_at: new Date().toISOString(),
// // //         }
// // //       }
// // //     });
    
// // //     if (error) throw error;
    
// // //     // Crear perfil automáticamente si el usuario se creó
// // //     if (data.user) {
// // //       await ensureProfile(data.user);
// // //     }
    
// // //     setSuccessMessage('¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.');
// // //     setTimeout(() => {
// // //       setIsLogin(true);
// // //       setSuccessMessage('');
// // //     }, 3000);
// // //   } catch (err) {
// // //     setError(err.message);
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
// // //   const handleGoogleLogin = async () => {
// // //     setLoading(true);
// // //     setError('');
    
// // //     try {
// // //       const { error } = await supabase.auth.signInWithOAuth({
// // //         provider: 'google',
// // //         options: {
// // //           redirectTo: window.location.origin,
// // //         }
// // //       });
      
// // //       if (error) throw error;
// // //     } catch (err) {
// // //       setError(err.message);
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const TermsModal = () => (
// // //     <div className="modal" onClick={() => setShowTermsModal(false)}>
// // //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// // //         <h3>📋 Términos y Condiciones</h3>
// // //         <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', fontSize: '0.8rem', lineHeight: '1.6' }}>
// // //           <p><strong>1. Aceptación de los Términos</strong></p>
// // //           <p>Al crear una cuenta en MOAR, aceptas estos términos y condiciones en su totalidad.</p>
          
// // //           <p><strong>2. Privacidad y Datos</strong></p>
// // //           <p>Tus datos financieros se almacenan de forma segura en Supabase. No compartimos tu información con terceros sin tu consentimiento.</p>
          
// // //           <p><strong>3. Responsabilidad del Usuario</strong></p>
// // //           <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. MOAR no se hace responsable por pérdidas derivadas del acceso no autorizado a tu cuenta.</p>
          
// // //           <p><strong>4. Uso Aceptable</strong></p>
// // //           <p>La aplicación está diseñada para el seguimiento personal de finanzas. No está permitido el uso para actividades ilegales.</p>
          
// // //           <p><strong>5. Limitación de Responsabilidad</strong></p>
// // //           <p>MOAR se proporciona "tal cual". No garantizamos que la aplicación esté libre de errores o interrupciones.</p>
          
// // //           <p><strong>6. Modificaciones</strong></p>
// // //           <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán notificados por correo electrónico.</p>
          
// // //           <p><strong>7. Cancelación de Cuenta</strong></p>
// // //           <p>Puedes eliminar tu cuenta en cualquier momento desde la configuración. Tus datos serán eliminados permanentemente.</p>
          
// // //           <p><strong>8. Ley Aplicable</strong></p>
// // //           <p>Estos términos se rigen por las leyes de Colombia.</p>
// // //         </div>
// // //         <div className="modal-buttons">
// // //           <button type="button" onClick={() => setShowTermsModal(false)}>Cerrar</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );

// // //   return (
// // //     <>
// // //       {showTermsModal && <TermsModal />}
      
// // //       <div className="auth-container">
// // //         <div className="auth-card">
// // //           <div className="auth-header">
// // //             <h1>💰 MOAR</h1>
// // //             <p>{isLogin ? 'Bienvenido de vuelta' : 'Comienza a gestionar tus finanzas'}</p>
// // //           </div>
          
// // //           <div className="auth-tabs">
// // //             <button 
// // //               className={`auth-tab ${isLogin ? 'active' : ''}`}
// // //               onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
// // //             >
// // //               Iniciar Sesión
// // //             </button>
// // //             <button 
// // //               className={`auth-tab ${!isLogin ? 'active' : ''}`}
// // //               onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
// // //             >
// // //               Crear Cuenta
// // //             </button>
// // //           </div>
          
// // //           {error && <div className="auth-error">{error}</div>}
// // //           {successMessage && <div className="auth-success">{successMessage}</div>}
          
// // //           <form onSubmit={isLogin ? handleLogin : handleSignUp}>
// // //             <div className="form-group">
// // //               <label>Correo Electrónico</label>
// // //               <input
// // //                 type="email"
// // //                 value={email}
// // //                 onChange={(e) => setEmail(e.target.value)}
// // //                 required
// // //                 placeholder="tu@email.com"
// // //               />
// // //             </div>
            
// // //             <div className="form-group">
// // //               <label>Contraseña</label>
// // //               <input
// // //                 type="password"
// // //                 value={password}
// // //                 onChange={(e) => setPassword(e.target.value)}
// // //                 required
// // //                 placeholder="••••••••"
// // //               />
// // //             </div>
            
// // //             {!isLogin && (
// // //               <>
// // //                 <div className="form-group">
// // //                   <label>Confirmar Contraseña</label>
// // //                   <input
// // //                     type="password"
// // //                     value={confirmPassword}
// // //                     onChange={(e) => setConfirmPassword(e.target.value)}
// // //                     required
// // //                     placeholder="••••••••"
// // //                   />
// // //                 </div>
                
// // //                 <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
// // //                   <input
// // //                     type="checkbox"
// // //                     id="terms"
// // //                     checked={acceptedTerms}
// // //                     onChange={(e) => setAcceptedTerms(e.target.checked)}
// // //                     style={{ width: 'auto', margin: 0 }}
// // //                   />
// // //                   <label htmlFor="terms" style={{ margin: 0, fontSize: '0.75rem' }}>
// // //                     Acepto los{' '}
// // //                     <button 
// // //                       type="button" 
// // //                       onClick={() => setShowTermsModal(true)}
// // //                       style={{ background: 'none', border: 'none', color: 'var(--info)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
// // //                     >
// // //                       términos y condiciones
// // //                     </button>
// // //                   </label>
// // //                 </div>
// // //               </>
// // //             )}
            
// // //             <button type="submit" className="auth-btn primary" disabled={loading}>
// // //               {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
// // //             </button>
// // //           </form>
          
// // //           <div className="auth-divider">
// // //             <span>o</span>
// // //           </div>
          
// // //           <button onClick={handleGoogleLogin} className="auth-btn google" disabled={loading}>
// // //             <span className="google-icon">G</span>
// // //             Continuar con Google
// // //           </button>
          
// // //           {isLogin && (
// // //             <button 
// // //               className="auth-link"
// // //               onClick={() => {
// // //                 if (email) {
// // //                   // Implementar recuperación de contraseña
// // //                   setError('Función de recuperación disponible próximamente');
// // //                 } else {
// // //                   setError('Ingresa tu correo para recuperar contraseña');
// // //                 }
// // //               }}
// // //             >
// // //               ¿Olvidaste tu contraseña?
// // //             </button>
// // //           )}
          
// // //           <div className="auth-footer">
// // //             <p>Protegido por Supabase 🔒</p>
// // //             <p><a href="#" onClick={() => setShowTermsModal(true)}>Términos y Condiciones</a></p>
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </>
// // //   );
// // // }

// // // export default Auth;
// // import React, { useState } from 'react';
// // import { supabase, ensureProfile } from '../lib/supabase';

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
// //   const [showTermsModal, setShowTermsModal] = useState(false);
// //   const [showResetModal, setShowResetModal] = useState(false);
// //   const [resetEmail, setResetEmail] = useState('');

// //   // Iniciar sesión
// //   const handleLogin = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       const { data, error } = await supabase.auth.signInWithPassword({
// //         email,
// //         password,
// //       });
      
// //       if (error) throw error;
      
// //       onAuthSuccess(data.user);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Registrar usuario
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
// //       setError('Por favor ingresa tu nombre completo');
// //       setLoading(false);
// //       return;
// //     }
    
// //     if (!acceptedTerms) {
// //       setError('Debes aceptar los términos y condiciones');
// //       setLoading(false);
// //       return;
// //     }
    
// //     try {
// //       const { data, error } = await supabase.auth.signUp({
// //         email,
// //         password,
// //         options: {
// //           data: {
// //             full_name: fullName,
// //             phone: phone,
// //             accepted_terms: true,
// //             accepted_terms_at: new Date().toISOString(),
// //           }
// //         }
// //       });
      
// //       if (error) throw error;
      
// //       if (data.user) {
// //         await ensureProfile(data.user);
// //       }
      
// //       setSuccessMessage('¡Cuenta creada! Revisa tu correo para confirmar tu cuenta.');
// //       setTimeout(() => {
// //         setIsLogin(true);
// //         setSuccessMessage('');
// //         setFullName('');
// //         setPhone('');
// //         setEmail('');
// //         setPassword('');
// //         setConfirmPassword('');
// //       }, 3000);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Recuperar contraseña
// //   const handleResetPassword = async () => {
// //     if (!resetEmail) {
// //       setError('Ingresa tu correo electrónico');
// //       return;
// //     }
    
// //     setLoading(true);
// //     setError('');
    
// //     try {
// //       const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
// //         redirectTo: `${window.location.origin}/reset-password`,
// //       });
      
// //       if (error) throw error;
      
// //       setSuccessMessage('Revisa tu correo para restablecer la contraseña');
// //       setTimeout(() => {
// //         setShowResetModal(false);
// //         setSuccessMessage('');
// //         setResetEmail('');
// //       }, 3000);
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Modal de términos
// //   const TermsModal = () => (
// //     <div className="modal" onClick={() => setShowTermsModal(false)}>
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <h3>📋 Términos y Condiciones</h3>
// //         <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', fontSize: '0.8rem', lineHeight: '1.6' }}>
// //           <p><strong>1. Aceptación de los Términos</strong></p>
// //           <p>Al crear una cuenta en MOAR, aceptas estos términos y condiciones en su totalidad.</p>
          
// //           <p><strong>2. Datos que recopilamos</strong></p>
// //           <p>Recopilamos la siguiente información: nombre completo, correo electrónico, número de teléfono y datos financieros que ingreses voluntariamente (gastos, ingresos, presupuestos).</p>
          
// //           <p><strong>3. Uso de tus datos</strong></p>
// //           <p>Tus datos se utilizan exclusivamente para: (a) operar la aplicación, (b) personalizar tu experiencia, (c) enviar notificaciones importantes sobre tu cuenta.</p>
          
// //           <p><strong>4. Almacenamiento de datos</strong></p>
// //           <p>Tus datos se almacenan de forma segura en Supabase con cifrado en tránsito y en reposo. No compartimos tu información con terceros sin tu consentimiento explícito.</p>
          
// //           <p><strong>5. Responsabilidad del Usuario</strong></p>
// //           <p>Eres responsable de mantener la confidencialidad de tu cuenta y contraseña. MOAR no se hace responsable por pérdidas derivadas del acceso no autorizado a tu cuenta.</p>
          
// //           <p><strong>6. Derechos ARCO</strong></p>
// //           <p>Tienes derecho a Acceder, Rectificar, Cancelar y Oponerte al uso de tus datos personales. Para ejercer estos derechos, contacta a soporte@moar.app.</p>
          
// //           <p><strong>7. Cancelación de Cuenta</strong></p>
// //           <p>Puedes eliminar tu cuenta en cualquier momento. Tus datos serán eliminados permanentemente dentro de los 30 días posteriores a la solicitud.</p>
          
// //           <p><strong>8. Ley Aplicable</strong></p>
// //           <p>Estos términos se rigen por las leyes de Colombia.</p>
// //         </div>
// //         <div className="modal-buttons">
// //           <button type="button" onClick={() => setShowTermsModal(false)}>Cerrar</button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   // Modal recuperar contraseña
// //   const ResetModal = () => (
// //     <div className="modal" onClick={() => setShowResetModal(false)}>
// //       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
// //         <h3>🔐 Recuperar Contraseña</h3>
// //         <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
// //         <input
// //           type="email"
// //           placeholder="tu@email.com"
// //           value={resetEmail}
// //           onChange={(e) => setResetEmail(e.target.value)}
// //           style={{ width: '100%', padding: '10px', margin: '15px 0', borderRadius: '8px', border: '1px solid var(--border)' }}
// //         />
// //         <div className="modal-buttons">
// //           <button type="button" onClick={handleResetPassword} disabled={loading}>
// //             {loading ? 'Enviando...' : 'Enviar enlace'}
// //           </button>
// //           <button type="button" onClick={() => setShowResetModal(false)}>Cancelar</button>
// //         </div>
// //       </div>
// //     </div>
// //   );

// //   return (
// //     <>
// //       {showTermsModal && <TermsModal />}
// //       {showResetModal && <ResetModal />}
      
// //       <div className="auth-container">
// //         <div className="auth-card">
// //           <div className="auth-header">
// //             <h1>💰 MOAR</h1>
// //             <p>{isLogin ? 'Bienvenido de vuelta' : 'Comienza a gestionar tus finanzas'}</p>
// //           </div>
          
// //           <div className="auth-tabs">
// //             <button 
// //               className={`auth-tab ${isLogin ? 'active' : ''}`}
// //               onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
// //             >
// //               Iniciar Sesión
// //             </button>
// //             <button 
// //               className={`auth-tab ${!isLogin ? 'active' : ''}`}
// //               onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
// //             >
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
// //                   <input
// //                     type="text"
// //                     value={fullName}
// //                     onChange={(e) => setFullName(e.target.value)}
// //                     required
// //                     placeholder="Juan Pérez"
// //                   />
// //                 </div>
                
// //                 <div className="form-group">
// //                   <label>Teléfono</label>
// //                   <input
// //                     type="tel"
// //                     value={phone}
// //                     onChange={(e) => setPhone(e.target.value)}
// //                     placeholder="300 123 4567"
// //                   />
// //                 </div>
// //               </>
// //             )}
            
// //             <div className="form-group">
// //               <label>Correo Electrónico *</label>
// //               <input
// //                 type="email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 required
// //                 placeholder="tu@email.com"
// //               />
// //             </div>
            
// //             <div className="form-group">
// //               <label>Contraseña *</label>
// //               <input
// //                 type="password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 required
// //                 placeholder="••••••••"
// //               />
// //             </div>
            
// //             {!isLogin && (
// //               <>
// //                 <div className="form-group">
// //                   <label>Confirmar Contraseña *</label>
// //                   <input
// //                     type="password"
// //                     value={confirmPassword}
// //                     onChange={(e) => setConfirmPassword(e.target.value)}
// //                     required
// //                     placeholder="••••••••"
// //                   />
// //                 </div>
                
// //                 <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
// //                   <input
// //                     type="checkbox"
// //                     id="terms"
// //                     checked={acceptedTerms}
// //                     onChange={(e) => setAcceptedTerms(e.target.checked)}
// //                     style={{ width: 'auto', margin: 0 }}
// //                   />
// //                   <label htmlFor="terms" style={{ margin: 0, fontSize: '0.75rem' }}>
// //                     Acepto los{' '}
// //                     <button 
// //                       type="button" 
// //                       onClick={() => setShowTermsModal(true)}
// //                       style={{ background: 'none', border: 'none', color: 'var(--info)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
// //                     >
// //                       términos y condiciones
// //                     </button>
// //                   </label>
// //                 </div>
// //               </>
// //             )}
            
// //             <button type="submit" className="auth-btn primary" disabled={loading}>
// //               {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
// //             </button>
// //           </form>
          
// //           {isLogin && (
// //             <button 
// //               className="auth-link"
// //               onClick={() => setShowResetModal(true)}
// //             >
// //               ¿Olvidaste tu contraseña?
// //             </button>
// //           )}
          
// //           <div className="auth-footer">
// //             <p>Protegido por Supabase 🔒</p>
// //             <p>
// //               <a href="#" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>
// //                 Términos y Condiciones
// //               </a>
// //             </p>
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
//   const [showTermsModal, setShowTermsModal] = useState(false);
//   const [showResetModal, setShowResetModal] = useState(false);
//   const [resetEmail, setResetEmail] = useState('');

//   // FUNCIÓN PARA CREAR PERFIL Y LISTA MANUALMENTE
//   const createUserProfile = async (userId, email, fullName, phone) => {
//     try {
//       // Crear perfil
//       const { error: profileError } = await supabase
//         .from('profiles')
//         .insert([
//           {
//             id: userId,
//             email: email,
//             full_name: fullName || email.split('@')[0],
//             phone: phone || null
//           }
//         ]);

//       if (profileError) {
//         console.error('Error creando perfil:', profileError);
//         return false;
//       }

//       // Crear lista por defecto
//       const { error: listError } = await supabase
//         .from('lists')
//         .insert([
//           {
//             user_id: userId,
//             name: 'Personal',
//             balance: 0,
//             icon: '👤'
//           }
//         ]);

//       if (listError) {
//         console.error('Error creando lista:', listError);
//         return false;
//       }

//       console.log('✅ Perfil y lista creados exitosamente');
//       return true;
//     } catch (error) {
//       console.error('Error en createUserProfile:', error);
//       return false;
//     }
//   };

//   // Iniciar sesión
//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     try {
//       const { data, error } = await supabase.auth.signInWithPassword({
//         email,
//         password,
//       });
      
//       if (error) throw error;
      
//       onAuthSuccess(data.user);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Registrar usuario
//   const handleSignUp = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
    
//     // Validaciones
//     if (password !== confirmPassword) {
//       setError('Las contraseñas no coinciden');
//       setLoading(false);
//       return;
//     }
    
//     if (password.length < 6) {
//       setError('La contraseña debe tener al menos 6 caracteres');
//       setLoading(false);
//       return;
//     }
    
//     if (!fullName.trim()) {
//       setError('Por favor ingresa tu nombre completo');
//       setLoading(false);
//       return;
//     }
    
//     if (!acceptedTerms) {
//       setError('Debes aceptar los términos y condiciones');
//       setLoading(false);
//       return;
//     }
    
//     try {
//       // 1. Crear el usuario en Supabase Auth
//       const { data, error } = await supabase.auth.signUp({
//         email,
//         password,
//         options: {
//           data: {
//             full_name: fullName,
//             phone: phone,
//           }
//         }
//       });
      
//       if (error) throw error;
      
//       if (data.user) {
//         // 2. Crear el perfil y la lista manualmente
//         const profileCreated = await createUserProfile(
//           data.user.id, 
//           email, 
//           fullName, 
//           phone
//         );
        
//         if (profileCreated) {
//           setSuccessMessage('¡Cuenta creada exitosamente! Redirigiendo...');
//           setTimeout(() => {
//             onAuthSuccess(data.user);
//           }, 2000);
//         } else {
//           setError('Cuenta creada pero hubo un problema al configurar tu perfil. Contacta a soporte.');
//         }
//       }
//     } catch (err) {
//       console.error('Error en signUp:', err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Recuperar contraseña
//   const handleResetPassword = async () => {
//     if (!resetEmail) {
//       setError('Ingresa tu correo electrónico');
//       return;
//     }
    
//     setLoading(true);
//     setError('');
    
//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
//         redirectTo: `${window.location.origin}/reset-password`,
//       });
      
//       if (error) throw error;
      
//       setSuccessMessage('Revisa tu correo para restablecer la contraseña');
//       setTimeout(() => {
//         setShowResetModal(false);
//         setSuccessMessage('');
//         setResetEmail('');
//       }, 3000);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Modal de términos
//   const TermsModal = () => (
//     <div className="modal" onClick={() => setShowTermsModal(false)}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h3>📋 Términos y Condiciones</h3>
//         <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px', fontSize: '0.8rem', lineHeight: '1.6' }}>
//           <p><strong>1. Aceptación de los Términos</strong></p>
//           <p>Al crear una cuenta en MOAR, aceptas estos términos y condiciones en su totalidad.</p>
          
//           <p><strong>2. Datos que recopilamos</strong></p>
//           <p>Recopilamos la siguiente información: nombre completo, correo electrónico, número de teléfono y datos financieros que ingreses voluntariamente.</p>
          
//           <p><strong>3. Uso de tus datos</strong></p>
//           <p>Tus datos se utilizan exclusivamente para operar la aplicación y personalizar tu experiencia.</p>
          
//           <p><strong>4. Almacenamiento de datos</strong></p>
//           <p>Tus datos se almacenan de forma segura en Supabase con cifrado. No compartimos tu información con terceros sin tu consentimiento.</p>
          
//           <p><strong>5. Cancelación de Cuenta</strong></p>
//           <p>Puedes eliminar tu cuenta en cualquier momento. Tus datos serán eliminados permanentemente.</p>
//         </div>
//         <div className="modal-buttons">
//           <button type="button" onClick={() => setShowTermsModal(false)}>Cerrar</button>
//         </div>
//       </div>
//     </div>
//   );

//   // Modal recuperar contraseña
//   const ResetModal = () => (
//     <div className="modal" onClick={() => setShowResetModal(false)}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <h3>🔐 Recuperar Contraseña</h3>
//         <p>Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.</p>
//         <input
//           type="email"
//           placeholder="tu@email.com"
//           value={resetEmail}
//           onChange={(e) => setResetEmail(e.target.value)}
//           style={{ width: '100%', padding: '10px', margin: '15px 0', borderRadius: '8px', border: '1px solid var(--border)' }}
//         />
//         <div className="modal-buttons">
//           <button type="button" onClick={handleResetPassword} disabled={loading}>
//             {loading ? 'Enviando...' : 'Enviar enlace'}
//           </button>
//           <button type="button" onClick={() => setShowResetModal(false)}>Cancelar</button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <>
//       {showTermsModal && <TermsModal />}
//       {showResetModal && <ResetModal />}
      
//       <div className="auth-container">
//         <div className="auth-card">
//           <div className="auth-header">
//             <h1>💰 MOAR</h1>
//             <p>{isLogin ? 'Bienvenido de vuelta' : 'Comienza a gestionar tus finanzas'}</p>
//           </div>
          
//           <div className="auth-tabs">
//             <button 
//               className={`auth-tab ${isLogin ? 'active' : ''}`}
//               onClick={() => { setIsLogin(true); setError(''); setSuccessMessage(''); }}
//             >
//               Iniciar Sesión
//             </button>
//             <button 
//               className={`auth-tab ${!isLogin ? 'active' : ''}`}
//               onClick={() => { setIsLogin(false); setError(''); setSuccessMessage(''); }}
//             >
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
//                   <input
//                     type="text"
//                     value={fullName}
//                     onChange={(e) => setFullName(e.target.value)}
//                     required
//                     placeholder="Juan Pérez"
//                   />
//                 </div>
                
//                 <div className="form-group">
//                   <label>Teléfono</label>
//                   <input
//                     type="tel"
//                     value={phone}
//                     onChange={(e) => setPhone(e.target.value)}
//                     placeholder="300 123 4567"
//                   />
//                 </div>
//               </>
//             )}
            
//             <div className="form-group">
//               <label>Correo Electrónico *</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 placeholder="tu@email.com"
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Contraseña *</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 placeholder="••••••••"
//               />
//             </div>
            
//             {!isLogin && (
//               <>
//                 <div className="form-group">
//                   <label>Confirmar Contraseña *</label>
//                   <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                     placeholder="••••••••"
//                   />
//                 </div>
                
//                 <div className="form-group" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px' }}>
//                   <input
//                     type="checkbox"
//                     id="terms"
//                     checked={acceptedTerms}
//                     onChange={(e) => setAcceptedTerms(e.target.checked)}
//                     style={{ width: 'auto', margin: 0 }}
//                   />
//                   <label htmlFor="terms" style={{ margin: 0, fontSize: '0.75rem' }}>
//                     Acepto los{' '}
//                     <button 
//                       type="button" 
//                       onClick={() => setShowTermsModal(true)}
//                       style={{ background: 'none', border: 'none', color: 'var(--info)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
//                     >
//                       términos y condiciones
//                     </button>
//                   </label>
//                 </div>
//               </>
//             )}
            
//             <button type="submit" className="auth-btn primary" disabled={loading}>
//               {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Crear Cuenta')}
//             </button>
//           </form>
          
//           {isLogin && (
//             <button 
//               className="auth-link"
//               onClick={() => setShowResetModal(true)}
//             >
//               ¿Olvidaste tu contraseña?
//             </button>
//           )}
          
//           <div className="auth-footer">
//             <p>Protegido por Supabase 🔒</p>
//             <p>
//               <a href="#" onClick={(e) => { e.preventDefault(); setShowTermsModal(true); }}>
//                 Términos y Condiciones
//               </a>
//             </p>
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

  // Función para crear perfil y lista después del registro
  const setupUserData = async (userId, email, fullName, phone) => {
    console.log('Creando perfil para:', userId);
    
    // Crear perfil
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: userId, email, full_name: fullName, phone: phone || null }]);
    
    if (profileError) {
      console.error('Error perfil:', profileError);
      return false;
    }
    
    // Crear lista por defecto
    const { error: listError } = await supabase
      .from('lists')
      .insert([{ user_id: userId, name: 'Personal', balance: 0 }]);
    
    if (listError) {
      console.error('Error lista:', listError);
      return false;
    }
    
    console.log('✅ Perfil y lista creados');
    return true;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      setLoading(false);
      return;
    }
    
    if (!fullName.trim()) {
      setError('Ingresa tu nombre completo');
      setLoading(false);
      return;
    }
    
    if (!acceptedTerms) {
      setError('Acepta los términos y condiciones');
      setLoading(false);
      return;
    }
    
    try {
      // Registrar usuario
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName, phone } }
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Crear perfil y lista
        await setupUserData(data.user.id, email, fullName, phone);
        
        setSuccessMessage('¡Cuenta creada! Iniciando sesión...');
        setTimeout(() => onAuthSuccess(data.user), 2000);
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
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>💰 MOAR</h1>
          <p>{isLogin ? 'Bienvenido' : 'Crea tu cuenta'}</p>
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
  );
}

export default Auth;