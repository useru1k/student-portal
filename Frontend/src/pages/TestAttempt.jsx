import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const modulesData = [
  {
    id: 1,
    name: 'Test 1',
    allowedAttempts: 30,
    passGrade: '50%',
    numberOfQuestions: 10,
    timeLimit: '1 hour',
  },
  {
    id: 2,
    name: 'Test 2',
    allowedAttempts: 100,
    passGrade: '60%',
    numberOfQuestions: 8,
    timeLimit: '45 minutes',
  },
];

const TestAttempt = () => {
  const { testId } = useParams();
  const test = modulesData.find((test) => test.id === parseInt(testId, 10));
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    // Load submissions for the specific testId only
    const savedSubmissions = JSON.parse(localStorage.getItem(`submissions_${testId}`)) || [];
    setSubmissions(savedSubmissions);
  }, [testId]);

  const handleAttempt = () => {
    // Open the editor page with the testId as a query parameter in a new window
    window.open(`/editor?testId=${testId}`, '_blank', 'width=800,height=600');
  };

  if (!test) {
    return <p>Test not found</p>; // Show message if the test doesn't exist
  }

  return (
    <div className="h-screen flex flex-col p-8">
      <div className="overflow-y-auto custom-scroll flex-1 p-4 space-y-6">
        <h1 className="text-3xl font-bold mb-6">{test.name}</h1>
        <div className="space-y-4">
          <p><strong>Allowed Attempts:</strong> {test.allowedAttempts}</p>
          <p><strong>Pass Grade:</strong> {test.passGrade}</p>
          <p><strong>Number of Questions:</strong> {test.numberOfQuestions}</p>
          <p><strong>Time Limit:</strong> {test.timeLimit}</p>
          <p><strong>Number of Attempts:</strong> {submissions.length}</p>
        </div>

        {/* Show Start Attempt button only if attempts are below the allowed limit */}
        {submissions.length < test.allowedAttempts && (
          <button
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            onClick={handleAttempt}
          >
            Start Attempt
          </button>
        )}

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Submission Details</h2>
          {submissions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300">Attempt</th>
                    <th className="py-2 px-4 border-b border-gray-300">Marks Obtained</th>
                    <th className="py-2 px-4 border-b border-gray-300">Submission Date</th>
                    <th className="py-2 px-4 border-b border-gray-300">Grade</th>
                    <th className="py-2 px-4 border-b border-gray-300">Review</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((submission, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-300 text-center">{index + 1}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center">{submission.marksObtained}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center">{submission.submissionDate}</td>
                      <td className="py-2 px-4 border-b border-gray-300 text-center">{submission.status}</td>

                      {/* Dynamic Review Link */}
                      <td className="py-2 px-4 border-b border-gray-300 text-center">
                        <a
                          href={`/review?testId=${testId}&attemptIndex=${index}`}
                          className="text-blue-500 underline"
                        >
                          Review
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No submissions yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestAttempt;
