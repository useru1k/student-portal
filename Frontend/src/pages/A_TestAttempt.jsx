import React, { useState } from 'react';

const A_TestAttempt = () => {
  const [testName, setTestName] = useState('');
  const [totalMarks, setTotalMarks] = useState(0);
  const [questionTimeLimit, setQuestionTimeLimit] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [allowedAttempts, setAllowedAttempts] = useState(1);
  const [totalTime, setTotalTime] = useState(0);
  const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(true);
  const [timePerLimitHours, setTimePerLimitHours] = useState(0);
  const [timePerLimitMinutes, setTimePerLimitMinutes] = useState(0);
  const [gradeScale, setGradeScale] = useState('percentage');
  const [submittedDetailsList, setSubmittedDetailsList] = useState([]);
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [editIndex, setEditIndex] = useState(-1); // State to track which index is being edited

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDetails = {
      testName,
      totalMarks,
      questionTimeLimit,
      passGrade,
      allowedAttempts,
      totalTime,
      isTimeLimitEnabled,
      timePerLimit: {
        hours: timePerLimitHours,
        minutes: timePerLimitMinutes,
      },
      isDateTimeEnabled,
      startDate,
      startTime,
      endDate,
      endTime,
      gradeScale,
    };

    if (editIndex >= 0) {
      // Update existing detail
      setSubmittedDetailsList((prevList) => {
        const updatedList = [...prevList];
        updatedList[editIndex] = newDetails; // Replace the edited detail
        return updatedList;
      });
    } else {
      // Add new submission
      setSubmittedDetailsList((prevList) => [...prevList, newDetails]);
    }

    // Clear form fields after submission
    resetForm();
  };

  const resetForm = () => {
    setTestName('');
    setTotalMarks(0);
    setQuestionTimeLimit(0);
    setPassGrade(0);
    setAllowedAttempts(1);
    setTotalTime(0);
    setIsTimeLimitEnabled(true);
    setTimePerLimitHours(0);
    setTimePerLimitMinutes(0);
    setGradeScale('percentage');
    setIsDateTimeEnabled(false);
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setEditIndex(-1); // Reset edit index
  };

  const handleEdit = (index) => {
    const detailsToEdit = submittedDetailsList[index];
    setTestName(detailsToEdit.testName);
    setTotalMarks(detailsToEdit.totalMarks);
    setQuestionTimeLimit(detailsToEdit.questionTimeLimit);
    setPassGrade(detailsToEdit.passGrade);
    setAllowedAttempts(detailsToEdit.allowedAttempts);
    setTotalTime(detailsToEdit.totalTime);
    setIsTimeLimitEnabled(detailsToEdit.isTimeLimitEnabled);
    setTimePerLimitMinutes(detailsToEdit.timePerLimit.minutes);
    setIsDateTimeEnabled(detailsToEdit.isDateTimeEnabled);
    setStartDate(detailsToEdit.startDate);
    setStartTime(detailsToEdit.startTime);
    setEndDate(detailsToEdit.endDate);
    setEndTime(detailsToEdit.endTime);
    setEditIndex(index); // Set the index being edited
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-y-auto max-h-[80vh] custom-scroll">
      <h1 className="text-3xl font-bold mb-6 text-center text-indigo-800">
        Create/Edit Test Attempt
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Form fields remain the same */}
        {/* ... Your form fields ... */}

        <div>
          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition duration-200"
          >
            {editIndex >= 0 ? 'Update Test Attempt' : 'Test Attempt'}
          </button>
        </div>
      </form>

      {/* Display submitted details */}
      {submittedDetailsList.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Submitted Details</h2>
          {submittedDetailsList.map((details, index) => (
            <div key={index} className="border border-gray-300 p-4 mb-4 rounded-lg">
              <h3 className="text-lg font-semibold">Test Attempt {index + 1}</h3>
              <p><strong>Test Name:</strong> {details.testName}</p>
              <p><strong>Total Marks:</strong> {details.totalMarks}</p>
              <p><strong>Pass Grade:</strong> {details.passGrade}</p>
              <p><strong>Allowed Attempts:</strong> {details.allowedAttempts}</p>
              <p><strong>Total Time:</strong> {details.totalTime} minutes</p>
              <p><strong>Time Limit Enabled:</strong> {details.isTimeLimitEnabled ? 'Yes' : 'No'}</p>
              {details.isTimeLimitEnabled && (
                <p><strong>Time Limit Per Question:</strong> {details.timePerLimit.minutes} minutes</p>
              )}

              {/* Display Start and End Date/Time if enabled */}
              {details.isDateTimeEnabled && (
                <>
                  <p><strong>Start Date:</strong> {details.startDate}</p>
                  <p><strong>Start Time:</strong> {details.startTime}</p>
                  <p><strong>End Date:</strong> {details.endDate}</p>
                  <p><strong>End Time:</strong> {details.endTime}</p>
                </>
              )}

              {/* Edit button */}
              <button
                onClick={() => handleEdit(index)}
                className="mt-2 bg-blue-600 text-white font-semibold py-1 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default A_TestAttempt;
