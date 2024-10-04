import React from 'react';
import './assets/css//App.css'; // Include the corresponding CSS file

const ExtractPage = () => {
  return (
    <div className="full-page">
      <header className="page-header">
        <h1>2024 - Placement Programming</h1>
      </header>

      <div className="quiz-container">
        <div className="quiz-content">
          

          <div className="question-container">
            <aside className="question-sidebar">
              <p>Question 4</p>
              <p>Not complete</p>
              <p>Marked out of 10.00</p>
              <button>Flag question</button>
            </aside>

            <div className="question-box">
              <p>You are given an array of 0's and 1's in random order. Segregate 0s on the left side and 1s on the right side of the array. Traverse the array only once.</p>
              <h3>Input Format</h3>
              <p>N - size of the array 'N' integers(0 or 1)</p>
              <h3>Constraints</h3>
              <p>First line - N, array length. Next N inputs - array elements (only 0's and 1's)</p>
              <h3>Output Format</h3>
              <p>Input array in left-right arrangement</p>
              <h3>Sample Input 0</h3>
              <p>5</p>
              <p>0 1 2 0 1</p>
              <h3>Sample Output 0</h3>
              <p>Invalid Input</p>

              <div className="answer-section">
                <label htmlFor="answer">Answer:</label>
                <p>(penalty regime: 0%)</p>
                <select id="language" defaultValue="java">
                  <option value="c">c</option>
                  <option value="cpp">cpp</option>
                  <option value="java">java</option>
                  <option value="python3">python3</option>
                </select>
                <textarea rows="5" placeholder="Enter your code here..."></textarea>
                <button>Check</button>
              </div>
            </div>
          </div>
        </div>

        <div className="quiz-navigation">
          <p>Quiz Navigation</p>
          <div className="nav-buttons">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button className="active">4</button>
            <button>5</button>
          </div>
          <button>Finish attempt ...</button>
        </div>
      </div>
    </div>
  );
};

export default ExtractPage;
