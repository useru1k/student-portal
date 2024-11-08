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

const Dashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const location = useLocation();

  // Define paths for routes that should hide TopNav and SideNav
  const SPECIAL_ROUTES = ['/editor', '/review'];
  const isSpecialRoute = SPECIAL_ROUTES.some(route => location.pathname.startsWith(route));

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="relative">
      {/* Conditionally render TopNav and SideNav if not in a special route */}
      {!isSpecialRoute && (
        <>
          <TopNav toggleSideNav={toggleSideNav} />
          <div className="flex h-screen">
            <SideNav isOpen={isSideNavOpen} />
            <div className={`flex-grow transition-all duration-300 ${isSideNavOpen ? 'ml-64' : 'ml-0'} mt-16`}>
              <div className="p-6">
                <Routes>
                  <Route path="*" element={<Courses />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="upcomingevents" element={<UpcomingEvents />} />
                  <Route path="leaderboard" element={<LeaderBoard />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="siethome" element={<SietHome />} />
                  <Route path="courses/modules/:courseId" element={<Modules />} />
                  <Route path="courses/modules/test/:testId" element={<TestAttempt />} />
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Render only Editor or Review without TopNav and SideNav if on a special route */}
      {isSpecialRoute && (
        <div className="p-6">
          <Routes>
            <Route path="editor" element={<Editor />} />
            <Route path="review" element={<Review />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
