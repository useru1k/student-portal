import React from 'react';

const leaderboardData = [
  { id: 1, name: 'Yuvan Krishna', score: 95, streak: 5 },
  { id: 2, name: 'Nivash', score: 90, streak: 3 },
  { id: 3, name: 'Bharathi', score: 85, streak: 7 },
  { id: 4, name: 'Deepika', score: 80, streak: 2 },
  { id: 5, name: 'Abinaya', score: 75, streak: 4 },
  { id: 6, name: 'Yazhini', score: 70, streak: 1 },
  { id: 7, name: 'Sowbarnika', score: 65, streak: 4 },
];

const Leaderboard = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-4 font-semibold">Rank</th>
              <th className="text-left py-2 px-4 font-semibold">Name</th>
              <th className="text-left py-2 px-4 font-semibold">Score</th>
              <th className="text-left py-2 px-4 font-semibold">Daily Streak</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((student, index) => (
              <tr key={student.id} className="border-b">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{student.name}</td>
                <td className="py-2 px-4">{student.score}</td>
                <td className="py-2 px-4">{student.streak} days</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
