import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginAdmin from './pages/LoginAdmin';
import Dashboard from './pages/Dashboard';
import A_Dashboard from './pages/A_Dashboard';
import Editor from './pages/Editor'; // Import the Editor component
import Review from './pages/Review';

const App = () => {
  const [userRole, setUserRole] = useState(null); // Track user role

  // Load user role from local storage on component mount
  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    if (storedRole) {
      setUserRole(storedRole);
    }
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    localStorage.setItem('userRole', role); // Save user role in local storage
  };

  const handleLogout = () => {
    setUserRole(null);
    localStorage.removeItem('userRole'); // Clear user role from local storage
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginAdmin onLogin={handleLogin} />} />
        <Route path="/dashboard/*" element={userRole === 'user' ? <Dashboard onLogout={handleLogout} /> : <LoginAdmin onLogin={handleLogin} />} />
        <Route path="/adashboard/*" element={userRole === 'admin' ? <A_Dashboard onLogout={handleLogout} /> : <LoginAdmin onLogin={handleLogin} />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="review" element={<Review />} />
      </Routes>
    </Router>
  );
};

export default App;
