import React, { useState, useEffect, useRef } from 'react';
import Question1 from './Question1';
import Question2 from './Question2';

const Question = () => {
  // State to track current question index and timers for each question
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timers, setTimers] = useState([30, 30]); // Array to store remaining time for each question
  const timerRef = useRef(null); // Reference to the timer interval
  const questionContainerRef = useRef(null); // Reference to the question container for scrolling

  const questions = [<Question1 />, <Question2 />]; // Array of question components

  // Start the countdown timer when the component loads or when the question changes
  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current); // Clear previous timer when switching questions
    }

    // Start a new interval for the current question countdown
    timerRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        newTimers[currentIndex] = Math.max(newTimers[currentIndex] - 1, 0); // Decrement time, min value 0
        return newTimers;
      });
    }, 1000); // Decrement every second

    // Scroll to the top of the question container
    if (questionContainerRef.current) {
      questionContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Cleanup the timer on unmount or when changing questions
    return () => {
      clearInterval(timerRef.current);
    };
  }, [currentIndex]);

  // Automatically move to the next question when time runs out
  useEffect(() => {
    if (timers[currentIndex] === 0) {
      handleNext(); // Move to the next question when timer reaches 0
    }
  }, [timers[currentIndex]]); // Watch the current question's timer

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      clearInterval(timerRef.current); // Stop the timer when moving to the next question
      setCurrentIndex(currentIndex + 1); // Move to the next question
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      clearInterval(timerRef.current); // Stop the timer when moving to the previous question
      setCurrentIndex(currentIndex - 1); // Move to the previous question
    }
  };

  // Function to format time in mm:ss
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="bg-[#555] h-full rounded-lg p-5 overflow-y-auto mt-5" ref={questionContainerRef}>
        {/* Flex container for timer and score indicator */}
        <div className="flex justify-between mb-2 items-center">
          {/* Timer Display */}
          <div
            className={`text-white text-sm text-center py-1 px-2 rounded-full ${
              timers[currentIndex] < 10 ? 'bg-red-600' : 'bg-gray-800'
            }`}
            style={{ marginBottom: '20px', animation: 'fade 0.5s' }} // Added margin and fade animation
          >
            Time Left: {formatTime(timers[currentIndex])} {/* Display the countdown timer */}
          </div>

          {/* Score Display with same design as timer */}
          <div
            className="text-white text-sm text-center py-1 px-2 rounded-full bg-gray-800"
            style={{ marginBottom: '20px' }} // Added margin
          >
            Score: 0.0 / 10
          </div>
        </div>

        {/* Render the current question component */}
        <div className="text-white text-base font-normal"> {/* Changed font styles here */}
          {questions[currentIndex]}
        </div>

        <br />

        {/* Navigation Buttons */}
        <div className="flex flex-row justify-between">
          <div className="mt-auto flex justify-start">
            <button
              type="button"
              className="bg-blue-600 text-white p-2 rounded-md"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              Previous
            </button>
          </div>
          <div className="mt-auto flex justify-end">
            <button
              type="button"
              className="bg-blue-600 text-white p-2 w-20 rounded-md"
              onClick={handleNext}
              disabled={currentIndex === questions.length - 1}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade {
          from {
            opacity: 0.5;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Question;
