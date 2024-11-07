import React, { useState, useEffect } from 'react';
import { Search, Edit3Icon, Trash2Icon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import webdev from '../assets/img/webdev.png';
import ds from '../assets/img/ds.png';
import cys from '../assets/img/cys.png';
import py from '../assets/img/py.png';

// Initial course data
const initialCoursesData = [
  { id: 1, name: 'Web Development', image: webdev },
  { id: 2, name: 'Data Science', image: ds },
  { id: 3, name: 'Cybersecurity', image: cys },
  { id: 4, name: 'Python Programming', image: py },
  { id: 5, name: 'Machine Learning', image: ds },
  { id: 6, name: 'Cloud Computing', image: webdev },
  { id: 7, name: 'Artificial Intelligence', image: cys },
  { id: 8, name: 'Mobile App Development', image: py },
];

const A_Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(() => {
    const savedCourses = localStorage.getItem('courses');
    return savedCourses ? JSON.parse(savedCourses) : initialCoursesData;
  });
  const [showModal, setShowModal] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('');
  const [editingCourseId, setEditingCourseId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('courses', JSON.stringify(courses));
  }, [courses]);

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCardClick = (courseId) => {
    navigate('/adashboard/amodules');
  };

  const handleAddCourse = () => {
    setNewCourseName('');
    setNewCourseImage('');
    setEditingCourseId(null);
    setShowModal(true);
  };

  const handleEditCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setEditingCourseId(courseId);
      setNewCourseName(course.name);
      setNewCourseImage(course.image);
      setShowModal(true);
    }
  };

  const handleSaveCourse = () => {
    if (editingCourseId) {
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editingCourseId
            ? { ...course, name: newCourseName, image: newCourseImage }
            : course
        )
      );
    } else {
      const newCourse = {
        id: courses.length + 1,
        name: newCourseName,
        image: newCourseImage,
      };
      setCourses((prevCourses) => [...prevCourses, newCourse]);
    }
    setShowModal(false);
  };

  const handleDeleteCourse = (courseId) => {
    setCourses((prevCourses) => prevCourses.filter((course) => course.id !== courseId));
  };

  return (
    <>
      <h2 className="text-2xl font-bold">COURSE MANAGEMENT</h2>
      <div className="custom-scroll p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="mt-6 flex justify-between">
          <div className="relative w-full max-w-xs mr-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-full w-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
          </div>
          <button
            onClick={handleAddCourse}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Add Course
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white shadow-md rounded-lg overflow-hidden relative cursor-pointer"
              onClick={() => handleCardClick(course.id)}
            >
              <img src={course.image} alt={course.name} className="w-full h-40 object-cover" />
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditCourse(course.id);
                    }}
                    className="text-blue-600 hover:underline"
                  >
                    <Edit3Icon size={18} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCourse(course.id);
                    }}
                    className="text-red-600 hover:underline"
                  >
                    <Trash2Icon size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-semibold mb-4">
              {editingCourseId ? 'Edit Course' : 'Add Course'}
            </h2>
            <input
              type="text"
              placeholder="Course Name"
              value={newCourseName}
              onChange={(e) => setNewCourseName(e.target.value)}
              className="border p-2 rounded-lg w-full mb-4"
            />
            <input
              type="text"
              placeholder="Course Image URL"
              value={newCourseImage}
              onChange={(e) => setNewCourseImage(e.target.value)}
              className="border p-2 rounded-lg w-full mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCourse}
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {editingCourseId ? 'Save Changes' : 'Add Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default A_Courses;
