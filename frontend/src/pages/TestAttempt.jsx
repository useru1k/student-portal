import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const modulesData = [
  {
    id: 1,
    name: 'Test 1',
    allowedAttempts: 3,
    marks: [80, 70, 90],
    passGrade: '50%',
    numberOfQuestions: 10,
    timeLimit: '1 hour',
  },
  {
    id: 2,
    name: 'Test 2',
    allowedAttempts: 2,
    marks: [85, 60],
    passGrade: '60%',
    numberOfQuestions: 8,
    timeLimit: '45 minutes',
  },
];

const TestAttempt = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const test = modulesData.find((test) => test.id === parseInt(testId));

  // Function to handle the test attempt
  const handleAttempt = (testId) => {
    // Perform necessary actions (e.g., check conditions, start the test)
    // You can navigate to the actual test page here, for example:
    navigate(`/editor/${testId}`);
  };

  return (
    <div className="p-8">
      {test ? (
        <>
          <h1 className="text-3xl font-bold mb-6">{test.name}</h1>
          <div className="space-y-4">
            <p><strong>Allowed Attempts:</strong> {test.allowedAttempts}</p>
            <p><strong>Marks for Each Attempt:</strong> {test.marks.join(', ')}</p>
            <p><strong>Pass Grade:</strong> {test.passGrade}</p>
            <p><strong>Number of Questions:</strong> {test.numberOfQuestions}</p>
            <p><strong>Time Limit:</strong> {test.timeLimit}</p>
          </div>
          <button
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            onClick={() => handleAttempt(test.id)}
          >
            Start Attempt
          </button>
        </>
      ) : (
        <p>Test not found</p>
      )}
    </div>
  );
};

export default TestAttempt;
