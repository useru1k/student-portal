import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import SideNav from '../components/SideNav';
import TopNav from '../components/TopNav';
import Courses from './Courses';
import UpcomingEvents from './UpcomingEvents';
import LeaderBoard from './LeaderBoard';
import Profile from './Profile';
import SietHome from './SietHome';
import Modules from './Modules';
import TestAttempt from './TestAttempt';
import Editor from './Editor';
import Review from './Review';
import FinishAttempt from './FinishAttempt';

const SPECIAL_ROUTES = ['/editor', '/review', '/finishattempt'];

const Dashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const location = useLocation();

  const isSpecialRoute = SPECIAL_ROUTES.some((r) =>
    location.pathname.startsWith(r)
  );

  const toggleSideNav = () => setIsSideNavOpen((v) => !v);

  return (
    <>
      <style>{`
        .dashboard-shell {
          min-height: 100vh;
          background: #0d1117;
          font-family: 'Inter', sans-serif;
        }

        /* Main content sits below the 60px TopNav */
        .dashboard-body {
          display: flex;
          padding-top: 60px;
          min-height: 100vh;
        }

        /* Content area shifts right when sidebar is open */
        .dashboard-main {
          flex: 1;
          min-width: 0;
          padding: 28px 28px 40px;
          transition: margin-left 0.28s cubic-bezier(0.4,0,0.2,1);
          margin-left: 0;
        }

        .dashboard-main.sidebar-open {
          margin-left: 240px;
        }

        /* Page wrapper — white-on-dark card feel */
        .dashboard-page {
          background: #161b27;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.06);
          min-height: calc(100vh - 60px - 68px);
          padding: 28px;
          box-shadow: 0 4px 32px rgba(0,0,0,0.25);
        }

        /* Override any legacy white bg from child pages */
        .dashboard-page .bg-white {
          background: transparent !important;
        }

        .dashboard-page h2 {
          color: #f0f6ff;
        }

        /* Breadcrumb / page top bar */
        .dashboard-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .dashboard-topbar-title {
          font-size: 1.15rem;
          font-weight: 700;
          color: #e2e8f0;
          letter-spacing: -0.02em;
        }

        /* Overlay for mobile when sidebar is open */
        .sidenav-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.55);
          z-index: 80;
          backdrop-filter: blur(2px);
        }

        @media (max-width: 768px) {
          .sidenav-overlay.visible { display: block; }
          .dashboard-main.sidebar-open { margin-left: 0; }
          .dashboard-main { padding: 16px 14px 32px; }
          .dashboard-page { padding: 18px; border-radius: 12px; }
        }
      `}</style>

      {/* ── Special routes: editor / review / finish — no chrome ── */}
      {isSpecialRoute ? (
        <div className="dashboard-shell">
          <Routes>
            <Route path="editor"       element={<Editor />} />
            <Route path="review"       element={<Review />} />
            <Route path="finishattempt" element={<FinishAttempt />} />
          </Routes>
        </div>
      ) : (
        <div className="dashboard-shell">
          <TopNav
            isSideNavOpen={isSideNavOpen}
            toggleSideNav={toggleSideNav}
            studentName="Bharathi"
            studentID="001"
          />

          <SideNav isOpen={isSideNavOpen} />

          {/* Mobile overlay — tap to close sidebar */}
          {isSideNavOpen && (
            <div
              className="sidenav-overlay visible"
              onClick={toggleSideNav}
              aria-hidden="true"
            />
          )}

          <div className="dashboard-body">
            <main
              className={`dashboard-main${isSideNavOpen ? ' sidebar-open' : ''}`}
            >
              <div className="dashboard-page">
                <Routes>
                  <Route path="*"                           element={<Courses />} />
                  <Route path="courses"                     element={<Courses />} />
                  <Route path="upcomingevents"              element={<UpcomingEvents />} />
                  <Route path="leaderboard"                 element={<LeaderBoard />} />
                  <Route path="profile"                     element={<Profile />} />
                  <Route path="siethome"                    element={<SietHome />} />
                  <Route path="courses/modules/:courseId"   element={<Modules />} />
                  <Route path="courses/modules/test/:testId" element={<TestAttempt />} />
                </Routes>
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
