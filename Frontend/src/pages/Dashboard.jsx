import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopNav from '../components/TopNav';
import SideNav from '../components/SideNav';
import Courses from './Courses'; 
import Profile from './Profile';
import UpcomingEvents from './UpcomingEvents';
import Leaderboard from './LeaderBoard';
import SietHome from './SietHome'; 
import LoginAdmin from './LoginAdmin';
import Modules from './Modules';
import TestAttempt from './TestAttempt';

const Dashboard = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false); // Manages the toggle state

  const toggleSideNav = () => {
    setSideNavOpen(!isSideNavOpen); // Toggles the sidebar state
  };

  return (
    <Router>
      <div>
        {/* Conditionally render TopNav and SideNav based on the route */}
        <Routes>
          <Route path="/" element={<LoginAdmin />} />
          <Route path="*" element={
            <>
              <TopNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
              <SideNav isOpen={isSideNavOpen} /> {/* Passes the sidebar open/close state */}
              <div className={`p-8 mt-16 ${isSideNavOpen ? 'ml-64' : 'ml-0'} transition-all`}>
                <Routes>
                  <Route path="/courses" element={<Courses />} /> {/* Set Courses as root */}
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/upcomingevents" element={<UpcomingEvents />} />
                  <Route path="/leaderboard" element={<Leaderboard />} />
                  <Route path="/siethome" element={<SietHome />} />
                  <Route path="/modules/:courseId" element={<Modules />} />
                  <Route path="/test/:testId" element={<TestAttempt />} />

                </Routes>
              </div>
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
};

export default Dashboard;
