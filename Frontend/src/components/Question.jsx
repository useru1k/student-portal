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
    if (timerRef.current) clearInterval(timerRef.current);

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
    <div className="relative drop-shadow-xl w-[400px] h-[535px] overflow-hidden rounded-xl bg-[#3d3c3d] flex items-center justify-center">
      <div className="absolute w-56 h-56 bg-white blur-[50px]"></div>
      <div className="absolute flex flex-col items-center justify-between text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132] w-full pt-3 px-6 pb-2">
        {/* Timer and Score Display */}
        <div className="w-full">
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
          <div className="question-content overflow-y-auto mb-2 h-[350px] w-full text-sm">
            {questions[currentIndex]}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center w-full absolute bottom-0 mb-2">
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
          font-weight: 300;
          font-size: 14px;
          line-height: 1.6;
          overflow-y: auto;
        }

        .question-content::-webkit-scrollbar {
          display: none;
        }

        button {
          transition: all 0.3s ease-in-out;
        }

        button:hover {
          transform: scale(1.1);
        }
      `}</style>
    </div>
  );
};

export default Question;
