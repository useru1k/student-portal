import React from 'react';
import { NavLink } from 'react-router-dom';
import { BookOpen, CalendarDays, Trophy, Monitor } from 'lucide-react';

const navItems = [
  { to: '/adashboard/acourses',       icon: BookOpen,     label: 'Course Management' },
  { to: '/adashboard/aupcomingevents',icon: CalendarDays, label: 'Upcoming Events' },
  { to: '/adashboard/aleaderboard',   icon: Trophy,       label: 'Leaderboard' },
  { to: '/adashboard/resourcemonitor',icon: Monitor,      label: 'Resource Monitor' },
];

const A_SideNav = ({ isOpen }) => {
  return (
    <>
      <style>{`
        .sidenav-admin {
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

        .sidenav-admin-section-label {
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #374151;
          padding: 0 10px;
          margin-bottom: 6px;
        }

        .sidenav-admin-link {
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
          position: relative;
        }

        .sidenav-admin-link:hover {
          background: rgba(255,255,255,0.05);
          color: #cbd5e1;
        }

        .sidenav-admin-link.active {
          background: rgba(245,158,11,0.1);
          color: #fbbf24;
          font-weight: 600;
        }

        .sidenav-admin-link.active .sidenav-admin-icon {
          color: #fbbf24;
        }

        .sidenav-admin-icon {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          color: #374151;
          transition: color 0.18s;
        }

        .sidenav-admin-link:hover .sidenav-admin-icon {
          color: #94a3b8;
        }

        .sidenav-admin-active-bar {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 20px;
          border-radius: 0 3px 3px 0;
          background: linear-gradient(180deg, #f59e0b, #ef4444);
          opacity: 0;
          transition: opacity 0.18s;
        }

        .sidenav-admin-link.active .sidenav-admin-active-bar {
          opacity: 1;
        }

        .sidenav-admin-footer {
          margin-top: auto;
          padding: 12px 10px;
          border-top: 1px solid rgba(255,255,255,0.06);
        }

        .sidenav-admin-footer-text {
          font-size: 0.72rem;
          color: #1f2937;
          text-align: center;
        }

        .sidenav-admin-badge {
          margin-left: auto;
          padding: 2px 7px;
          border-radius: 5px;
          background: rgba(245,158,11,0.12);
          border: 1px solid rgba(245,158,11,0.18);
          color: #fbbf24;
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
      `}</style>

      <aside className="sidenav-admin" aria-label="Admin sidebar navigation">
        <div className="sidenav-admin-section-label">Admin Panel</div>

        {navItems.map(({ to, icon: Icon, label, badge }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) => `sidenav-admin-link${isActive ? ' active' : ''}`}
          >
            <div className="sidenav-admin-active-bar" />
            <Icon className="sidenav-admin-icon" />
            <span>{label}</span>
            {badge && <span className="sidenav-admin-badge">{badge}</span>}
          </NavLink>
        ))}

        <div className="sidenav-admin-footer">
          <p className="sidenav-admin-footer-text">SIET LMS · Admin Portal</p>
        </div>
      </aside>
    </>
  );
};

export default A_SideNav;
