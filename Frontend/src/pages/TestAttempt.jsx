import React from 'react';
import { useParams } from 'react-router-dom';

const modulesData = [
  {
    id: 1,
    name: 'Test 1',
    allowedAttempts: 3,
    passGrade: '50%',
    numberOfQuestions: 10,
    timeLimit: '1 hour',
    noOfAttempts:2,
    marksObtained:'40,70',
  },
  {
    id: 2,
    name: 'Test 2',
    allowedAttempts: 2,
    passGrade: '60%',
    numberOfQuestions: 8,
    timeLimit: '45 minutes',
    noOfAttempts:2,
    marksObtained:'40,70',
  },
];

const TestAttempt = () => {
  const { testId } = useParams();
  const test = modulesData.find((test) => test.id === parseInt(testId));

  const handleAttempt = () => {
    // Open the editor in a new window
    window.open('/editor', '_blank', 'width=800,height=600');
  };

  return (
    <div className="p-8">
      {test ? (
        <>
          <h1 className="text-3xl font-bold mb-6">{test.name}</h1>
          <div className="space-y-4">
            <p><strong>Allowed Attempts:</strong> {test.allowedAttempts}</p>
            <p><strong>Pass Grade:</strong> {test.passGrade}</p>
            <p><strong>Number of Questions:</strong> {test.numberOfQuestions}</p>
            <p><strong>Time Limit:</strong> {test.timeLimit}</p>
            <p><strong>Number of Attempts:</strong> {test.noOfAttempts}</p>
            <p><strong>Marks Obtained:</strong> {test.marksObtained}</p>
          </div>
          <button
            className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600"
            onClick={handleAttempt}
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
