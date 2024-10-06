import React, { useState } from 'react';
import './assets/css/App.css';

const ExtractPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const questions = [
    {
      id: 1,
      title: "Check Whether the given number is ODD or EVEN",
      inputFormat: "N - integers",
      outputFormat: "String indicating if the given number is odd or even",
      sampleInput: "100",
      sampleOutput: "It is Even Number"
    },
    {
      id: 2,
      title: "Check Prime Number",
      inputFormat: "N - integers",
      outputFormat: "Boolean indicating if the number is prime",
      sampleInput: "5",
      sampleOutput: "True"
    }
    
  ];
  const currentQuestion = questions[currentQuestionIndex]; 
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex justify-between flex-grow p-5 bg-gray-100">
        <div className="flex-grow p-5 box-border border-slate-200 border-2 h-50 w-50">
          <h2 className="text-4xl font-thin mb-6">2024-Placement Programming</h2>
          <div className="flex"> 
            <aside className="bg-slate-100 p-4 w-50 box-border h-36 border-slate-200 border-2 mr-5">
              <p>Question <span className='font-semibold'>{currentQuestion.id}</span></p>
              <p className="mt-3">Not complete</p>
              <p>Marked out of 10.00</p>
            </aside>

            <div className="flex-1 bg-blue-100 p-5">
              <p>{currentQuestion.title}</p>
              <h3 className="font-bold mt-4">Input Format</h3>
              <p>{currentQuestion.inputFormat}</p>
              <h3 className="font-bold mt-4">Output Format</h3>
              <p>{currentQuestion.outputFormat}</p>
              <h3 className="font-bold mt-4">Sample Input</h3>
              <p>{currentQuestion.sampleInput}</p>
              <h3 className="font-bold mt-4">Sample Output</h3>
              <p>{currentQuestion.sampleOutput}</p>

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

                <button className="bg-green-500 text-white p-3 mt-3 rounded-md">Check</button>
              </div>
            </div>
            <div className="ml-5">
              <aside className="bg-slate-100 p-4 w-60 box-border h-36 border-slate-200 border-2">
                <p className="font-bold">Quiz Navigation</p>
                <div className="flex flex-wrap mt-3 space-x-2">
                  {questions.map((question, index) => (
                    <button
                      key={question.id}
                      onClick={() => goToQuestion(index)}
                      className={`p-2 rounded ${index === currentQuestionIndex ? 'bg-gray-400' : 'bg-gray-300'}`}
                    >
                      {question.id}
                    </button>
                  ))}
                </div>
                <button className="text-green-500 mt-3">Finish attempt</button>
              </aside>
            </div>
          </div>

        
          <div className="flex justify-between mt-5">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="bg-gray-500 text-white p-3"
            > 
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestionIndex === questions.length - 1}
              className="bg-green-500 text-white p-3 "
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtractPage;
