import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'; // Import arrow icons
import Question1 from './Question1';
import Question2 from './Question2';


const Question = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timers, setTimers] = useState([30, 30]); // Array to store remaining time for each question
  const timerRef = useRef(null); // Reference to the timer interval

  const questions = [<Question1 />, <Question2 />]; // Array of question components

  useEffect(() => {
    // Clear previous timer when switching questions
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Start the timer for the current question
    timerRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        newTimers[currentIndex] = Math.max(newTimers[currentIndex] - 1, 0); // Decrement time, min value 0
        return newTimers;
      });
    }, 1000);

    return () => {
      clearInterval(timerRef.current); // Clear the timer when unmounting or switching questions
    };
  }, [currentIndex]);

  useEffect(() => {
    if (timers[currentIndex] === 0) {
      handleNext(); // Move to the next question when timer reaches 0
    }
  }, [timers[currentIndex]]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="bg-gray-800 w-full max-w-md rounded-lg p-5 flex flex-col justify-between mt-1"> {/* Adjusted width and height */}
        {/* Timer and Score Display */}
        <div>
          <div className="flex justify-between mb-4 items-center">
            {/* Timer Display */}
            <div
              className={`text-white text-sm text-center py-1 px-3 rounded-full ${
                timers[currentIndex] < 10 ? 'bg-red-600' : 'bg-gray-700'
              }`}
            >
              Time Left: {formatTime(timers[currentIndex])}
            </div>
  
            {/* Score Display */}
            <div className="text-white text-sm text-center py-1 px-3 rounded-full bg-gray-700">
              Score: 0.0 / 10
            </div>
          </div>
  
          {/* Render the current question component */}
          <div className="question-content overflow-y-auto mb-4 h-[70%]"> {/* Added height for scrollable area */}
            {questions[currentIndex]}
          </div>
        </div>
  
        {/* Navigation (always displayed for both Question 1 and Question 2) */}
        <div className="mt-4 flex items-center justify-center">
          {/* Previous Arrow */}
          <button
            type="button"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center mr-4"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <FaArrowLeft />
          </button>
  
          {/* Question Navigation */}
          <div className="flex justify-center items-center">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`mx-1 rounded-full w-6 h-6 flex items-center justify-center text-xs font-semibold ${
                  currentIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
  
          {/* Next Arrow */}
          <button
            type="button"
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-500 transition-colors disabled:opacity-50 flex items-center justify-center ml-4"
            onClick={handleNext}
            disabled={currentIndex === questions.length - 1}
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
  
      <style jsx>{`
        .question-content {
          color: white;
          font-weight: 300; /* Thinner font weight */
          font-size: 14px; /* Adjusted base font size */
          line-height: 1.6; /* Added line height for better readability */
          overflow-y: auto; /* Scrollbar when content overflows */
        }
  
        /* Hide scrollbar */
        .question-content::-webkit-scrollbar {
          display: none; /* Hide scrollbar for webkit browsers */
        }
  
        /* Customize different text styles */
        .question-content h1,
        .question-content h2,
        .question-content h3 {
          font-weight: 600; /* Bold titles */
          font-size: 24px; /* Slightly larger for headers */
        }
  
        .question-content p {
          font-weight: 300; /* Thin font for paragraphs */
        }
  
        .question-content ul,
        .question-content ol {
          margin-left: 1.5rem; /* Indented lists */
        }
  
        /* Additional styling for smaller numbered navigation */
        button {
          transition: all 0.3s ease-in-out; /* Smooth transition for hover effects */
        }
  
        button:hover {
          transform: scale(1.1); /* Slight scaling on hover */
        }
      `}</style>
    </div>
  );
};

export default Question;
