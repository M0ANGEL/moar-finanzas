// import React, { useState } from "react";
// import { supabase, ensureProfile } from "../lib/supabase";

// function Auth({ onAuthSuccess }) {
//   const [isLogin, setIsLogin] = useState(true);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       if (isLogin) {
//         const { data, error } = await supabase.auth.signInWithPassword({
//           email,
//           password,
//         });
//         if (error) throw error;
//         if (data.user && onAuthSuccess) onAuthSuccess(data.session);
//       } else {
//         const { data, error } = await supabase.auth.signUp({
//           email,
//           password,
//           options: {
//             data: { full_name: fullName },
//           },
//         });
//         if (error) throw error;

//         if (data.user) {
//           await ensureProfile(data.user);
//           alert("✅ Registro exitoso! Ahora puedes iniciar sesión.");
//           setIsLogin(true);
//           setEmail("");
//           setPassword("");
//           setFullName("");
//         }
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <div className="auth-header">
//           <img src="/logo.png" alt="MOAR" className="auth-logo" />
//           <h1>MOAR</h1>
//           <p>Tu asistente financiero personal</p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           <h2>{isLogin ? "Iniciar Sesión" : "Crear Cuenta"}</h2>

//           {!isLogin && (
//             <input
//               type="text"
//               placeholder="Nombre completo"
//               value={fullName}
//               onChange={(e) => setFullName(e.target.value)}
//               required
//             />
//           )}

//           <input
//             type="email"
//             placeholder="Correo electrónico"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />

//           <input
//             type="password"
//             placeholder="Contraseña"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {error && <div className="auth-error">{error}</div>}

//           <button type="submit" disabled={loading}>
//             {loading ? "Cargando..." : isLogin ? "Ingresar" : "Registrarse"}
//           </button>

//           <button
//             type="button"
//             className="auth-switch"
//             onClick={() => {
//               setIsLogin(!isLogin);
//               setError("");
//             }}
//           >
//             {isLogin
//               ? "¿No tienes cuenta? Regístrate"
//               : "¿Ya tienes cuenta? Inicia sesión"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Auth;
import React, { useState } from "react";
import { supabase, ensureProfile } from "../lib/supabase";

// Estilos específicos para el componente Auth (puedes moverlos a App.css si prefieres)
const authStyles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    background: "var(--bg-primary)",
  },
  card: {
    background: "var(--card-bg)",
    borderRadius: "28px",
    padding: "32px 28px",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid var(--border)",
    transition: "all 0.2s ease",
  },
  header: {
    textAlign: "center",
    marginBottom: "28px",
  },
  logoArea: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  logo: {
    width: "40px",
    height: "40px",
    objectFit: "contain",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "600",
    letterSpacing: "-0.5px",
    margin: "0",
    background: "linear-gradient(135deg, var(--text-primary) 0%, var(--info) 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    fontSize: "0.8rem",
    color: "var(--text-secondary)",
    margin: "0",
  },
  tabs: {
    display: "flex",
    gap: "12px",
    marginBottom: "24px",
    background: "var(--hover-bg)",
    padding: "4px",
    borderRadius: "40px",
  },
  tab: {
    flex: 1,
    padding: "10px",
    background: "transparent",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: "500",
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    borderRadius: "36px",
  },
  tabActive: {
    background: "var(--card-bg)",
    color: "var(--text-primary)",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    border: "1px solid var(--border)",
    borderRadius: "14px",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    fontSize: "0.85rem",
    transition: "all 0.2s ease",
    outline: "none",
  },
  inputFocus: {
    borderColor: "var(--info)",
  },
  error: {
    background: "var(--expense-bg)",
    color: "var(--expense)",
    padding: "10px 14px",
    borderRadius: "14px",
    fontSize: "0.7rem",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "40px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s ease",
    background: "var(--text-primary)",
    color: "var(--bg-primary)",
  },
  buttonDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  switchButton: {
    background: "none",
    border: "none",
    color: "var(--info)",
    fontSize: "0.8rem",
    cursor: "pointer",
    padding: "8px",
    textDecoration: "underline",
    transition: "all 0.2s",
  },
  switchButtonHover: {
    opacity: 0.8,
  },
};

function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        if (data.user && onAuthSuccess) onAuthSuccess(data.session);
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName },
          },
        });
        if (error) throw error;

        if (data.user) {
          await ensureProfile(data.user);
          alert("✅ Registro exitoso! Ahora puedes iniciar sesión.");
          setIsLogin(true);
          setEmail("");
          setPassword("");
          setFullName("");
        }
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={authStyles.container}>
      <div style={authStyles.card}>
        <div style={authStyles.header}>
          <div style={authStyles.logoArea}>
            <img src="/logo.png" alt="MOAR" style={authStyles.logo} />
            <h1 style={authStyles.title}>MOAR</h1>
          </div>
          <p style={authStyles.subtitle}>Tu asistente financiero personal</p>
        </div>

        <div style={authStyles.tabs}>
          <button
            style={{
              ...authStyles.tab,
              ...(isLogin ? authStyles.tabActive : {}),
            }}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
            type="button"
          >
            Iniciar Sesión
          </button>
          <button
            style={{
              ...authStyles.tab,
              ...(!isLogin ? authStyles.tabActive : {}),
            }}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
            type="button"
          >
            Crear Cuenta
          </button>
        </div>

        <form onSubmit={handleSubmit} style={authStyles.form}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              style={authStyles.input}
              onFocus={(e) => (e.target.style.borderColor = "var(--info)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={authStyles.input}
            onFocus={(e) => (e.target.style.borderColor = "var(--info)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={authStyles.input}
            onFocus={(e) => (e.target.style.borderColor = "var(--info)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />

          {error && <div style={authStyles.error}>{error}</div>}

          <button
            type="submit"
            disabled={loading}
            style={{
              ...authStyles.button,
              ...(loading ? authStyles.buttonDisabled : {}),
            }}
          >
            {loading ? "Cargando..." : isLogin ? "Ingresar" : "Registrarse"}
          </button>

          <button
            type="button"
            style={authStyles.switchButton}
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.8")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;