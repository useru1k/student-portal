// Import the Module
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import A_TopNav from "../components/A_TopNav";
import A_SideNav from "../components/A_SideNav";
import A_Courses from "./A_Courses"; 
import A_UpcomingEvents from "./A_UpcomingEvents";
import A_Profile from "./A_Profile"; 
import A_TestAttempt from "./A_TestAttempt";
import A_Modules from "./A_Modules";
import ResourceCard from "../components/A_ResourceCard";
import ThresholdUpdater from "../components/A_ThresholdUpdater";
import A_Leaderboard from "./LeaderBoard";
import A_Resource from "./A_Resource";

const A_Dashboard = () => {
  const [isSideNavOpen, setSideNavOpen] = useState(false);
  const location = useLocation();
  const [threshold, setThreshold] = useState(70);
  const [cpuUsage, setCpuUsage] = useState(null);
  const [memoryUsage, setMemoryUsage] = useState(null);
  const [latestAlert, setLatestAlert] = useState("Loading...");

  // Simulate fetching resource data
  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedCpu = Math.floor(Math.random() * 100); // Simulated CPU usage
      const simulatedMemory = Math.floor(Math.random() * 100); // Simulated Memory usage
      setCpuUsage(simulatedCpu);
      setMemoryUsage(simulatedMemory);

      // Set alert message
      if (simulatedCpu > threshold || simulatedMemory > threshold) {
        setLatestAlert(`High usage detected! CPU: ${simulatedCpu}%, Memory: ${simulatedMemory}%`);
      } else {
        setLatestAlert("No alerts");
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [threshold]);

  const handleThresholdUpdate = () => {
    alert(`Threshold updated to ${threshold}%`);
  };

  const toggleSideNav = () => {
    setSideNavOpen(!isSideNavOpen);
  };

  return (
    <div>
      {location.pathname !== "/" && (
        <>
          <A_TopNav isSideNavOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
          <A_SideNav isOpen={isSideNavOpen} toggleSideNav={toggleSideNav} />
        </>
      )}

      <div className={`p-8 mt-16 transition-all ${isSideNavOpen ? "ml-64" : "ml-0"}`}>
        <Routes>
          <Route path="acourses" element={<A_Courses />} />
          <Route path="aupcomingevents" element={<A_UpcomingEvents />} />
          <Route path="aleaderboard" element={<A_Leaderboard />} />
          <Route path="aprofile" element={<A_Profile />} />
          <Route path="amodules" element={<A_Modules />} />
          <Route path="amodules/atest" element={<A_TestAttempt />} />
          <Route
            path="resourcemonitor"
            element={<A_Resource />
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<A_Courses />} />
        </Routes>
      </div>
    </div>
  );
};

export default A_Dashboard;
