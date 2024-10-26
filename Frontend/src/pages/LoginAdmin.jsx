import React, { useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const LoginAdmin = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // Simulate user authentication (replace with your actual authentication logic)
    const isValidUser = await authenticateUser(username, password); // Assume this function returns a user object or null

    if (isValidUser) {
      localStorage.setItem('authToken', isValidUser.token); // Store token in localStorage if returned
      onLogin(isValidUser.role); // Pass the role (admin/user)
      navigate(isValidUser.role === 'admin' ? "/adashboard" : "/dashboard"); // Navigate to the appropriate dashboard
    } else {
      setErrorMessage("Invalid username or password");
    }
  };


  // Simulated authentication function
  const authenticateUser = async (username, password) => {
    const validCredentials = {
      admin: "admin123",
      user: "user123",
    };
    
    if (validCredentials[username] === password) {
      return { role: username }; // Return the role if valid
    }
    return null; // Return null for invalid credentials
  };

  return (
    <div className="flex items-center justify-center h-screen loginbg bg-fixed bg-cover bg-center overflow-hidden">
      <div className="relative w-[500px] h-[500px] glass border border-gray-300 rounded-xl shadow-xl flex items-center overflow-hidden">
        <div className="min-w-full p-10 h-full">
          <form onSubmit={handleLogin}>
            <h1 className="text-3xl text-center mb-6 text-gray-800 font-bold hover:scale-105 transition-transform">Login</h1>

            <div className="relative w-full h-[50px] mb-8">
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full h-full bg-gray-100 border-2 border-gray-300 outline-none rounded-full text-gray-800 px-5 pl-5 pr-12 placeholder-gray-500 transition-all duration-300 hover:border-gray-700 focus:border-gray-700 focus:ring"
              />
              <FaUserGraduate className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-800" />
            </div>

            <div className="relative w-full h-[50px] mb-8">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full h-full bg-gray-100 border-2 border-gray-300 outline-none rounded-full text-gray-800 px-5 pl-5 pr-12 placeholder-gray-500 transition-all duration-300 hover:border-gray-700 focus:border-gray-700 focus:ring"
              />
              <RiLockPasswordFill className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-800" />
            </div>

            {errorMessage && <div className="text-red-600 text-center mb-4">{errorMessage}</div>}

            <button type="submit" className="w-full h-[45px] bg-gray-700 text-white rounded-full font-semibold shadow-lg hover:bg-gray-500 transition-all duration-300 transform hover:scale-105">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginAdmin;
