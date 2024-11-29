import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Activity, CheckCircle, FileText, AlertTriangle } from 'lucide-react';

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
    const savedSubmissions = JSON.parse(localStorage.getItem(`submissions_${testId}`)) || [];
    setSubmissions(savedSubmissions);
  }, [testId]);

  const handleAttempt = () => {
    window.open(`/editor?testId=${testId}`, '_blank', 'width=800,height=600');
  };

  if (!test) {
    return (
      <div className="flex items-center justify-center min-h-screen rounded-sm bg-gray-50 p-4">
        <div className="text-center space-y-4">
          <AlertTriangle className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-yellow-500" />
          <p className="text-lg sm:text-xl font-semibold text-gray-700">Test not found</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
  const lowerCaseStatus = status?.toLowerCase();
  switch (lowerCaseStatus) {
    case 'passed':
      return 'bg-green-100 text-green-800';
    case 'failed':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};


  return (
    <div className=" bg-gray-100 overflow-y-auto rounded-sm">
      {/* Main Content Container */}
      <div className="bg-gray-100 container mx-auto p-2 sm:p-4 md:p-6 max-w-7xl">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm mb-4 sm:mb-6">
          <div className="p-3 sm:p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 break-words">{test.name}</h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600">
              Attempt {submissions.length} of {test.allowedAttempts}
            </p>
          </div>

          {/* Test Information Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 p-2 sm:p-6">
            <div className="bg-blue-50 rounded-lg p-2 sm:p-4 flex items-center space-x-2 sm:space-x-3">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Time Limit</p>
                <p className="text-xs sm:text-base font-semibold text-gray-900">{test.timeLimit}</p>
              </div>
            </div>
            
            <div className="bg-green-50 rounded-lg p-2 sm:p-4 flex items-center space-x-2 sm:space-x-3">
              <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pass Grade</p>
                <p className="text-xs sm:text-base font-semibold text-gray-900">{test.passGrade}</p>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-2 sm:p-4 flex items-center space-x-2 sm:space-x-3">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-purple-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Questions</p>
                <p className="text-xs sm:text-base font-semibold text-gray-900">{test.numberOfQuestions}</p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-2 sm:p-4 flex items-center space-x-2 sm:space-x-3">
              <Activity className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Attempts Left</p>
                <p className="text-xs sm:text-base font-semibold text-gray-900">
                  {test.allowedAttempts - submissions.length}
                </p>
              </div>
            </div>
          </div>

          {/* Start Attempt Button */}
          {submissions.length < test.allowedAttempts && (
            <div className="px-2 sm:px-6 pb-3 sm:pb-6">
              <button
                onClick={handleAttempt}
                className="w-full sm:w-auto px-4 py-2.5 sm:px-6 sm:py-3 bg-blue-600 text-white text-sm sm:text-base font-medium rounded-lg 
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:ring-offset-2 transition-colors duration-200"
              >
                Start New Attempt
              </button>
            </div>
          )}
        </div>

        {/* Submissions Card */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-3 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Submission History</h2>
            {submissions.length > 0 ? (
              <div className="-mx-3 sm:-mx-6">
                <div className="overflow-x-auto">
                  {/* Mobile View */}
                  <div className="sm:hidden space-y-3">
                    {submissions.map((submission, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-900">Attempt {index + 1}</span>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Score: {submission.marksObtained}</span>
                          <span>{submission.submissionDate}</span>
                        </div>
                        <button
                            onClick={() =>
                            window.open(`/review?testId=${testId}&attemptIndex=${index}`, '_blank', 'width=' + window.screen.width + ',height=' + window.screen.height + ',top=0,left=0,fullscreen=yes')
                            }
                            className="text-white font-medium bg-green-600 hover:bg-green-700 rounded-md px-4 py-2"
                            >
                              Review
                            </button>
                      </div>
                    ))}
                  </div>

                  {/* Desktop View */}
                  <div className="hidden sm:block">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Attempt
                          </th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Score
                          </th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {submissions.map((submission, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-3 sm:px-6 py-3 text-sm text-gray-900">Attempt {index + 1}</td>
                            <td className="px-3 sm:px-6 py-3 text-sm text-gray-500">{submission.marksObtained}</td>
                            <td className="px-3 sm:px-6 py-3 text-sm text-gray-500">{submission.submissionDate}</td>
                            <td className="px-3 sm:px-6 py-3 text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                                {submission.status}
                              </span>
                            </td>
                            <td className="px-3 sm:px-6 py-3 text-sm">
                            <button
                            onClick={() =>
                            window.open(`/review?testId=${testId}&attemptIndex=${index}`, '_blank', 'width=' + window.screen.width + ',height=' + window.screen.height + ',top=0,left=0,fullscreen=yes')
                            }
                            className="text-white font-medium bg-green-600 hover:bg-green-700 rounded-md px-4 py-2"
                            >
                              Review
                            </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No submissions yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestAttempt;
