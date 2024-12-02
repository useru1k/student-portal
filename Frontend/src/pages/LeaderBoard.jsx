import React, { useState } from 'react';

const leaderboardData = [
  { rank: 1, id: 1, name: 'Yuvan Krishna', score: 95, streak: 5, department: 'Computer Science', studentId: 'CS001', year: '1st Year' },
  { rank: 2, id: 2, name: 'Nivash', score: 90, streak: 3, department: 'Mechanical', studentId: 'ME002', year: '2nd Year' },
  { rank: 3, id: 3, name: 'Ajay Kumar', score: 65, streak: 4, department: 'Computer Secience(CS)', studentId: 'CYS008', year: '2nd Year' },
  { rank: 4, id: 4, name: 'Bharathi', score: 85, streak: 7, department: 'EEE', studentId: 'EE003', year: '3rd Year' },
  { rank: 5, id: 5, name: 'Deepika', score: 80, streak: 2, department: 'Civil', studentId: 'CE004', year: '4th Year' },
  { rank: 6, id: 6, name: 'Chandhiya', score: 65, streak: 4, department: 'AIML', studentId: 'ML006', year: '3rd Year' },
  { rank: 7, id: 7, name: 'Abinaya', score: 75, streak: 4, department: 'ECE', studentId: 'ECE005', year: '1st Year' },
  { rank: 8, id: 8, name: 'Yazhini', score: 70, streak: 1, department: 'Bio-Medical', studentId: 'BME006', year: '2nd Year' },
  { rank: 9, id: 9, name: 'Sowbarnika', score: 65, streak: 4, department: 'Bio-Technology', studentId: 'BT007', year: '3rd Year' },
  { rank: 10, id: 10, name: 'Madhu', score: 65, streak: 4, department: 'AIML', studentId: 'ML007', year: '3rd Year' },
  { rank: 11, id: 11, name: 'Nivetha', score: 65, streak: 4, department: 'Information Technology', studentId: 'IT010', year: '3rd Year' },
  { rank: 12, id: 12, name: 'Hari', score: 65, streak: 4, department: 'AIDS', studentId: 'DS007', year: '2nd Year' },
  { rank: 13, id: 13, name: 'Deepa', score: 65, streak: 4, department: 'Agricultural Engineering', studentId: 'AE007', year: '3rd Year' },
  { rank: 14, id: 14, name: 'Sam Britto', score: 65, streak: 4, department: 'Computer Secience(CS)', studentId: 'CYS007', year: '2nd Year' },
  { rank: 15, id: 15, name: 'Sree Aswath', score: 65, streak: 4, department: 'Information Technology', studentId: 'IT007', year: '2nd Year' },
  { rank: 16, id: 16, name: 'Subashini', score: 65, streak: 4, department: 'ECE(VLSI)', studentId: 'VLSI007', year: '3rd Year' },
  { rank: 17, id: 17, name: 'Harshini', score: 65, streak: 4, department: 'Food Technology', studentId: 'FT007', year: '4th Year' },
];

const departments = ['All Departments', ...new Set(leaderboardData.map(student => student.department))];
const years = ['All Years', '1st Year', '2nd Year', '3rd Year', '4th Year'];

const A_Leaderboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [selectedYear, setSelectedYear] = useState('All Years');

  // Calculate stats for admin summary
  const totalParticipants = leaderboardData.length;
  const averageScore =
    leaderboardData.reduce((sum, student) => sum + student.score, 0) / totalParticipants;
  const topPerformer = leaderboardData[0]?.name || 'N/A';

  // Filter participants based on search term, selected department, and selected year
  const filteredParticipants = leaderboardData.filter((student) => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All Departments' || student.department === selectedDept;
    const matchesYear = selectedYear === 'All Years' || student.year === selectedYear;
    return matchesSearch && matchesDept && matchesYear;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50">
      <div className="p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Leaderboard</h1>

        {/* Scrollable Content Section */}
        <div className="overflow-y-auto max-h-[calc(100vh-200px)] custom-scroll">
          {/* Admin Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-blue-500 text-white rounded-lg shadow-lg p-4">
              <h3 className="text-xs font-medium uppercase">Total Participants</h3>
              <p className="text-xl font-bold">{totalParticipants}</p>
            </div>
            <div className="bg-green-500 text-white rounded-lg shadow-lg p-4">
              <h3 className="text-xs font-medium uppercase">Average Score</h3>
              <p className="text-xl font-bold">{averageScore.toFixed(1)}</p>
            </div>
            <div className="bg-purple-500 text-white rounded-lg shadow-lg p-4">
              <h3 className="text-xs font-medium uppercase">Top Performer</h3>
              <p className="text-xl font-bold">{topPerformer}</p>
            </div>
          </div>

          {/* Search Bar and Filters Section */}
          <div className="flex items-center space-x-3 mb-6">
            <input
              type="text"
              placeholder="Search by Name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-1/3 p-2 rounded-lg shadow-lg border border-gray-300 text-sm"
            />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="w-full md:w-1/3 p-2 rounded-lg shadow-lg border border-gray-300 text-sm"
            >
              {departments.map((dept, index) => (
                <option key={index} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full md:w-1/3 p-2 rounded-lg shadow-lg border border-gray-300 text-sm"
            >
              {years.map((year, index) => (
                <option key={index} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Leaderboard Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-blue-100">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Rank</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Department</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Year</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Score</th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-gray-700 uppercase">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredParticipants.map((student) => (
                  <tr key={student.id}>
                    <td className="px-4 py-2">{student.rank}</td>
                    <td className="px-4 py-2">{student.name}</td>
                    <td className="px-4 py-2">{student.studentId}</td>
                    <td className="px-4 py-2">{student.department}</td>
                    <td className="px-4 py-2">{student.year}</td>
                    <td className="px-4 py-2">{student.score}</td>
                    <td className="px-4 py-2">{student.streak}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default A_Leaderboard;
