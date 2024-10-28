import React, { useState, useEffect, useRef } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Answer from './Answer';
import Question1 from './Question1';
import Question2 from './Question2';


const Question = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timers, setTimers] = useState([30, 30]);
  const timerRef = useRef(null);
  const [codes, setCodes] = useState(["", ""]);
  const questions = [<Question1 />, <Question2 />];

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        newTimers[currentIndex] = Math.max(newTimers[currentIndex] - 1, 0);
        return newTimers;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  useEffect(() => {
    if (timers[currentIndex] === 0) handleNext();
  }, [timers[currentIndex]]);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative p-4 md:w-[450px] md:h-[98%] overflow-hidden rounded-xl bg-gradient-to-r from-[#2b2e33] to-[#1c1e22] flex flex-col items-center justify-between font-inter" style={{ fontFamily: 'Inter, sans-serif' }}>

    <div className="absolute flex flex-col items-center justify-between text-white z-[1] rounded-xl inset-0.5 bg-[#282c34] bg-opacity-80 backdrop-blur-md w-full h-full overflow-y-auto pt-3 px-4 sm:px-6 pb-12">
      
      <div className="w-full">
        <div className="flex justify-between mb-4 items-center">
          <div
            className={`text-white text-xs md:text-sm text-center py-1 px-3 rounded-full ${timers[currentIndex] < 10 ? 'bg-red-600' : 'bg-blue-600 bg-opacity-80 shadow-sm'}`}
          >
            Time Left: {formatTime(timers[currentIndex])}
          </div>
          <div className="text-white text-xs md:text-sm text-center py-1 px-3 rounded-full bg-blue-600 bg-opacity-80 shadow-sm">
            Score: 0.0 / 10
          </div>
        </div>
  
        <div className="question-content mb-2 w-full text-xs md:text-sm leading-relaxed">
          {questions[currentIndex]}
        </div>
      </div>
    </div>
  
    <div className="absolute bottom-2 flex items-center justify-center w-full z-10 space-x-2 md:space-x-4">
      <button
        type="button"
        className="bg-blue-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-md shadow-md hover:bg-blue-400 transition-transform transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
        onClick={handlePrevious}
        disabled={currentIndex === 0}
      >
        <FaArrowLeft />
      </button>
  
      <div className="flex justify-center items-center space-x-1">
        {questions.map((_, index) => (
          <button
            key={index}
            className={`rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs font-semibold ${
              currentIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
            } transition-transform transform hover:scale-110`}
            onClick={() => setCurrentIndex(index)}
          >
            {index + 1}
          </button>
        ))}
      </div>
  
      <button
        type="button"
        className="bg-blue-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-md shadow-md hover:bg-blue-400 transition-transform transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
        onClick={handleNext}
        disabled={currentIndex === questions.length - 1}
      >
        <FaArrowRight />
      </button>
    </div>
  </div>
  
  );
};

export default Question;
