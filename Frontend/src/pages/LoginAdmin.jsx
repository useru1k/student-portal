import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GraduationCap,
  User,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Sparkles,
  HelpCircle,
} from "lucide-react";

const LoginAdmin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const navigate = useNavigate();

  // Load saved username if rememberMe was previously set
  useEffect(() => {
    const savedUser = localStorage.getItem("saved_portal_user");
    if (savedUser) {
      setUsername(savedUser);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser || !cleanPass) {
      setError("Please enter both username and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // 1. Try authenticating with backend API
      let authSuccess = false;
      let userRole = null;
      let userData = null;

      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: cleanUser, password: cleanPass }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          authSuccess = true;
          userRole = data.role;
          userData = data.user;
          if (data.token) {
            localStorage.setItem("authToken", data.token);
          }
        } else {
          setError(data.message || "Invalid credentials. Please try again.");
          setLoading(false);
          return;
        }
      } catch (backendError) {
        // 2. Fallback to client-side credential verification if backend is offline
        console.warn("Backend unavailable, using local authentication fallback.", backendError);

        const clientCreds = {
          admin: { pass: "admin123", role: "admin", name: "Karthiban R", id: "ADM001" },
          user: { pass: "user123", role: "user", name: "Bharathi", id: "001" },
        };

        const foundUser = clientCreds[cleanUser.toLowerCase()];
        if (foundUser && foundUser.pass === cleanPass) {
          authSuccess = true;
          userRole = foundUser.role;
          userData = { username: cleanUser, role: foundUser.role, name: foundUser.name, id: foundUser.id };
          localStorage.setItem("authToken", `mock_jwt_${foundUser.role}_${Date.now()}`);
        } else {
          setError("Invalid credentials. Please verify your username and password.");
          setLoading(false);
          return;
        }
      }

      if (authSuccess && userRole) {
        // Handle remember me
        if (rememberMe) {
          localStorage.setItem("saved_portal_user", cleanUser);
        } else {
          localStorage.removeItem("saved_portal_user");
        }

        // Store user role and profile details
        localStorage.setItem("userRole", userRole);
        if (userData) {
          localStorage.setItem("portalUser", JSON.stringify(userData));
        }

        if (typeof onLogin === "function") {
          onLogin(userRole);
        }

        // Dynamic routing based on role
        if (userRole === "admin") {
          navigate("/adashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (err) {
      console.error("Login exception:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-stage">
      {/* ── Scoped Modern Styles ── */}
      <style>{`
        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .login-stage {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #060913;
          position: relative;
          overflow: hidden;
          padding: 24px 16px;
          font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          color: #e2e8f0;
        }

        /* ── Dynamic ambient grid background ── */
        .login-stage::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.05) 0%, transparent 70%),
            linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px);
          background-size: 100% 100%, 44px 44px, 44px 44px;
          pointer-events: none;
        }

        /* ── Floating ambient glowing orbs ── */
        .glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
          opacity: 0.45;
        }
        .glow-orb-1 {
          width: 550px;
          height: 550px;
          top: -180px;
          left: -120px;
          background: radial-gradient(circle, #38bdf8 0%, #2563eb 45%, transparent 70%);
          animation: orbFloat1 14s ease-in-out infinite alternate;
        }
        .glow-orb-2 {
          width: 480px;
          height: 480px;
          bottom: -150px;
          right: -100px;
          background: radial-gradient(circle, #6366f1 0%, #4f46e5 45%, transparent 70%);
          animation: orbFloat2 16s ease-in-out infinite alternate;
        }
        .glow-orb-3 {
          width: 320px;
          height: 320px;
          top: 40%;
          left: 55%;
          background: radial-gradient(circle, #0ea5e9 0%, transparent 65%);
          opacity: 0.2;
          animation: orbFloat3 18s ease-in-out infinite alternate;
        }

        @keyframes orbFloat1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(45px, 35px) scale(1.08); }
        }
        @keyframes orbFloat2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-40px, -30px) scale(1.1); }
        }
        @keyframes orbFloat3 {
          0% { transform: translate(0, 0) scale(0.9); }
          100% { transform: translate(-30px, 40px) scale(1.15); }
        }

        /* ── Modern Glassmorphism Card ── */
        .login-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 440px;
          background: rgba(15, 23, 42, 0.78);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-top: 1px solid rgba(56, 189, 248, 0.35);
          border-radius: 24px;
          padding: 44px 38px 36px;
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow:
            0 20px 60px -15px rgba(0, 0, 0, 0.7),
            0 0 40px -10px rgba(56, 189, 248, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          animation: cardEntrance 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(24px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* ── Header Branding ── */
        .brand-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }

        .brand-badge-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0284c7, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.3);
          flex-shrink: 0;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .brand-details {
          display: flex;
          flex-direction: column;
        }

        .brand-title {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #f8fafc;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .brand-title span {
          color: #38bdf8;
        }

        .brand-subtitle {
          font-size: 0.74rem;
          color: #94a3b8;
          font-weight: 500;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        /* ── Welcome Heading ── */
        .welcome-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.65rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.03em;
          margin-bottom: 6px;
        }

        .welcome-desc {
          font-size: 0.86rem;
          color: #94a3b8;
          margin-bottom: 28px;
          line-height: 1.4;
        }

        /* ── Form Inputs ── */
        .form-group {
          margin-bottom: 18px;
        }

        .form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: #cbd5e1;
          margin-bottom: 8px;
          letter-spacing: 0.02em;
        }

        .input-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-lead-icon {
          position: absolute;
          left: 16px;
          color: #64748b;
          pointer-events: none;
          transition: color 0.2s;
        }

        .form-input {
          width: 100%;
          height: 50px;
          background: rgba(30, 41, 59, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 13px;
          color: #f1f5f9;
          font-size: 0.94rem;
          font-family: inherit;
          padding: 0 46px 0 46px;
          outline: none;
          transition: all 0.22s ease;
        }

        .form-input::placeholder {
          color: #475569;
        }

        .form-input:focus {
          border-color: #38bdf8;
          background: rgba(30, 41, 59, 0.85);
          box-shadow:
            0 0 0 3px rgba(56, 189, 248, 0.15),
            0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .form-input:focus + .input-lead-icon,
        .input-container:focus-within .input-lead-icon {
          color: #38bdf8;
        }

        .toggle-pw-btn {
          position: absolute;
          right: 12px;
          background: transparent;
          border: none;
          color: #64748b;
          padding: 6px;
          cursor: pointer;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.18s, background 0.18s;
        }

        .toggle-pw-btn:hover {
          color: #cbd5e1;
          background: rgba(255, 255, 255, 0.06);
        }

        /* ── Remember Me & Help Row ── */
        .form-options {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 22px;
          font-size: 0.82rem;
        }

        .remember-label {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #94a3b8;
          cursor: pointer;
          user-select: none;
        }

        .remember-checkbox {
          appearance: none;
          -webkit-appearance: none;
          width: 17px;
          height: 17px;
          border: 1.5px solid rgba(255, 255, 255, 0.18);
          border-radius: 5px;
          background: rgba(30, 41, 59, 0.6);
          cursor: pointer;
          display: grid;
          place-content: center;
          transition: all 0.18s ease;
        }

        .remember-checkbox:checked {
          background: #0284c7;
          border-color: #38bdf8;
        }

        .remember-checkbox:checked::before {
          content: '✓';
          color: #ffffff;
          font-size: 11px;
          font-weight: 800;
        }

        .help-link {
          background: none;
          border: none;
          color: #38bdf8;
          font-size: 0.82rem;
          font-weight: 500;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.18s, text-decoration 0.18s;
          font-family: inherit;
        }

        .help-link:hover {
          color: #7dd3fc;
          text-decoration: underline;
        }

        /* ── Error Banner ── */
        .error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: rgba(239, 68, 68, 0.1);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
          font-size: 0.83rem;
          margin-bottom: 20px;
          animation: shake 0.35s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
        }

        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-3px, 0, 0); }
          40%, 60% { transform: translate3d(3px, 0, 0); }
        }

        /* ── Submit Button ── */
        .submit-btn {
          width: 100%;
          height: 50px;
          border: none;
          border-radius: 13px;
          background: linear-gradient(135deg, #0284c7 0%, #2563eb 50%, #4f46e5 100%);
          color: #ffffff;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 700;
          letter-spacing: 0.02em;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          box-shadow:
            0 10px 25px -5px rgba(2, 132, 199, 0.45),
            0 4px 12px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: 0.5s;
        }

        .submit-btn:hover:not(:disabled)::after {
          left: 100%;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 14px 30px -4px rgba(2, 132, 199, 0.55),
            0 6px 16px rgba(0, 0, 0, 0.4);
          filter: brightness(1.08);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        /* ── Spinner ── */
        .btn-spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.65s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* ── Card Footer Info ── */
        .card-footer {
          margin-top: 26px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.74rem;
          color: #64748b;
          text-align: center;
        }

        .card-footer span {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }

        /* ── Help Modal ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(8px);
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        .modal-content {
          background: #111827;
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 28px;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }

        .modal-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #f8fafc;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .modal-body {
          font-size: 0.85rem;
          color: #94a3b8;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .modal-btn {
          width: 100%;
          height: 40px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          color: #f8fafc;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s;
        }

        .modal-btn:hover {
          background: rgba(255, 255, 255, 0.14);
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        /* ── Responsive ── */
        @media (max-width: 480px) {
          .login-card {
            padding: 32px 22px 28px;
            border-radius: 20px;
          }
          .welcome-title {
            font-size: 1.45rem;
          }
        }
      `}</style>

      {/* Ambient background glow orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />
      <div className="glow-orb glow-orb-3" />

      {/* ── Main Unified Login Card ── */}
      <div className="login-card">
        {/* Brand Header */}
        <div className="brand-header">
          <div className="brand-badge-icon">
            <GraduationCap size={24} />
          </div>
          <div className="brand-details">
            <h2 className="brand-title">
              SIET <span>Portal</span>
            </h2>
            <span className="brand-subtitle">Academic Management System</span>
          </div>
        </div>

        {/* Welcome Section */}
        <h1 className="welcome-title">Welcome Back</h1>
        <p className="welcome-desc">
          Sign in with your credentials to access your personalized dashboard.
        </p>

        {/* Error Notification */}
        {error && (
          <div className="error-banner" role="alert">
            <AlertCircle size={17} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Unified Login Form */}
        <form onSubmit={handleLogin} noValidate>
          {/* Username / ID field */}
          <div className="form-group">
            <label className="form-label" htmlFor="portal-username">
              Username or ID
            </label>
            <div className="input-container">
              <User size={18} className="input-lead-icon" />
              <input
                id="portal-username"
                type="text"
                className="form-input"
                placeholder="e.g. your username or ID"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (error) setError("");
                }}
                required
                autoComplete="username"
                autoFocus
                spellCheck="false"
              />
            </div>
          </div>

          {/* Password field */}
          <div className="form-group">
            <label className="form-label" htmlFor="portal-password">
              Password
            </label>
            <div className="input-container">
              <Lock size={18} className="input-lead-icon" />
              <input
                id="portal-password"
                type={showPw ? "text" : "password"}
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                className="toggle-pw-btn"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me & Help link */}
          <div className="form-options">
            <label className="remember-label">
              <input
                type="checkbox"
                className="remember-checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="help-link"
              onClick={() => setShowHelpModal(true)}
            >
              <HelpCircle size={14} />
              Need Help?
            </button>
          </div>

          {/* Submit Action */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="btn-spinner" />
                <span>Verifying credentials…</span>
              </>
            ) : (
              <>
                <span>Sign In to Portal</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Security & System Info Footer */}
        <div className="card-footer">
          <span>
            <ShieldCheck size={14} color="#38bdf8" />
            256-bit Encrypted Access • SIET Academic Network
          </span>
        </div>
      </div>

      {/* Help Modal */}
      {showHelpModal && (
        <div className="modal-overlay" onClick={() => setShowHelpModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title">
              <Sparkles size={18} color="#38bdf8" />
              Portal Access Assistance
            </div>
            <div className="modal-body">
              <p>
                Please enter your registered college credentials. The system automatically
                verifies your identity and routes you to your authorized portal.
              </p>
              <br />
              <p>
                If you have forgotten your password or require access recovery, please contact
                the SIET IT Support Desk or your departmental administrator.
              </p>
            </div>
            <button
              type="button"
              className="modal-btn"
              onClick={() => setShowHelpModal(false)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginAdmin;
