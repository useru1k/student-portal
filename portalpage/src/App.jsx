import React, { useState } from 'react';
import './assets/css/App.css'; // Include the corresponding CSS file

const ExtractPage = () => {
  const [questionNumber] = useState(1); // Example question number
  const isOdd = questionNumber % 2 !== 0;
  const oddOrEvenText = isOdd ? 'Odd' : 'Even';

  // State to track the correctness of the answer
  const [isCorrect, setIsCorrect] = useState(null); // null = no answer yet, true = correct, false = incorrect

  const handleCheck = () => {
    // Simulate checking the answer; this should be replaced with actual logic
    const correctAnswer = 'It is Even Number'; // Expected output for comparison
    const userAnswer = document.getElementById('userAnswer').value.trim(); // Get the user input from the textarea

    if (userAnswer === correctAnswer) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between flex-grow p-5 bg-gray-100">
        <div className="flex-grow p-5 box-border border-slate-100 border-2 h-50 w-50">
          <h2 className="text-4xl font-thin mb-6">2024-Placement Programming</h2>
          <div className="flex">
            {/* Question number box with margin-right for space */}
            <aside className="bg-slate-100 p-4 w-50 box-border h-36 border-slate-200 border-2 mr-5">
              <p>Question <span className='font-semibold'>1</span></p>
              <p className="mt-3">Not complete</p>
              <p>Marked out of 10.00</p>
            </aside>

            <div className="flex-1 bg-blue-100 p-5">
              <p>Check Whether the given number is ODD or EVEN</p>
              <h3 className="font-bold mt-4">Input Format</h3>
              <p>N -integers </p>
              <h3 className="font-bold mt-4">Output Format</h3>
              <p>String indicates the given number is odd or even</p>
              <h3 className="font-bold mt-4">Sample Input 0</h3>
              <p>100</p>
              <h3 className="font-bold mt-4">Sample Output 0</h3>
              <p>It is Even Number</p>

              <div className="mt-2">
                <span className='font-semibold'>Language: </span>
                <select id="language" defaultValue="c" className="mt-3 p-2 w-[10%] border rounded">
                  <option value="c">c</option>
                  <option value="cpp">cpp</option>
                  <option value="java">java</option>
                  <option value="python3">python3</option>
                </select>
                <textarea
                  id="userAnswer"
                  rows="10"
                  placeholder="Enter your code here..."
                  className="mt-3 p-3 w-full border rounded"
                ></textarea>
                <button
                  onClick={handleCheck}
                  className="bg-green-500 text-white p-3 mt-3 rounded-md"
                >
                  Check
                </button>
              </div>

              {/* Result Box */}
              {isCorrect !== null && (
                <div
                  className={`mt-5 p-4 text-white font-bold ${
                    isCorrect ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {isCorrect ? 'Passed all tests!' : 'Failed some tests!'}
                </div>
              )}
            </div>

            {/* Medium-Sized Test Case Section */}
            <div className="ml-5">
              <aside className="bg-slate-100 p-4 w-60 box-border h-36 border-slate-200 border-2">
                <p className="font-bold">Quiz Navigation</p>
                <div className="flex flex-wrap mt-3 space-x-2">
                  <button className="bg-gray-300 p-2 rounded">1</button>
                  <button className="bg-gray-300 p-2 rounded">2</button>
                </div>
                <button className="text-green-500 mt-3">Finish attempt</button>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractPage;
