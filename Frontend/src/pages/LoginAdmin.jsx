import { useState } from "react";
import { FaUserGraduate, FaShieldAlt, FaBookOpen, FaChartLine } from "react-icons/fa";
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
                radial-gradient(circle at top left, rgba(72, 187, 255, 0.28), transparent 28%),
                radial-gradient(circle at bottom right, rgba(34, 211, 238, 0.20), transparent 24%),
                linear-gradient(135deg, #07111f 0%, #0a1630 45%, #050816 100%);
              overflow: hidden;
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

            .auth-page::after {
              width: 420px;
              height: 420px;
              right: -160px;
              bottom: -140px;
              background: radial-gradient(circle, rgba(16, 185, 129, 0.26), transparent 68%);
            }

            .auth-shell {
              position: relative;
              z-index: 1;
              width: min(1100px, 100%);
              display: grid;
              grid-template-columns: 1.1fr 0.9fr;
              border: 1px solid rgba(255, 255, 255, 0.12);
              border-radius: 32px;
              background: rgba(8, 14, 29, 0.68);
              box-shadow: 0 30px 80px rgba(2, 8, 23, 0.55);
              overflow: hidden;
              backdrop-filter: blur(22px);
              -webkit-backdrop-filter: blur(22px);
            }

            .showcase {
              position: relative;
              padding: 44px;
              background:
                linear-gradient(160deg, rgba(14, 165, 233, 0.16), transparent 50%),
                linear-gradient(180deg, rgba(12, 18, 38, 0.95), rgba(7, 11, 24, 0.96));
              border-right: 1px solid rgba(255, 255, 255, 0.08);
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              min-height: 620px;
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

            .showcase h1 {
              margin: 26px 0 16px;
              font-family: 'Space Grotesk', sans-serif;
              font-size: clamp(2.8rem, 4vw, 4.8rem);
              line-height: 0.95;
              letter-spacing: -0.04em;
              max-width: 10ch;
            }

            .showcase p {
              margin: 0;
              max-width: 44ch;
              color: #a8b9d6;
              font-size: 1rem;
              line-height: 1.7;
            }

            .feature-list {
              display: grid;
              gap: 14px;
              margin: 34px 0;
            }

            .feature-item {
              display: flex;
              align-items: center;
              gap: 14px;
              padding: 14px 16px;
              border-radius: 18px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.06);
              color: #dbe7fb;
            }

            .feature-item span {
              display: grid;
              place-items: center;
              width: 36px;
              height: 36px;
              border-radius: 12px;
              background: linear-gradient(135deg, rgba(56, 189, 248, 0.22), rgba(34, 197, 94, 0.18));
              color: #7dd3fc;
              flex: 0 0 auto;
            }

            .feature-item strong {
              display: block;
              font-size: 0.98rem;
              margin-bottom: 2px;
            }

            .feature-item small {
              display: block;
              color: #9cb0cc;
              line-height: 1.5;
            }

            .stats-row {
              display: grid;
              grid-template-columns: repeat(3, minmax(0, 1fr));
              gap: 12px;
            }

            .stat-card {
              padding: 18px 16px;
              border-radius: 18px;
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.06);
            }

            .stat-card strong {
              display: block;
              font-size: 1.25rem;
              font-weight: 800;
              margin-bottom: 4px;
            }

            .stat-card span {
              color: #98acc9;
              font-size: 0.9rem;
            }

            .auth-panel {
              padding: 44px;
              background: linear-gradient(180deg, rgba(10, 17, 34, 0.92), rgba(6, 10, 22, 0.98));
              display: flex;
              align-items: center;
            }

            .login-form {
              width: 100%;
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
              margin: 0;
              font-family: 'Space Grotesk', sans-serif;
              font-size: clamp(2rem, 3vw, 2.6rem);
              letter-spacing: -0.03em;
            }

            .login-form .subtitle {
              margin: 12px 0 28px;
              color: #97a9c6;
              line-height: 1.65;
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

            .helper-row {
              display: flex;
              align-items: center;
              justify-content: space-between;
              gap: 16px;
              margin-top: 16px;
              color: #8d9db7;
              font-size: 0.93rem;
            }

            .helper-row a {
              color: #90cfff;
              text-decoration: none;
            }

            .helper-row a:hover {
              text-decoration: underline;
            }

            .credentials-note {
              margin-top: 22px;
              padding: 14px 16px;
              border-radius: 16px;
              background: rgba(255, 255, 255, 0.04);
              border: 1px solid rgba(255, 255, 255, 0.06);
              color: #91a3bf;
              line-height: 1.55;
              font-size: 0.92rem;
            }

            @media (max-width: 960px) {
              .auth-shell {
                grid-template-columns: 1fr;
              }

              .showcase {
                min-height: auto;
                border-right: none;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
              }

              .stats-row {
                grid-template-columns: 1fr;
              }
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
              .showcase,
              .auth-panel {
                border-radius: 24px;
              }

              .showcase,
              .auth-panel {
                padding: 24px;
              }

              .helper-row {
                flex-direction: column;
                align-items: flex-start;
              }
            }
          `,
        }}
      />

      <div className="auth-shell">
        <section className="showcase">
          <div>
            <div className="brand-badge">
              <FaShieldAlt /> SIET Learning Hub
            </div>
            <h1>Secure access for students and administrators.</h1>
            <p>
              Enter the portal with a cleaner, faster workflow designed for course management,
              assessments, and student progress tracking.
            </p>

            <div className="feature-list">
              <div className="feature-item">
                <span><FaBookOpen /></span>
                <div>
                  <strong>Course ready</strong>
                  <small>Quick access to lessons, tasks, and resources.</small>
                </div>
              </div>
              <div className="feature-item">
                <span><FaChartLine /></span>
                <div>
                  <strong>Progress focused</strong>
                  <small>Track performance with a more polished interface.</small>
                </div>
              </div>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <strong>24/7</strong>
              <span>Portal availability</span>
            </div>
            <div className="stat-card">
              <strong>2 roles</strong>
              <span>Student and admin access</span>
            </div>
            <div className="stat-card">
              <strong>Fast</strong>
              <span>Clean login experience</span>
            </div>
          </div>
        </section>

        <section className="auth-panel">
          <div className="login-form">
            <div className="panel-label">
              <FaShieldAlt /> Secure login
            </div>
            <h2>Welcome back</h2>
            <p className="subtitle">Sign in to continue to your dashboard and manage your learning workspace.</p>

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

            <div className="helper-row">
              <span>Use your portal credentials to continue.</span>
              <a href="#">Forgot password?</a>
            </div>

            <div className="credentials-note">
              Demo credentials: <strong>admin / admin123</strong> or <strong>user / user123</strong>.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LoginAdmin;