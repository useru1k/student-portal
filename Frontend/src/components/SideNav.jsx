import React from 'react';
import { Link } from 'react-router-dom';
import { HomeIcon, BookOpenIcon, UserIcon } from 'lucide-react';
import { MdLeaderboard, MdQueuePlayNext } from 'react-icons/md';

const SideNav = ({ isOpen }) => {
  return (
    // isOpen - When chick the bar means Adjust the screen Size
    <div className={`bg-[#293643] text-white h-full fixed top-16 transition-transform duration-300 ${isOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
      <ul className="mt-4">
        <Link to="/dashboard/courses" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <BookOpenIcon className="mr-2" size={23} />
            <span>Courses</span>
          </li>
        </Link>
        <Link to="/dashboard/upcomingevents" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <MdQueuePlayNext className="mr-2" size={23} />
            <span>Upcoming Events</span>
          </li>
        </Link>
        <Link to="/dashboard/leaderboard" className="flex hover:bg-gray-700 items-center">
          <li className="p-4 flex items-center transition-colors duration-200">
            <MdLeaderboard className="mr-2" size={23} />
            <span>Leader Board</span>
          </li>
        </Link>
        <Link to="/dashboard/siethome" className="flex hover:bg-gray-700 items-center">
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
