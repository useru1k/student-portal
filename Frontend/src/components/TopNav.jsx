import React, { useState, useRef, useEffect } from 'react';
import { AlignLeft, X, ChevronDown, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TopNav = ({ isSideNavOpen, toggleSideNav, studentName = 'Bharathi', studentID = '001' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('portalUser');
    navigate('/');
  };

  // Generate initials from name
  const initials = studentName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <nav className="topnav-bar">
      <style>{`
        .topnav-bar {
          position: fixed;
          top: 0; left: 0;
          width: 100%;
          height: 60px;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          background: #111827;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 2px 12px rgba(0,0,0,0.35);
        }

        .topnav-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .topnav-toggle {
          width: 36px; height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.05);
          color: #94a3b8;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.18s, color 0.18s;
          flex-shrink: 0;
        }
        .topnav-toggle:hover { background: rgba(255,255,255,0.1); color: #f0f6ff; }

        .topnav-brand {
          display: flex;
          align-items: center;
          gap: 9px;
          text-decoration: none;
        }

        .topnav-brand-icon {
          width: 30px; height: 30px;
          border-radius: 9px;
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
          box-shadow: 0 4px 12px rgba(56,189,248,0.25);
        }

        .topnav-brand-text {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #f0f6ff;
          letter-spacing: -0.02em;
        }

        .topnav-divider {
          width: 1px; height: 22px;
          background: rgba(255,255,255,0.1);
          margin: 0 4px;
        }

        .topnav-welcome {
          font-size: 0.88rem;
          color: #64748b;
          white-space: nowrap;
        }
        .topnav-welcome strong { color: #94a3b8; font-weight: 600; }

        /* Right side */
        .topnav-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .topnav-user-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px 5px 5px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.04);
          cursor: pointer;
          transition: background 0.18s, border-color 0.18s;
        }
        .topnav-user-btn:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.16);
        }

        .topnav-avatar {
          width: 30px; height: 30px;
          border-radius: 50%;
          background: linear-gradient(135deg, #38bdf8, #6366f1);
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }

        .topnav-user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          line-height: 1.2;
        }
        .topnav-user-name {
          font-size: 0.82rem;
          font-weight: 600;
          color: #e2e8f0;
          max-width: 110px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .topnav-user-id {
          font-size: 0.72rem;
          color: #4a5c78;
        }

        .topnav-chevron {
          color: #4a5c78;
          transition: transform 0.2s;
        }
        .topnav-chevron.open { transform: rotate(180deg); }

        /* Dropdown */
        .topnav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          min-width: 190px;
          background: #1e2535;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.45);
          overflow: hidden;
          animation: ddFadeIn 0.15s ease;
          z-index: 200;
        }

        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .topnav-dropdown-header {
          padding: 14px 16px 10px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .topnav-dropdown-name {
          font-size: 0.88rem;
          font-weight: 600;
          color: #e2e8f0;
        }
        .topnav-dropdown-id {
          font-size: 0.78rem;
          color: #4a5c78;
          margin-top: 2px;
        }

        .topnav-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          color: #94a3b8;
          font-size: 0.88rem;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          cursor: pointer;
          background: transparent;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'Inter', sans-serif;
        }
        .topnav-dropdown-item:hover { background: rgba(255,255,255,0.06); color: #e2e8f0; }
        .topnav-dropdown-item.danger { color: #f87171; }
        .topnav-dropdown-item.danger:hover { background: rgba(248,113,113,0.08); color: #fca5a5; }

        .topnav-dropdown-sep {
          height: 1px;
          background: rgba(255,255,255,0.07);
          margin: 2px 0;
        }

        /* Wrapper needed for relative positioning of dropdown */
        .topnav-user-wrap { position: relative; }

        @media (max-width: 500px) {
          .topnav-welcome { display: none; }
          .topnav-divider { display: none; }
          .topnav-user-name { max-width: 70px; }
        }
      `}</style>

      {/* Left */}
      <div className="topnav-left">
        <button className="topnav-toggle" onClick={toggleSideNav} aria-label="Toggle sidebar">
          {isSideNavOpen ? <X size={18} /> : <AlignLeft size={18} />}
        </button>

        <a href="/dashboard" className="topnav-brand">
          <div className="topnav-brand-icon">🎓</div>
          <span className="topnav-brand-text">SIET LMS</span>
        </a>

        <div className="topnav-divider" />
        <span className="topnav-welcome">
          Welcome back, <strong>{studentName}</strong>
        </span>
      </div>

      {/* Right */}
      <div className="topnav-right">
        <div className="topnav-user-wrap" ref={dropdownRef}>
          <button
            className="topnav-user-btn"
            onClick={() => setIsDropdownOpen((v) => !v)}
            aria-expanded={isDropdownOpen}
            aria-haspopup="true"
          >
            <div className="topnav-avatar">{initials}</div>
            <div className="topnav-user-info">
              <span className="topnav-user-name">{studentName}</span>
              <span className="topnav-user-id">ID {studentID}</span>
            </div>
            <ChevronDown size={14} className={`topnav-chevron ${isDropdownOpen ? 'open' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="topnav-dropdown" role="menu">
              <div className="topnav-dropdown-header">
                <div className="topnav-dropdown-name">{studentName}</div>
                <div className="topnav-dropdown-id">Student ID: {studentID}</div>
              </div>
              <a
                href="/dashboard/profile"
                className="topnav-dropdown-item"
                onClick={() => setIsDropdownOpen(false)}
              >
                <User size={15} /> Profile
              </a>
              <div className="topnav-dropdown-sep" />
              <button className="topnav-dropdown-item danger" onClick={handleLogout}>
                <LogOut size={15} /> Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;
