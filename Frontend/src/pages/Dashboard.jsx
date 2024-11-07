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
// import Settings from './Settings';
// import M from './M';

const Dashboard = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  const location = useLocation();

  // Check if the current route is the editor route
  const isEditorRoute = location.pathname.includes('/editor');

  const toggleSideNav = () => {
    setIsSideNavOpen(!isSideNavOpen);
  };

  return (
    <div className="relative">
      {/* Conditionally render TopNav and SideNav if not in the Editor route */}
      {!isEditorRoute && (
        <>
          {/* Fixed TopNav */}
          <TopNav toggleSideNav={toggleSideNav} />

          {/* Flex layout for SideNav and Main Content */}
          <div className="flex h-screen">
            {/* SideNav with toggleable state */}
            <SideNav isOpen={isSideNavOpen} />
            
            {/* Content area, which adjusts based on the SideNav state */}
            <div className={`flex-grow transition-all duration-300 ${isSideNavOpen ? 'ml-64' : 'ml-0'} mt-16`}>
              <div className="p-6">
                <Routes>
                  <Route path="*" element={<Courses />} />
                  <Route path="courses" element={<Courses />} />
                  <Route path="upcomingevents" element={<UpcomingEvents />} />
                  <Route path="leaderboard" element={<LeaderBoard />} />
                  <Route path="profile" element={<Profile />} />
                  {/* <Route path="profile" element={<M/>}/> */}
                  {/* <Route path="settings" element={<Settings />} /> */}
                  <Route path="siethome" element={<SietHome />} />
                  <Route path="courses/modules/:courseId" element={<Modules />} />
                  <Route path="courses/modules/test/:testId" element={<TestAttempt />} />
                 
                </Routes>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Render only the Editor without TopNav and SideNav if on the editor route */}
      {isEditorRoute && <Editor />}
    </div>
  );
};

export default Dashboard;