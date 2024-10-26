import React from 'react';

const staffData = [
  {
    courseId: 1,
    courseName: 'WEB DEVELOPMENT',
    staff: [
      { name: 'Mrs. Dhivya', email: 'dhivyacse@siet.ac.in' },
      { name: 'Mrs. Banu', email: 'banucse@siet.ac.in' },
    ],
  },
  {
    courseId: 2,
    courseName: 'DATA SCIENCE',
    staff: [{ name: 'Mr. Dinakaran', email: 'dinakarancse@siet.ac.in' }],
  },
  {
    courseId: 3,
    courseName: 'CYBER SECURITY',
    staff: [
      { name: 'Mr. Karthiban', email: 'karthibanrcse@siet.ac.in' },
      { name: 'Mr. Yaswanthraj', email: 'yaswanthrajcys@siet.ac.in' },
    ],
  },
];

const SietHome = () => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">In-Charge Staff Details</h2>
      <div className="custom-scroll p-4" style={{ maxHeight: '80vh', overflowY: 'auto', paddingBottom: '40px' }}>
        {/* Increased paddingBottom for more space at the bottom */}
        <div className="space-y-4">
          {staffData.map((course) => (
            <div key={course.courseId} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h3 className="text-lg font-semibold">{course.courseName}</h3>
              <br />
              <div>
                {course.staff.map((member, index) => (
                  <div key={index} className="mb-2">
                    <p><strong>Name:</strong> {member.name}</p>
                    <p>
                      <strong>Email:</strong>
                      <a href={`mailto:${member.email}`} className="text-blue-600">
                        {member.email}
                      </a>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="h-2" /> 
        </div>
      </div>
    </>
  );
};

export default SietHome;
