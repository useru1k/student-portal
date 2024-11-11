import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Review = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get('testId');
  const fromEditor = searchParams.get('fromEditor') === 'true';
  const codes=useSelector((state)=>state.codes.codes);
  // Retrieve submissions from localStorage
  const submissions = JSON.parse(localStorage.getItem(`submissions_${testId}`)) || [];

  if (submissions.length === 0) {
    return <div>No submissions found for this test.</div>;
  }

  const submission = submissions[0]; //2 Displaying the first submission for simplicity

  // Handle submit and close the window
  const handleFinalSubmit = () => {
    // Perform any final submission actions here if needed
    window.close();
  };

  // Handle just closing the window
  const handleClose = () => {
    window.close();
  };

  return (
    <div className="review-container">
      <h1 className="text-xl font-semibold mb-4">Test Review</h1>

      {/* Display Question and Answer */}
      <div className="mb-4">
        <h3 className="text-md font-bold">Question:</h3>
        <p>{submission.question || "No question available."}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-bold">Answer:</h3>
        <p>{submission.answer || "No answer provided."}</p>
      </div>

      {/* Conditionally render buttons */}
      {fromEditor ? (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          onClick={handleFinalSubmit}
        >
          Submit and Close
        </button>
      ) : (
        <button
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
          onClick={handleClose}
        >
          Close
        </button>
      )}
    </div>
  );
};

export default Review;
