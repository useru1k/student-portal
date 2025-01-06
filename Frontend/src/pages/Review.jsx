import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Review = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId");

  const submissions = JSON.parse(localStorage.getItem(`submissions_${testId}`)) || [];
  const questionsCode = JSON.parse(localStorage.getItem('questionsCode')) || {};

  const handleClose = () => {
    window.close(); 
  };
  
  if (submissions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">
          No submissions found for this test.
        </p>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-center text-gray-800">
                Test Review
              </h1>
              <h3 className="text-lg font-semibold text-gray-700">Question:</h3>
              <p className="mt-2 text-gray-600">
                {submissions[0]?.question || "No question available."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Last Submitted Code and Output:
              </h3>
              {Object.keys(questionsCode).length === 0 ? (
                <p className="mt-2 text-gray-600">No codes available.</p>
              ) : (
                Object.keys(questionsCode).map((questionKey) => {
                  const lastCodeItem = questionsCode[questionKey].at(-1); // Get the last item
                  return (
                    <div
                      key={questionKey}
                      className="bg-gray-100 p-4 rounded-md shadow-sm my-4"
                    >
                      <h4 className="text-md font-medium text-gray-800">
                        Question {Number(questionKey) + 1}:
                        Code
                      </h4>
                      {lastCodeItem ? (
                        <>
                          <pre
                            className="bg-gray-200 p-2 rounded text-sm text-gray-700 mt-2"
                            style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                          >
                            {lastCodeItem.code}
                          </pre>
                          <h5 className="text-md font-medium text-gray-800 mt-4">
                            Output:
                          </h5>
                          <pre
                            className="bg-gray-300 p-2 rounded text-sm text-gray-700 mt-2"
                            style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                          >
                            {lastCodeItem.output}
                          </pre>
                        </>
                      ) : (
                        <p className="mt-2 text-gray-600">No code available.</p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center pb-4">
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
              onClick={handleClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
