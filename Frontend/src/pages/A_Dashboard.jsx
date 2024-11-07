import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import A_TopNav from "../components/A_TopNav";
import A_SideNav from "../components/A_SideNav";
import A_Courses from "./A_Courses"; // Ensure this component is defined
import A_UpcomingEvents from "./A_UpcomingEvents"; // Ensure this component is defined
// import A_Leaderboard from "./A_Leaderboard"; // Ensure this component is defined
import A_Profile from "./A_Profile"; // Ensure this component is defined
// import A_Home from "./A_Home"; // Ensure this component is defined
import A_TestAttempt from "./A_TestAttempt";
import A_Modules from "./A_Modules";

const A_Dashboard = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();

  const toggleSideNav = () => {
    setSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      {/* Ensure the TopNav and SideNav are only shown when necessary */}
      {location.pathname !== "/" && (
        <>
          <A_TopNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
          <A_SideNav isOpen={isSideNavOpen} />
        </>
      )}
      
      {/* Main content area */}
      <div className={`p-8 mt-16 transition-all ${isSideNavOpen ? "ml-64" : "ml-0"}`}>
        <Routes>
          <Route path="acourses" element={<A_Courses />} />
          <Route path="aupcomingevents" element={<A_UpcomingEvents />} />
          {/* Uncomment and define the components when needed */}
          {/* <Route path="aleaderboard" element={<A_Leaderboard />} /> */}
          <Route path="aprofile" element={<A_Profile />} />
          <Route path="amodules" element={<A_Modules />} />
          <Route path="amodules/atest" element={<A_TestAttempt />} />
          {/* Uncomment and define A_Home if required */}
          {/* <Route path="ahome" element={<A_Home />} /> */}
          {/* Fallback route */}
          <Route path="*" element={<A_Courses />} />
        </Routes>
      </div>
    </div>
  );
};

export default A_Dashboard;
