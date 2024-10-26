import React from 'react';
import webdev from '../assets/img/webdev.png';
import ds from '../assets/img/ds.png';
import cys from '../assets/img/cys.png';

const coursesData = [
  { id: 1, name: 'Web Development', progress: 70, image: webdev },
  { id: 2, name: 'Data Science', progress: 40, image: ds },
  { id: 3, name: 'Cybersecurity', progress: 90, image: cys },
  { id: 3, name: 'Cybersecurity', progress: 90, image: cys },
];

const Profile = () => {
  const student = {
    name: 'BHARATHI A K',
    id: '22CY0008',
    email: 'bharathiak22cys@srishakthi.ac.in',
  };

  return (
    <>
      <h2 className="text-2xl font-bold">PROFILE</h2>
      <div className="custom-scroll p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        {/* Scrollable content */}
        <div className="bg-white p-4 shadow-md rounded-lg mb-6">
          <h3 className="text-lg font-semibold">Student Details</h3>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>ID:</strong> {student.id}</p>
          <p><strong>Email:</strong> {student.email}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Courses</h3>
          <ul className="pl-5">
            {coursesData.map((course) => (
              <li key={course.id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center">
                <img src={course.image} alt={course.name} className="w-16 h-16 object-cover mr-4" />
                <div className="flex-1">
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
    </>
  );
};

export default Profile;
