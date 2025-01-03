import React, { useState } from 'react';
import { AlignLeft, XIcon, UserIcon } from 'lucide-react';
import { MdArrowDropDown } from "react-icons/md"; // Import the down arrow icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const TopNav = ({ isSideNavOpen, toggleSideNav, studentID }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const navigate = useNavigate(); // Use navigate to route to the login page

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Remove token on logout
    navigate('/'); // Redirect to login page
  };

  return (
    <nav className="bg-[#293643] text-white p-4 fixed w-full top-0 shadow-md z-50 flex justify-between items-center">
      <div className="flex items-center gap-1">
        <button onClick={toggleSideNav} className="text-white p-2">
          {isSideNavOpen ? <XIcon size={24} /> : <AlignLeft size={24} />}
        </button>
        <h1 className="text-xl font-semibold ml-4">
  Welcome, <a href="/dashboard/profile">BHARATHI</a>
</h1>

      </div>

      {/* Student ID and User Icon with Dropdown */}
      <div className="relative flex items-center gap-2">
        <UserIcon size={24} /> {/* Display user icon */}
        <span className="mr-2">ID{studentID}</span> {/* Display student ID */}
        <MdArrowDropDown onClick={toggleDropdown} className="cursor-pointer" size={24} />
        
        {isDropdownOpen && (
          <div className="absolute right-0 mt-[120%] w-[100%] bg-white text-gray-800 rounded-md shadow-lg">
            <a href="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</a>
            {/* <a href="/dashboard/settings" className="block px-4 py-2 hover:bg-gray-200">Settings</a> */}
            <div className="border-t border-gray-200"></div>
            <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopNav;


