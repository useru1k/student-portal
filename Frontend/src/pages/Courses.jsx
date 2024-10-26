import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Importing the search icon from Lucide React
import { GiRoundStar } from 'react-icons/gi'; // Importing the star icon
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import webdev from '../assets/img/webdev.png';
import ds from '../assets/img/ds.png';
import cys from '../assets/img/cys.png';
import py from '../assets/img/py.png';

const coursesData = [
  {
    id: 1,
    name: 'Web Development',
    image: webdev,
    progress: 70,
  },
  {
    id: 2,
    name: 'Data Science',
    image: ds,
    progress: 40,
  },
  {
    id: 3,
    name: 'Cybersecurity',
    image: cys,
    progress: 90,
  },
  {
    id: 4,
    name: 'Python Programming',
    image: py,
    progress: 90,
  },
  {
    id: 5,
    name: 'Machine Learning',
    image: ds,
    progress: 50,
  },
  {
    id: 6,
    name: 'Cloud Computing',
    image: webdev,
    progress: 30,
  },
  {
    id: 7,
    name: 'Artificial Intelligence',
    image: cys,
    progress: 80,
  },
  {
    id: 8,
    name: 'Mobile App Development',
    image: py,
    progress: 60,
  },
];

const CircularProgress = ({ progress }) => {
  const radius = 20; // Radius of the circle
  const strokeWidth = 5; // Width of the stroke
  const normalizedRadius = radius - strokeWidth * 0.5; // Adjusted radius for stroke
  const circumference = normalizedRadius * 2 * Math.PI; // Circumference of the circle
  const strokeDashoffset = circumference - (progress / 100) * circumference; // Calculate offset based on progress

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
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const [favorites, setFavorites] = useState(new Set()); // State for favorite courses
  const [showFavorites, setShowFavorites] = useState(false); // State for showing favorites
  const navigate = useNavigate(); // React Router's hook for navigation

  // Toggle favorite course
  const toggleFavorite = (courseId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(courseId)) {
      newFavorites.delete(courseId);
    } else {
      newFavorites.add(courseId);
    }
    setFavorites(newFavorites);
  };

  // Filter courses based on search term and favorite status
  const filteredCourses = coursesData.filter((course) => {
    const matchesSearchTerm = course.name.toLowerCase().includes(searchTerm.toLowerCase());
    const isFavorite = favorites.has(course.id);

    return matchesSearchTerm && (!showFavorites || isFavorite);
  });

  // Navigate to the modules page when clicking on a course card
  const handleCourseClick = (courseId) => {
    navigate(`/dashboard/courses/modules/${courseId}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold">COURSE OVERVIEW</h2>
      <div className="custom-scroll p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {/* This div wraps both the search and the course grid for scrolling */}
        <div className="mt-6 flex justify-end">
          <div className="relative w-full max-w-xs mr-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} // Update search term
              className="pl-10 pr-4 py-2 border rounded-full w-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} /> {/* Search icon */}
          </div>
          <select
            className="border rounded-full px-4 py-2"
            onChange={(e) => setShowFavorites(e.target.value === 'favorites')}
          >
            <option value="all">All Courses</option>
            <option value="favorites">Favorites</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => handleCourseClick(course.id)} // Add onClick event for navigation
            >
              <img src={course.image} alt={course.name} className="w-full h-40 object-cover" />
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <div
                  className={`cursor-pointer transition-all duration-300 ${
                    favorites.has(course.id) ? 'text-blue-400 bounce' : 'text-gray-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent navigation on star click
                    toggleFavorite(course.id);
                  }}
                >
                  <GiRoundStar size={24} />
                </div>
              </div>
              <div className="flex items-center mt-2 ml-4">
                <CircularProgress progress={course.progress} />
                <div className="ml-4 text-sm font-medium text-gray-700">Progress: {course.progress}%</div>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
