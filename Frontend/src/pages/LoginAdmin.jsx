import { useState } from "react";
import { FaUserGraduate, FaShieldAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LoginAdmin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const isValidUser = await authenticateUser(username, password);

    if (isValidUser) {
      onLogin(isValidUser.role);
      navigate(isValidUser.role === "admin" ? "/adashboard" : "/dashboard");
    } else {
      setErrorMessage("Invalid username or password");
    }
  };

  const authenticateUser = async (enteredUsername, enteredPassword) => {
    const validCredentials = {
      admin: "admin123",
      user: "user123",
    };

    if (validCredentials[enteredUsername] === enteredPassword) {
      return { role: enteredUsername };
    }
    return null;
  };

  return (
    <div className="auth-page">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;700&display=swap');

            :root {
              color-scheme: dark;
            }

            * {
              box-sizing: border-box;
            }

            html, body, #root {
              width: 100%;
              min-height: 100%;
              margin: 0;
            }

            body {
              font-family: 'Inter', sans-serif;
              background:
                radial-gradient(circle at top, rgba(56, 189, 248, 0.18), transparent 30%),
                linear-gradient(135deg, #07111f 0%, #050816 100%);
              overflow: auto;
            }

            .auth-page {
              position: relative;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 24px;
              overflow: hidden;
              color: #e5eefc;
            }

            .auth-page::before,
            .auth-page::after {
              content: '';
              position: absolute;
              inset: auto;
              border-radius: 999px;
              filter: blur(8px);
              opacity: 0.65;
              pointer-events: none;
            }

            .auth-page::before {
              width: 340px;
              height: 340px;
              top: -90px;
              left: -120px;
              background: radial-gradient(circle, rgba(59, 130, 246, 0.36), transparent 68%);
            }

            .auth-shell {
              position: relative;
              z-index: 1;
              width: min(460px, 100%);
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 32px;
              background: rgba(8, 14, 29, 0.82);
              box-shadow: 0 30px 80px rgba(2, 8, 23, 0.55);
              overflow: hidden;
              backdrop-filter: blur(22px);
              -webkit-backdrop-filter: blur(22px);
            }

            .auth-panel {
              padding: 40px 36px 34px;
              background: linear-gradient(180deg, rgba(10, 17, 34, 0.92), rgba(6, 10, 22, 0.98));
            }

            .brand-badge {
              width: fit-content;
              display: inline-flex;
              align-items: center;
              gap: 10px;
              padding: 10px 14px;
              border-radius: 999px;
              background: rgba(255, 255, 255, 0.06);
              color: #cfe5ff;
              border: 1px solid rgba(255, 255, 255, 0.08);
              font-size: 0.92rem;
              letter-spacing: 0.02em;
            }

            .brand-badge svg {
              color: #74d3ff;
            }

            .login-form {
              width: 100%;
            }

            .login-form h2 {
              margin: 18px 0 10px;
              font-family: 'Space Grotesk', sans-serif;
              font-size: clamp(2rem, 3vw, 2.35rem);
              letter-spacing: -0.03em;
            }

            .login-form .subtitle {
              margin: 0 0 24px;
              color: #97a9c6;
              line-height: 1.65;
            }

            .panel-label {
              display: inline-flex;
              align-items: center;
              gap: 8px;
              padding: 8px 12px;
              border-radius: 999px;
              background: rgba(59, 130, 246, 0.12);
              color: #8fd0ff;
              border: 1px solid rgba(125, 211, 252, 0.18);
              font-size: 0.9rem;
              margin-bottom: 18px;
            }

            .login-form h2 {
              margin: 18px 0 10px;
              font-family: 'Space Grotesk', sans-serif;
              font-size: clamp(2rem, 3vw, 2.35rem);
              letter-spacing: -0.03em;
            }

            .field {
              position: relative;
              margin-bottom: 16px;
            }

            .field input {
              width: 100%;
              height: 58px;
              padding: 0 50px 0 18px;
              border-radius: 18px;
              border: 1px solid rgba(148, 163, 184, 0.2);
              background: rgba(255, 255, 255, 0.04);
              color: #f3f7ff;
              font-size: 1rem;
              outline: none;
              transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
            }

            .field input::placeholder {
              color: #7f8da8;
            }

            .field input:focus {
              border-color: rgba(96, 165, 250, 0.75);
              box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.16);
              transform: translateY(-1px);
            }

            .field svg {
              position: absolute;
              right: 18px;
              top: 50%;
              transform: translateY(-50%);
              color: #7a8aa8;
              pointer-events: none;
            }

            .error-message {
              margin: 10px 0 16px;
              padding: 12px 14px;
              border-radius: 14px;
              background: rgba(248, 113, 113, 0.12);
              border: 1px solid rgba(248, 113, 113, 0.22);
              color: #ffb4b4;
              font-size: 0.95rem;
            }

            .login-button {
              width: 100%;
              min-height: 58px;
              border: none;
              border-radius: 18px;
              background: linear-gradient(135deg, #38bdf8 0%, #2563eb 100%);
              color: white;
              font-size: 1rem;
              font-weight: 700;
              letter-spacing: 0.01em;
              cursor: pointer;
              box-shadow: 0 18px 35px rgba(37, 99, 235, 0.28);
              transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;
            }

            .login-button:hover {
              transform: translateY(-1px);
              box-shadow: 0 22px 40px rgba(37, 99, 235, 0.34);
              filter: brightness(1.03);
            }

            .login-button:active {
              transform: translateY(0);
            }

            @media (max-width: 640px) {
              body {
                overflow: auto;
              }

              .auth-page {
                padding: 12px;
                align-items: stretch;
              }

              .auth-shell,
              .auth-panel {
                border-radius: 24px;
              }

              .auth-panel {
                padding: 24px;
              }
            }
          `,
        }}
      />

      <div className="auth-shell">
        <section className="auth-panel">
          <div className="login-form">
            <div className="panel-label">
              <FaShieldAlt /> SIET LMS
            </div>
            <h2>Login</h2>
            <p className="subtitle">Sign in to continue.</p>

            <form onSubmit={handleLogin}>
              <div className="field">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <FaUserGraduate />
              </div>

              <div className="field">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <RiLockPasswordFill />
              </div>

              {errorMessage && <div className="error-message">{errorMessage}</div>}

              <button type="submit" className="login-button">
                Login to Portal
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginAdmin;