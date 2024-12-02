import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon } from 'lucide-react';
import { MdLeaderboard, MdQueuePlayNext, MdMonitor } from 'react-icons/md'; // Import all necessary icons

const A_SideNav = ({ isOpen, toggleSideNav }) => {
  return (
    <div className={`bg-[#293643] text-white w-64 h-screen fixed transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
      <ul className="mt-4">
        <Link to="/adashboard/acourses" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <BookOpenIcon className="mr-2" size={23} />
            <span>Course Management</span>
          </li>
        </Link>
        <Link to="/adashboard/aupcomingevents" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <MdQueuePlayNext className="mr-2" size={23} />
            <span>Upcoming Events</span>
          </li>
        </Link>
        <Link to="/adashboard/aleaderboard" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <MdLeaderboard className="mr-2" size={23} />
            <span>Leader Board</span>
          </li>
        </Link>
        <Link to="/adashboard/ahome" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <HomeIcon className="mr-2" size={23} />
            <span>Home</span>
          </li>
        </Link>
        <Link to="/adashboard/resourcemonitor" className="flex hover:bg-gray-700 items-center" onClick={toggleSideNav}>
          <li className="p-4 flex items-center transition-colors duration-200">
            <MdMonitor className="mr-2" size={23} />
            <span>Resource Monitor</span>
          </li> 
        </Link>
      </ul>
    </div>
  );
};

export default A_SideNav;
