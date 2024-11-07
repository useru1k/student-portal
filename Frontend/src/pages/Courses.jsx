import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { GiRoundStar } from 'react-icons/gi';
import { useNavigate } from 'react-router-dom';
import webdev from '../assets/img/webdev.png';
import ds from '../assets/img/ds.png';
import cys from '../assets/img/cys.png';
import py from '../assets/img/py.png';

const coursesData = [
  { id: 1, name: 'Web Development', image: webdev, progress: 0 },
  { id: 2, name: 'Data Science', image: ds, progress: 40 },
  { id: 3, name: 'Cybersecurity', image: cys, progress: 90 },
  { id: 4, name: 'Python Programming', image: py, progress: 90 },
  { id: 5, name: 'Machine Learning', image: ds, progress: 50 },
  { id: 6, name: 'Cloud Computing', image: webdev, progress: 30 },
  { id: 7, name: 'Artificial Intelligence', image: cys, progress: 100 },
  { id: 8, name: 'Mobile App Development', image: py, progress: 60 },
];

const CircularProgress = ({ progress }) => {
  const radius = 20;
  const strokeWidth = 5;
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <svg height={radius * 2} width={radius * 2}>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%">
          <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <circle
        stroke="url(#gradient)"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference + ' ' + circumference}
        style={{ strokeDashoffset }}
        cx={radius}
        cy={radius}
        r={normalizedRadius}
      />
    </svg>
  );
};

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [filter, setFilter] = useState('all');
  const [view, setView] = useState('card');
  const navigate = useNavigate();

  const toggleFavorite = (courseId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(courseId)) {
      newFavorites.delete(courseId);
    } else {
      newFavorites.add(courseId);
    }
    setFavorites(newFavorites);
  };

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearchTerm = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFavorite = favorites.has(course.id);
    const isInProgress = course.progress > 0 && course.progress < 100;
    const isNew = course.progress === 0;
    const isCompleted = course.progress === 100;

    return (
      matchesSearchTerm &&
      ((filter === 'all') ||
       (filter === 'favorites' && isFavorite) ||
       (filter === 'inProgress' && isInProgress) ||
       (filter === 'new' && isNew) ||
       (filter === 'completed' && isCompleted))
    );
  });

  const handleCourseClick = (courseId) => {
    navigate(`/dashboard/courses/modules/${courseId}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold">COURSE OVERVIEW</h2>
      <div className="custom-scroll p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="mt-6 flex flex-wrap justify-end items-center space-y-2 md:space-y-0">
          <div className="relative w-full max-w-xs md:mr-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full w-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
          <select
            className="border rounded-full px-4 py-2 w-full max-w-xs md:max-w-none md:w-auto md:mr-4"
            onChange={(e) => setFilter(e.target.value)}
            value={filter}
          >
            <option value="all">All Courses</option>
            <option value="favorites">Favorites</option>
            <option value="inProgress">In Progress</option>
            <option value="new">New</option>
            <option value="completed">Completed</option>
          </select>
          <select
            className="border rounded-full px-4 py-2 w-full max-w-xs md:max-w-none md:w-auto"
            onChange={(e) => setView(e.target.value)}
            value={view}
          >
            <option value="card">Card View</option>
            <option value="list">List View</option>
          </select>
        </div>
        <div className={`mt-6 ${view === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'} overflow-x-auto overflow-y-auto`}>
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`bg-white shadow-md rounded-lg overflow-hidden relative cursor-pointer ${
                view === 'card' ? '' : 'flex items-center p-4'
              }`}
              onClick={() => handleCourseClick(course.id)}
            >
              <img
                src={course.image}
                alt={course.name}
                className={`${view === 'card' ? 'w-full h-40' : 'w-20 h-20 mr-4'} object-cover`}
              />
              <div className="p-4 flex justify-between items-center w-full">
                <div>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  {view === 'list' && (
                    <div className="text-sm font-medium text-gray-700">Progress: {course.progress}%</div>
                  )}
                </div>
                <div
                  className={`cursor-pointer transition-all duration-300 ${
                    favorites.has(course.id) ? 'text-blue-400' : 'text-gray-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(course.id);
                  }}
                >
                  <GiRoundStar size={24} />
                </div>
              </div>
              {view === 'card' && (
                <div className="flex items-center mt-2 ml-4">
                  <CircularProgress progress={course.progress} />
                  <div className="ml-4 text-sm font-medium text-gray-700">Progress: {course.progress}%</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
