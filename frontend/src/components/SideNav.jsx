import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UserIcon } from 'lucide-react'; // Import icons
import { MdLeaderboard, MdQueuePlayNext } from 'react-icons/md';

const SideNav = ({ isOpen }) => {
  return (
    <div className={`bg-[#293643] text-white w-64 h-screen fixed transition-transform ${isOpen ? 'translate-x-0' : '-translate-x-64'}`}>
      <ul className="mt-4">
          <Link to="/courses" className="flex  hover:bg-gray-700 items-center">
        <li className="p-4 flex items-center transition-colors duration-200">
            <BookOpenIcon className="mr-2" size={23} />
            <span>Courses</span>
        </li>
          </Link>
          <Link to="/upcomingevents" className="flex  hover:bg-gray-700 items-center">
        <li className="p-4 flex items-center transition-colors duration-200">
            <MdQueuePlayNext className="mr-2" size={23} />
            <span>Upcoming Events</span>
        </li>
          </Link>
          <Link to="/leaderboard" className="flex  hover:bg-gray-700 items-center">
        <li className="p-4 flex items-center transition-colors duration-200">
            <MdLeaderboard className="mr-2" size={23} />
            <span>Leader Board</span>
        </li>
          </Link>
          <Link to="/profile" className="flex  hover:bg-gray-700 items-center">
        <li className="p-4 flex items-center  transition-colors duration-200">
            <UserIcon className="mr-2" size={23} />
            <span>Profile</span>
        </li>
          </Link>
          <Link to="/siethome" className="flex  hover:bg-gray-700 items-center">
        <li className="p-4 flex items-center transition-colors duration-200">
            <HomeIcon className="mr-2" size={23} />
            <span>Home</span>
        </li>
          </Link>
      </ul>
    </div>
  );
};

export default SideNav;
