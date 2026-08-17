import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, CalendarDays, Trophy, Home } from 'lucide-react';

const navItems = [
  { to: '/dashboard/courses',        icon: BookOpen,     label: 'Courses' },
  { to: '/dashboard/upcomingevents', icon: CalendarDays, label: 'Upcoming Events' },
  { to: '/dashboard/leaderboard',    icon: Trophy,       label: 'Leaderboard' },
  { to: '/dashboard/siethome',       icon: Home,         label: 'Home' },
];

const SideNav = ({ isOpen }) => {
  return (
    <>
      <style>{`
        .sidenav {
          position: fixed;
          top: 60px;
          left: 0;
          height: calc(100vh - 60px);
          width: 240px;
          background: #111827;
          border-right: 1px solid rgba(255,255,255,0.07);
          display: flex;
          flex-direction: column;
          padding: 16px 10px;
          transform: translateX(${isOpen ? '0' : '-100%'});
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
          z-index: 90;
          overflow: hidden;
          box-shadow: 4px 0 24px rgba(0,0,0,0.25);
        }

        .sidenav-section-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #374151;
          padding: 0 10px;
          margin-bottom: 6px;
        }

        .sidenav-link {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: #64748b;
          font-size: 0.88rem;
          font-weight: 500;
          transition: background 0.18s, color 0.18s;
          margin-bottom: 2px;
          white-space: nowrap;
        }

        .sidenav-link:hover {
          background: rgba(255,255,255,0.05);
          color: #cbd5e1;
        }

        .sidenav-link.active {
          background: rgba(56,189,248,0.1);
          color: #38bdf8;
          font-weight: 600;
        }

        .sidenav-link.active .sidenav-icon {
          color: #38bdf8;
        }

        .sidenav-icon {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          color: #374151;
          transition: color 0.18s;
        }

        .sidenav-link:hover .sidenav-icon {
          color: #94a3b8;
        }

        .sidenav-active-bar {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #38bdf8, #6366f1);
          opacity: 0;
          transition: opacity 0.18s;
        }

        .sidenav-link.active .sidenav-active-bar {
          opacity: 1;
        }

        .sidenav-link-inner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
        }

        .sidenav-footer {
          margin-top: auto;
          padding: 12px 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .sidenav-footer-text {
          font-size: 0.72rem;
          color: #1f2937;
          text-align: center;
        }
      `}</style>

      <aside className="sidenav" aria-label="Sidebar navigation">
        <div className="sidenav-section-label">Navigation</div>

        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidenav-link${isActive ? ' active' : ''}`}
          >
            <div className="sidenav-active-bar" />
            <Icon className="sidenav-icon" />
            <span>{label}</span>
          </NavLink>
        ))}

        <div className="sidenav-footer">
          <p className="sidenav-footer-text">SIET LMS · Student Portal</p>
        </div>
      </aside>
    </>
  );
};

export default SideNav;
