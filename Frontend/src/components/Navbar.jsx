import React from "react";
import { FaFire } from "react-icons/fa";

const Navbar = ({ language, onLanguageChange, streakCount }) => {
  return (
    <nav
      className="bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2 flex justify-between items-center shadow-lg w-full"
      style={{ height: "60px" }}
    >
      <div className="flex space-x-6">
        <div className="flex items-center space-x-2 text-sm font-medium">
          <a
            href="#module"
            className="text-gray-200 hover:text-white transition-colors duration-200"
          >
            Module
          </a>
          <span className="text-gray-300">{">"}</span>
          <a
            href="#practice"
            className="text-gray-200 hover:text-white transition-colors duration-200"
          >
            Practice
          </a>
          <span className="text-gray-300">{">"}</span>
          <a href="#question" className="text-white font-semibold">
            Question Name
          </a>
        </div>
      </div>

      <div className="flex items-center relative">
        <div className="flex items-center space-x-1  rounded-full py-1 px-2 ">
          <FaFire className="text-yellow-500 w-5 h-5" />
          <span className="text-yellow-400 font-bold text-lg">
            {streakCount}
          </span>
        </div>
        <div>
          <button id = "button-run"
          className="btn-run bg-green-500 text-white py-1 px-2 rounded-sm flex items-center space-x-1 text-sm">
            Run
          </button>
        </div>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="ml-4 bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-purple-200"
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </div>
    </nav>
  );
};

export default Navbar;