import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginAdmin = ({ onLogin }) => {
  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [showPw, setShowPw]         = useState(false);
  const [role, setRole]             = useState("user");   // 'user' | 'admin'
  const [error, setError]           = useState("");
  const [loading, setLoading]       = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 650));

    const creds = { admin: "admin123", user: "user123" };
    if (creds[username] === password) {
      onLogin(username);
      navigate(username === "admin" ? "/adashboard" : "/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="cp-root">
      {/* ── all styles scoped inside this component ── */}
      <style>{`
        /* ---------- reset ---------- */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html, body, #root {
          height: 100%;
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* ---------- full-screen dark stage ---------- */
        .cp-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #04080f;
          position: relative;
          overflow: hidden;
        }

        /* ── grid overlay ── */
        .cp-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(0,200,255,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,200,255,0.035) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        /* ── ambient glow blobs ── */
        .cp-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: 0.55;
        }
        .cp-blob-1 {
          width: 520px; height: 520px;
          top: -160px; left: -160px;
          background: radial-gradient(circle, #0047ff 0%, transparent 65%);
          animation: blobDrift 9s ease-in-out infinite alternate;
        }
        .cp-blob-2 {
          width: 400px; height: 400px;
          bottom: -120px; right: -100px;
          background: radial-gradient(circle, #00c8ff 0%, transparent 65%);
          animation: blobDrift 12s ease-in-out infinite alternate-reverse;
        }

        @keyframes blobDrift {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(30px, 20px) scale(1.06); }
        }

        /* ---------- card ---------- */
        .cp-card {
          position: relative;
          z-index: 2;
          width: min(420px, 92vw);
          background: rgba(4,12,26,0.82);
          border: 1px solid rgba(0,180,255,0.18);
          border-radius: 20px;
          padding: 44px 40px 36px;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          box-shadow:
            0 0 0 1px rgba(0,180,255,0.06),
            0 8px 40px rgba(0,0,0,0.6),
            0 0 80px rgba(0,100,255,0.08);
          animation: cardIn 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }

        /* top accent line */
        .cp-card::before {
          content: '';
          position: absolute;
          top: 0; left: 20%; right: 20%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00c8ff, #0047ff, transparent);
          border-radius: 999px;
        }

        /* ---------- logo row ---------- */
        .cp-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
        }

        .cp-logo-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: linear-gradient(135deg, #0047ff, #00c8ff);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          box-shadow: 0 0 20px rgba(0,150,255,0.4), 0 4px 12px rgba(0,0,0,0.4);
          flex-shrink: 0;
        }

        .cp-logo-text {
          display: flex;
          flex-direction: column;
          line-height: 1.15;
        }

        .cp-logo-name {
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #e8f4ff;
        }

        .cp-logo-sub {
          font-size: 0.7rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #00c8ff;
          font-weight: 600;
        }

        /* ---------- heading ---------- */
        .cp-heading {
          font-size: 1.7rem;
          font-weight: 800;
          color: #f0f8ff;
          letter-spacing: -0.03em;
          margin-bottom: 6px;
          line-height: 1.1;
        }

        .cp-heading span {
          background: linear-gradient(90deg, #00c8ff, #0047ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .cp-tagline {
          font-size: 0.82rem;
          color: #3a5070;
          margin-bottom: 28px;
          letter-spacing: 0.02em;
        }

        /* ---------- role pills ---------- */
        .cp-roles {
          display: flex;
          gap: 8px;
          margin-bottom: 24px;
        }

        .cp-role {
          flex: 1;
          padding: 8px 0;
          border-radius: 10px;
          border: 1px solid rgba(0,180,255,0.12);
          background: rgba(0,100,255,0.05);
          color: #2a4060;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .cp-role:hover {
          border-color: rgba(0,180,255,0.25);
          color: #5aa8d8;
        }

        .cp-role.active {
          background: linear-gradient(135deg, rgba(0,71,255,0.2), rgba(0,200,255,0.12));
          border-color: rgba(0,180,255,0.45);
          color: #00c8ff;
          box-shadow: 0 0 16px rgba(0,150,255,0.15);
        }

        /* ---------- inputs ---------- */
        .cp-field {
          position: relative;
          margin-bottom: 14px;
        }

        .cp-field input {
          width: 100%;
          height: 52px;
          background: rgba(0,20,50,0.6);
          border: 1px solid rgba(0,150,255,0.15);
          border-radius: 12px;
          color: #c8e8ff;
          font-size: 0.95rem;
          padding: 0 44px 0 16px;
          outline: none;
          font-family: 'Inter', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }

        .cp-field input::placeholder {
          color: #1e3550;
        }

        .cp-field input:focus {
          border-color: rgba(0,200,255,0.5);
          background: rgba(0,30,70,0.7);
          box-shadow:
            0 0 0 3px rgba(0,180,255,0.08),
            0 0 20px rgba(0,150,255,0.1);
        }

        .cp-field-icon {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #1e3550;
          cursor: pointer;
          font-size: 14px;
          transition: color 0.18s;
          padding: 4px;
        }

        .cp-field:focus-within .cp-field-icon {
          color: #2a5888;
        }

        /* ---------- error ---------- */
        .cp-error {
          padding: 11px 14px;
          border-radius: 10px;
          background: rgba(255,50,80,0.08);
          border: 1px solid rgba(255,50,80,0.2);
          color: #ff6688;
          font-size: 0.83rem;
          margin-bottom: 14px;
          animation: shake 0.32s ease;
        }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          25%      { transform: translateX(-5px); }
          75%      { transform: translateX(5px); }
        }

        /* ---------- submit ---------- */
        .cp-btn {
          width: 100%;
          height: 52px;
          border: none;
          border-radius: 12px;
          background: linear-gradient(135deg, #0047ff 0%, #00c8ff 100%);
          color: #fff;
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          margin-top: 4px;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          box-shadow:
            0 0 28px rgba(0,150,255,0.3),
            0 4px 16px rgba(0,0,0,0.4);
          transition: transform 0.18s, box-shadow 0.18s, filter 0.18s;
          position: relative;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }

        /* scan-line shimmer on hover */
        .cp-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(110deg, transparent 35%, rgba(255,255,255,0.12) 50%, transparent 65%);
          transform: translateX(-100%);
          transition: transform 0.45s ease;
        }

        .cp-btn:hover::after { transform: translateX(100%); }

        .cp-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 0 40px rgba(0,180,255,0.4), 0 8px 24px rgba(0,0,0,0.5);
          filter: brightness(1.08);
        }

        .cp-btn:active:not(:disabled) { transform: translateY(0); }
        .cp-btn:disabled { opacity: 0.55; cursor: not-allowed; }

        /* ---------- spinner ---------- */
        .cp-spinner {
          width: 17px; height: 17px;
          border: 2.5px solid rgba(255,255,255,0.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ---------- footer hint ---------- */
        .cp-hint {
          text-align: center;
          margin-top: 20px;
          font-size: 0.75rem;
          color: #152033;
          letter-spacing: 0.03em;
        }
        .cp-hint strong { color: #1e3a55; }

        /* ---------- scanline overlay ---------- */
        .cp-scanlines {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0,0,0,0.04) 2px,
            rgba(0,0,0,0.04) 4px
          );
        }

        /* ---------- responsive ---------- */
        @media (max-width: 480px) {
          .cp-card { padding: 34px 22px 28px; }
          .cp-heading { font-size: 1.4rem; }
        }
      `}</style>

      {/* ambient blobs */}
      <div className="cp-blob cp-blob-1" />
      <div className="cp-blob cp-blob-2" />

      {/* CRT scanlines */}
      <div className="cp-scanlines" />

      {/* ── card ── */}
      <div className="cp-card">

        {/* logo */}
        <div className="cp-logo">
          <div className="cp-logo-icon">🎓</div>
          <div className="cp-logo-text">
            <span className="cp-logo-name">SIET LMS</span>
            <span className="cp-logo-sub">Learning Portal</span>
          </div>
        </div>

        {/* heading */}
        <h1 className="cp-heading">
          Access <span>Portal</span>
        </h1>
        <p className="cp-tagline">Enter your credentials to continue</p>

        {/* role toggle */}
        <div className="cp-roles">
          <button
            type="button"
            className={`cp-role${role === "user" ? " active" : ""}`}
            onClick={() => { setRole("user"); setError(""); }}
          >
            Student
          </button>
          <button
            type="button"
            className={`cp-role${role === "admin" ? " active" : ""}`}
            onClick={() => { setRole("admin"); setError(""); }}
          >
            Admin
          </button>
        </div>

        {/* form */}
        <form onSubmit={handleLogin} noValidate>
          <div className="cp-field">
            <input
              type="text"
              placeholder={role === "admin" ? "Username — admin" : "Username — user"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              spellCheck="false"
            />
          </div>

          <div className="cp-field">
            <input
              type={showPw ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <span
              className="cp-field-icon"
              onClick={() => setShowPw((v) => !v)}
              title={showPw ? "Hide" : "Show"}
            >
              {showPw ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {error && <div className="cp-error">⚠ {error}</div>}

          <button type="submit" className="cp-btn" disabled={loading}>
            {loading
              ? <><div className="cp-spinner" /> Authenticating…</>
              : "Sign In"}
          </button>
        </form>

        <p className="cp-hint">
          Demo — Student: <strong>user / user123</strong>&nbsp;&nbsp;Admin: <strong>admin / admin123</strong>
        </p>
      </div>
    </div>
  );
};

export default LoginAdmin;
