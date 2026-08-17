import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import A_TopNav from '../components/A_TopNav';
import A_SideNav from '../components/A_SideNav';
import A_Courses from './A_Courses';
import A_UpcomingEvents from './A_UpcomingEvents';
import A_Profile from './A_Profile';
import A_TestAttempt from './A_TestAttempt';
import A_Modules from './A_Modules';
import A_Leaderboard from './LeaderBoard';
import A_Resource from './A_Resource';

const A_Dashboard = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(true);
  const location = useLocation();

  const [threshold, setThreshold] = useState(70);
  const [cpuUsage, setCpuUsage]     = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [latestAlert, setLatestAlert] = useState('Loading…');

  useEffect(() => {
    const interval = setInterval(() => {
      const cpu = Math.floor(Math.random() * 100);
      const mem = Math.floor(Math.random() * 100);
      setCpuUsage(cpu);
      setMemoryUsage(mem);
      setLatestAlert(
        cpu > threshold || mem > threshold
          ? `High usage detected! CPU: ${cpu}%, Memory: ${mem}%`
          : 'No alerts'
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [threshold]);

  const toggleSideNav = () => setSideNavOpen((v) => !v);

  return (
    <>
      <style>{`
        .adashboard-shell {
          min-height: 100vh;
          background: #0d1117;
          font-family: 'Inter', sans-serif;
        }

        .adashboard-body {
          display: flex;
          padding-top: 60px;
          min-height: 100vh;
        }

        .adashboard-main {
          flex: 1;
          min-width: 0;
          padding: 28px 28px 40px;
          transition: margin-left 0.28s cubic-bezier(0.4,0,0.2,1);
          margin-left: 0;
        }

        .adashboard-main.sidebar-open {
          margin-left: 240px;
        }

        .adashboard-page {
          background: #161b27;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          min-height: calc(100vh - 60px - 68px);
          padding: 28px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.25);
        }

        .adashboard-page .bg-white {
          background: transparent !important;
        }

        .adashboard-page h2 {
          color: #f0f6ff;
        }

        /* Alert banner */
        .adashboard-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 16px;
          border-radius: 10px;
          margin-bottom: 20px;
          font-size: 0.85rem;
          font-weight: 500;
          transition: background 0.3s, border-color 0.3s;
        }

        .adashboard-alert.alert-warn {
          background: rgba(245,158,11,0.1);
          border: 1px solid rgba(245,158,11,0.2);
          color: #fbbf24;
        }

        .adashboard-alert.alert-ok {
          background: rgba(52,211,153,0.08);
          border: 1px solid rgba(52,211,153,0.15);
          color: #6ee7b7;
        }

        /* Stat pills row */
        .adashboard-stats {
          display: flex;
          gap: 12px;
          margin-bottom: 22px;
          flex-wrap: wrap;
        }

        .adashboard-stat {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 0.82rem;
          color: #94a3b8;
        }

        .adashboard-stat-val {
          font-weight: 700;
          font-size: 0.9rem;
          color: #e2e8f0;
        }

        .adashboard-stat-val.warn { color: #fbbf24; }
        .adashboard-stat-val.ok   { color: #6ee7b7; }

        /* Mobile overlay */
        .sidenav-overlay-admin {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 80;
          backdrop-filter: blur(2px);
        }

        @media (max-width: 768px) {
          .sidenav-overlay-admin.visible { display: block; }
          .adashboard-main.sidebar-open  { margin-left: 0; }
          .adashboard-main  { padding: 16px 14px 32px; }
          .adashboard-page  { padding: 18px; border-radius: 12px; }
          .adashboard-stats { gap: 8px; }
        }
      `}</style>

      <div className="adashboard-shell">
        <A_TopNav
          isSideNavOpen={isSideNavOpen}
          toggleSideNav={toggleSideNav}
          adminName="Karthiban R"
          adminID="ADM001"
        />

        <A_SideNav isOpen={isSideNavOpen} />

        {isSideNavOpen && (
          <div
            className="sidenav-overlay-admin visible"
            onClick={toggleSideNav}
            aria-hidden="true"
            style={{ display: 'none' }} /* only shows via media query on mobile */
          />
        )}

        <div className="adashboard-body">
          <main className={`adashboard-main${isSideNavOpen ? ' sidebar-open' : ''}`}>

            {/* Live resource status bar */}
            <div className="adashboard-stats">
              <div className="adashboard-stat">
                CPU&nbsp;
                <span className={`adashboard-stat-val ${cpuUsage > threshold ? 'warn' : 'ok'}`}>
                  {cpuUsage !== null ? `${cpuUsage}%` : '—'}
                </span>
              </div>
              <div className="adashboard-stat">
                Memory&nbsp;
                <span className={`adashboard-stat-val ${memoryUsage > threshold ? 'warn' : 'ok'}`}>
                  {memoryUsage !== null ? `${memoryUsage}%` : '—'}
                </span>
              </div>
              <div className="adashboard-stat">
                Threshold&nbsp;
                <span className="adashboard-stat-val">{threshold}%</span>
              </div>
            </div>

            {latestAlert !== 'No alerts' && latestAlert !== 'Loading…' && (
              <div className="adashboard-alert alert-warn">
                ⚠ {latestAlert}
              </div>
            )}

            <div className="adashboard-page">
              <Routes>
                <Route path="acourses"          element={<A_Courses />} />
                <Route path="aupcomingevents"   element={<A_UpcomingEvents />} />
                <Route path="aleaderboard"      element={<A_Leaderboard />} />
                <Route path="aprofile"          element={<A_Profile />} />
                <Route path="amodules"          element={<A_Modules />} />
                <Route path="amodules/atest"    element={<A_TestAttempt />} />
                <Route path="resourcemonitor"   element={<A_Resource />} />
                <Route path="*"                 element={<A_Courses />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default A_Dashboard;
