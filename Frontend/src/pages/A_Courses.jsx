import React, { useState } from 'react';
import { Search } from 'lucide-react'; // Importing the search icon from Lucide React
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook
import webdev from '../assets/img/webdev.png';
import ds from '../assets/img/ds.png';
import cys from '../assets/img/cys.png';
import py from '../assets/img/py.png';

// Initial course data
const initialCoursesData = [
  {
    id: 1,
    name: 'Web Development',
    image: webdev,
  },
  {
    id: 2,
    name: 'Data Science',
    image: ds,
  },
  {
    id: 3,
    name: 'Cybersecurity',
    image: cys,
  },
  {
    id: 4,
    name: 'Python Programming',
    image: py,
  },
  {
    id: 5,
    name: 'Machine Learning',
    image: ds,
  },
  {
    id: 6,
    name: 'Cloud Computing',
    image: webdev,
  },
  {
    id: 7,
    name: 'Artificial Intelligence',
    image: cys,
  },
  {
    id: 8,
    name: 'Mobile App Development',
    image: py,
  },
];

const A_Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState(initialCoursesData); // Manage courses
  const [showModal, setShowModal] = useState(false); // Control modal visibility
  const [newCourseName, setNewCourseName] = useState(''); // For course name input
  const [newCourseImage, setNewCourseImage] = useState(''); // For course image input
  const [editingCourseId, setEditingCourseId] = useState(null); // Track the course being edited
  const navigate = useNavigate();

  // Filter courses based on search term
  const filteredCourses = courses.filter((course) => {
    return course.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Open modal to add a new course
  const handleAddCourse = () => {
    setNewCourseName('');
    setNewCourseImage('');
    setEditingCourseId(null); // Clear editing state
    setShowModal(true);
  };

  // Open modal to edit a course
  const handleEditCourse = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (course) {
      setEditingCourseId(courseId);
      setNewCourseName(course.name); // Populate form with existing course name
      setNewCourseImage(course.image); // Populate form with existing image
      setShowModal(true); // Show modal
    }
  };

  // Save course (add or edit)
  const handleSaveCourse = () => {
    if (editingCourseId) {
      // Update existing course
      const updatedCourses = courses.map((course) =>
        course.id === editingCourseId ? { ...course, name: newCourseName, image: newCourseImage } : course
      );
      setCourses(updatedCourses);
    } else {
      // Add a new course
      const newCourse = {
        id: courses.length + 1,
        name: newCourseName,
        image: newCourseImage,
      };
      setCourses([...courses, newCourse]);
    }

    // Close the modal after saving
    setShowModal(false);
  };

  // Delete course
  const handleDeleteCourse = (courseId) => {
    const updatedCourses = courses.filter((course) => course.id !== courseId);
    setCourses(updatedCourses);
  };

  return (
    <>
      <h2 className="text-2xl font-bold">COURSE OVERVIEW (Admin)</h2>
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
            >
              <img src={course.image} alt={course.name} className="w-full h-40 object-cover" />
              <div className="p-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditCourse(course.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Popup for Adding/Editing Courses */}
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
