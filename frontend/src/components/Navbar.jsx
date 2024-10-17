import React, { useState } from 'react';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div>
      {/* Top Navbar with Breadcrumb */}
      <nav className="bg-gray-900 px-4 py-2 flex justify-between items-center fixed top-0 left-0 right-0 z-50" style={{ height: '60px' }}>
        {/* Left side - Logo and Breadcrumb */}
        <div className="flex space-x-6">
          {/* Logo */}
          <div className="text-white text-lg font-semibold">SIET</div>

          {/* Breadcrumb directly in the Navbar */}
          <div className="flex items-center space-x-2">
            <a href="#module" className="text-gray-300 hover:text-white">Module</a>
            <span className="text-gray-300">{'>'}</span>
            <a href="#practice" className="text-gray-300 hover:text-white">Practice</a>
            <span className="text-gray-300">{'>'}</span>
            <a href="#question" className="text-white font-semibold">Question Name</a>
          </div>
        </div>

        {/* Right side - Dropdown for Python version */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="text-gray-300 hover:text-white flex items-center space-x-1"
          >
            <span>Python 3</span>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
