import React, { useState } from 'react';
import './assets/css/App.css'; // Include the corresponding CSS file

const ExtractPage = () => {
  const [questionNumber] = useState(1); // Example question number
  const isOdd = questionNumber % 2 !== 0;
  const oddOrEvenText = isOdd ? 'Odd' : 'Even';

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between flex-grow p-5 bg-gray-100">
        <div className="flex-grow bg-white p-5 rounded-md">
          <h2 className="text-2xl font-bold mb-5">2024 Placement Programming</h2>
          <div className="flex">
            <aside className="bg-white p-4 w-48 rounded-md shadow-md mr-5">
              <p className="font-bold">Question</p>
              <p className="mt-3">Not complete</p>
              <p>Marked out of 10.00</p>
            </aside>

            <div className="flex-1 bg-blue-100 p-5 rounded-md">
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
                <label htmlFor="answer" className="block font-bold">Answer:</label>
                <select id="language" defaultValue="java" className="mt-3 p-2 w-[10%] border rounded">
                  <option value="c">c</option>
                  <option value="cpp">cpp</option>
                  <option value="java">java</option>
                  <option value="python3">python3</option>
                </select>
                <textarea rows="10" placeholder="Enter your code here..." className="mt-3 p-3 w-full border rounded"></textarea>
                <button className="bg-green-500 text-white p-3 mt-3 rounded-md">Check</button>
              </div>
            </div>

            {/* Medium-Sized Test Case Section */}
            <div className="ml-5"> 
              <aside className="bg-white p-4 w-60 rounded-md shadow-md">
                <p className="font-bold">Quiz Navigation</p>
                <div className="flex flex-wrap mt-3 space-x-2">
                  <button className="bg-gray-300 p-2 rounded">1</button>
                  <button className="bg-gray-300 p-2 rounded">2</button>
                </div>
                <button className="text-green-500 mt-3 w-full bg-gray-100 p-2 rounded-md">Finish attempt ...</button>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractPage;
