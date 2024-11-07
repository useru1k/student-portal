import React, { useState } from 'react';
import { PlusCircleIcon } from 'lucide-react';

const A_TestAttempt = () => {
  const [testName, setTestName] = useState('');
  const [totalMarks, setTotalMarks] = useState(0);
  const [questionTimeLimit, setQuestionTimeLimit] = useState(0);
  const [passGrade, setPassGrade] = useState(0);
  const [allowedAttempts, setAllowedAttempts] = useState(1);
  const [totalTime, setTotalTime] = useState(0);
  const [isTimeLimitEnabled, setIsTimeLimitEnabled] = useState(true);
  const [timePerLimitMinutes, setTimePerLimitMinutes] = useState(0); // Separate state for minutes
  const [submittedDetailsList, setSubmittedDetailsList] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // Track which item is being edited
  const[numQuestions,setNumQuestions]=useState('');
  const [isDateTimeEnabled, setIsDateTimeEnabled] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [isEntryEnabled, setIsEntryEnabled] = useState(false);
  const [quitPassword, setQuitPassword] = useState('');
  const [entryPassword, setEntryPassword] = useState('');
  const [isReviewEnabled, setIsReviewEnabled] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false);

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
        minutes: timePerLimitMinutes,
      },
      isDateTimeEnabled,
      startDate,
      startTime,
      endDate,
      endTime,
      isEntryEnabled,
      quitPassword,
      isReviewEnabled,
      numQuestions,
    };

    if (editIndex !== null) {
      const updatedDetailsList = [...submittedDetailsList];
      updatedDetailsList[editIndex] = newDetails;
      setSubmittedDetailsList(updatedDetailsList);
      setEditIndex(null);
    } else {
      setSubmittedDetailsList((prevList) => [...prevList, newDetails]);
    }

    clearForm();
    setIsFormVisible(false);
  };

  const clearForm = () => {
    setTestName('');
    setTotalMarks(0);
    setQuestionTimeLimit(0);
    setPassGrade(0);
    setAllowedAttempts(1);
    setTotalTime(0);
    setIsTimeLimitEnabled(true);
    setTimePerLimitMinutes(0);
    setIsDateTimeEnabled(false);
    setStartDate('');
    setStartTime('');
    setEndDate('');
    setEndTime('');
    setIsEntryEnabled(false);
    setQuitPassword('');
    setEntryPassword('');
    setIsReviewEnabled(false);
    setNumQuestions('');
  };

  const handleEdit = (index) => {
    const details = submittedDetailsList[index];
    setTestName(details.testName);
    setTotalMarks(details.totalMarks);
    setQuestionTimeLimit(details.questionTimeLimit);
    setPassGrade(details.passGrade);
    setAllowedAttempts(details.allowedAttempts);
    setTotalTime(details.totalTime);
    setIsTimeLimitEnabled(details.isTimeLimitEnabled);
    setTimePerLimitMinutes(details.timePerLimit.minutes);
    setIsDateTimeEnabled(details.isDateTimeEnabled);
    setStartDate(details.startDate);
    setStartTime(details.startTime);
    setEndDate(details.endDate);
    setEndTime(details.endTime);
    setIsEntryEnabled(details.isEntryEnabled);
    setQuitPassword(details.quitPassword);
    setIsReviewEnabled(details.isReviewEnabled);
    setEditIndex(index);
    setNumQuestions(details.numQuestions);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-left text-black">
        TEST
      </h1>
      <PlusCircleIcon 
            className="h-8 w-8 text-indigo-600 cursor-pointer" 
            onClick={() => setIsFormVisible(!isFormVisible)} 
          />
      {isFormVisible && (
    <div className="p-8 max-w-xl mx-auto bg-white shadow-xl rounded-lg overflow-y-auto max-h-[70vh] custom-scroll">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Test Name</label>
          <input 
            type="text" 
            value={testName} 
            onChange={(e) => setTestName(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter test name"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Total Marks</label>
          <input 
            type="text" 
            value={totalMarks} 
            onChange={(e) => setTotalMarks(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter total marks"
            required 
          />
        </div>
        <div>
        <label className="block text-gray-700 font-semibold mb-2">Number of Questions</label>
        <input 
          type="text" 
          value={numQuestions} 
          onChange={(e) => setNumQuestions(e.target.value)} 
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter number of questions"
          required 
        />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Pass Grade</label>
          <input 
            type="text" 
            value={passGrade} 
            onChange={(e) => setPassGrade(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter pass grade"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Allowed Attempts</label>
          <input 
            type="text" 
            value={allowedAttempts} 
            onChange={(e) => setAllowedAttempts(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter allowed attempts"
            required 
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Total Time (hours)</label>
          <input 
            type="text" 
            value={totalTime} 
            onChange={(e) => setTotalTime(e.target.value)} 
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter total time"
            required 
          />
        </div>

        {/* Checkbox to toggle start and end date/time fields */}
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            checked={isDateTimeEnabled} 
            onChange={(e) => setIsDateTimeEnabled(e.target.checked)} 
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Enable Start/End Date & Time</label>
        </div>

        {isDateTimeEnabled && (
          <>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Start Date</label>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Start Time</label>
              <input 
                type="time" 
                value={startTime} 
                onChange={(e) => setStartTime(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">End Date</label>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required 
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">End Time</label>
              <input 
                type="time" 
                value={endTime} 
                onChange={(e) => setEndTime(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required 
              />
            </div>
          </>
        )}

        {/* Checkbox to toggle time limit for questions */}
        <div>
          <div className="flex items-center">
            <input 
              type="checkbox" 
              checked={isTimeLimitEnabled} 
              onChange={(e) => setIsTimeLimitEnabled(e.target.checked)} 
              className="mr-2"
            />
          <label className="block text-gray-700 font-semibold">Enable Time Limit per Question</label>
            
          </div>
          {isTimeLimitEnabled && (
            <div className="mt-4">
              <label className="block text-gray-700 font-medium mb-2">Time Limit (minutes)</label>
              <input 
                type="text" 
                value={questionTimeLimit} 
                onChange={(e) => setQuestionTimeLimit(e.target.value)} 
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition"
                placeholder="Enter time limit"
                required 
              />
            </div>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            checked={isEntryEnabled} 
            onChange={(e) => setIsEntryEnabled(e.target.checked)} 
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Enable Entry Password</label>
        </div>

        {isEntryEnabled && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Entry Password</label>
            <input 
              type="password" 
              value={entryPassword} 
              onChange={(e) => setEntryPassword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter entry password"
            />
          </div>
        )}

        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            checked={isReviewEnabled} 
            onChange={(e) => setIsReviewEnabled(e.target.checked)} 
            className="mr-2"
          />
          <label className="text-gray-700 font-semibold">Enable Quit Password</label>
        </div>

        {isReviewEnabled && (
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Quit Password</label>
            <input 
              type="password" 
              value={quitPassword} 
              onChange={(e) => setQuitPassword(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter quit password"
            />
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {editIndex !== null ? 'Update Test' : 'Add Test'}
        </button>
      </form>

    </div>
      )}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-indigo-800">Submitted Tests</h2>
        <ul className="mt-4 space-y-4">
          {submittedDetailsList.map((details, index) => (
            <li key={index} className="p-4 border border-gray-300 rounded-lg">
              <h3 className="text-xl font-bold">{details.testName}</h3>
              <p>Total Marks: {details.totalMarks}</p>
              <p>Pass Grade: {details.passGrade}</p>
              <p>Allowed Attempts: {details.allowedAttempts}</p>
              <p>Total Time: {details.totalTime} hours</p>
              <button 
                onClick={() => handleEdit(index)}   
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default A_TestAttempt;