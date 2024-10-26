import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import A_TopNav from "../components/A_TopNav";
import A_SideNav from "../components/A_SideNav";
import A_Courses from "./A_Courses"; // Make sure this component is defined
//import A_UpcomingEvents from "./A_UpcomingEvents"; // Add other components as necessary
//import A_Leaderboard from "./A_Leaderboard"; // Add other components as necessary
import A_Profile from "./A_Profile"; // Add other components as necessary
//import A_Home from "./A_Home"; // Add other components as necessary
import A_TestAttempt from "./A_TestAttempt";

const A_Dashboard = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();

  const toggleSideNav = () => {
    setSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      {location.pathname !== "/" && (
        <>
          <A_TopNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
          <A_SideNav isOpen={isSideNavOpen} />
        </>
      )}
      <div className={`p-8 mt-16 transition-all ${isSideNavOpen ? "ml-64" : "ml-0"}`}>
        <Routes>
        <Route path="*" element={<A_Courses />} />
        <Route path="acourses" element={<A_Courses />} />
          {/* <Route path="/adashboard/upcomingevents" element={<A_UpcomingEvents />} />
          <Route path="/adashboard/leaderboard" element={<A_Leaderboard />} /> */}
          <Route path="aprofile" element={<A_Profile />} />
          <Route path="atestattempt" element={<A_TestAttempt />} />
          {/* <Route path="/adashboard/home" element={<A_Home />} /> */}
        </Routes>
      </div>
    </div>
  );
};

export default A_Dashboard;
