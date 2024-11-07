import React, { useState, useEffect } from 'react';
import webdev from '../assets/img/webdev.png';
import ds from '../assets/img/ds.png';
import cys from '../assets/img/cys.png';
import { MdSettingsSuggest } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const coursesData = [
  { id: 1, name: 'Web Development', progress: 0, image: webdev },
  { id: 2, name: 'Data Science', progress: 40, image: ds },
  { id: 3, name: 'Cybersecurity', progress: 90, image: cys },
  { id: 4, name: 'Python Programming', progress: 90, image: cys },
  { id: 5, name: 'Machine Learning', progress: 50, image: webdev },
  { id: 6, name: 'Cloud Computing', progress: 30, image: ds },
  { id: 7, name: 'Artificial Intelligence', progress: 100, image: cys },
  { id: 8, name: 'Mobile App Development', progress: 60, image: cys },
];

const Profile = () => {
  const initialStudent = {
    name: 'BHARATHI A K',
    id: '22CY0008',
    email: 'bharathiak22cys@srishakthi.ac.in',
  };

  const [student, setStudent] = useState(() => {
    const savedStudent = localStorage.getItem('studentData');
    return savedStudent ? JSON.parse(savedStudent) : initialStudent;
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedStudent, setEditedStudent] = useState(student);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [viewType, setViewType] = useState('list');

  const handleEditClick = () => {
    setEditedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent({ ...editedStudent, [name]: value });
  };

  const handleSaveChanges = () => {
    setStudent(editedStudent);
    setIsModalOpen(false);
    localStorage.setItem('studentData', JSON.stringify(editedStudent));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
  };

  useEffect(() => {
    const savedStudent = localStorage.getItem('studentData');
    if (savedStudent) {
      setStudent(JSON.parse(savedStudent));
    }
  }, []);
  
  const navigate = useNavigate();
  const handleCourseClick = (courseId) => {
    navigate(`/dashboard/courses/modules/${courseId}`);
  };

  const handleViewChange = (e) => {
    setViewType(e.target.value); // Update view type based on selected option
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h2 className="text-2xl font-bold">PROFILE</h2>
        <div className="relative">
          <MdSettingsSuggest size={28} onClick={toggleDropdown} className="cursor-pointer" />
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
              <ul className="py-2">
                <li onClick={openPasswordModal} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Change Password
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <a href="/blog" className="block text-gray-700">Blog</a>
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <a href="/forum" className="block text-gray-700">Forum</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="custom-scroll p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <div className="flex flex-row justify-between">
            <h3 className="text-lg font-semibold">Student Details</h3>
            <p onClick={handleEditClick} className="text-blue-500 cursor-pointer">Edit Profile</p>
          </div>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Email:</strong> {student.email}</p>
        </div>

        <div>
          <div className='flex flex-row justify-between'>
          <h3 className="text-lg font-semibold">Courses</h3>
          <select
            onChange={handleViewChange}
            value={viewType}
            className="px-4 py-2 rounded-md mb-4"
          >
            <option value="list">List View</option>
            <option value="card">Card View</option>
          </select>
      </div>
        <ul className={viewType === 'list' ? 'pl-5' : 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'}>
            {coursesData.map((course) => (
              <li
                key={course.id}
                className={viewType === 'list' 
                  ? 'mb-4 p-4 bg-white shadow-md rounded-lg flex items-center cursor-pointer'
                  : 'p-4 bg-white shadow-md rounded-lg flex flex-col items-center cursor-pointer'}
                onClick={() => handleCourseClick(course.id)}
              >
                <img
                  src={course.image}
                  alt={course.name}
                  className={viewType === 'list' ? 'w-16 h-16 object-cover mr-4' : 'w-60 h-32 object-cover mb-4'}
                />
                <div className={viewType === 'list' ? 'flex-1' : ''}>
                  <h4 className="text-lg font-semibold">{course.name}</h4>
                  <div className="mt-1">
                    <div className="text-sm font-medium text-gray-700">
                      Progress: {course.progress}%
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Name</span>
              <input
                type="text"
                name="name"
                value={editedStudent.name}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">ID</span>
              <input
                type="text"
                name="id"
                value={editedStudent.id}
                onChange={handleInputChange}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </label>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {isPasswordModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <label className="block mb-2">
              <span className="text-gray-700">Old Password</span>
              <input
                type="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">New Password</span>
              <input
                type="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </label>
            <label className="block mb-2">
              <span className="text-gray-700">Confirm New Password</span>
              <input
                type="password"
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
              />
            </label>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                onClick={closePasswordModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={closePasswordModal} // Replace with a password change handler
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save Password
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
