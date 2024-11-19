import React from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Review = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId");
  const fromEditor = searchParams.get("fromEditor") === "true";
  const dispatch = useDispatch();
  const codes = useSelector((state) => state.codes.codes);
  const submissions = JSON.parse(localStorage.getItem(`submissions_${testId}`)) || [];

  if (submissions.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium text-gray-600">
          No submissions found for this test.
        </p>
      </div>
    );
  }

  const submission = submissions[0];

  const handleFinalSubmit = () => {
    window.close();
  };

  const handleClose = () => {
    window.close();
  };

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
                {submission.question || "No question available."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">Answer:</h3>
              <p className="mt-2 text-gray-600">
                {submission.answer || "No answer provided."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-700">
                Submitted Codes and Outputs:
              </h3>
              {codes.length === 0 ? (
                <p className="mt-2 text-gray-600">No codes available.</p>
              ) : (
                codes.map((codeItem, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 p-4 rounded-md shadow-sm my-4"
                  >
                    <h4 className="text-md font-medium text-gray-800">
                      Code {index + 1}:
                    </h4>
                    <pre
                      className="bg-gray-200 p-2 rounded text-sm text-gray-700 mt-2"
                      style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                    >
                      {codeItem.code}
                    </pre>
                    <h5 className="text-md font-medium text-gray-800 mt-4">
                      Output:
                    </h5>
                    <pre
                      className="bg-gray-300 p-2 rounded text-sm text-gray-700 mt-2"
                      style={{ wordWrap: "break-word", whiteSpace: "pre-wrap" }}
                    >
                      {codeItem.output}
                    </pre>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-8 flex justify-center pb-4">
            {fromEditor ? (
              <button
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200"
                onClick={handleFinalSubmit}
              >
                Submit and Close
              </button>
            ) : (
              <button
                className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition duration-200"
                onClick={handleClose}
              >
                Close
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;