import React, { useEffect, useRef, useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Question1 from './Question1';
import Question2 from './Question2';

const Question = ({ currentIndex, setCurrentIndex, onNext, onPrevious, restartSignal ,showPopup,handleSubmit}) => {
  const initialTimers = [60, 60];
  const [timers, setTimers] = useState(() => {
    const savedTimers = JSON.parse(localStorage.getItem('questionTimers'));
    return savedTimers || initialTimers;
  });
  const [availableQuestions, setAvailableQuestions] = useState([0, 1]);
  const timerRef = useRef(null);

  const questions = [<Question1 key={0} />, <Question2 key={1} />];

  useEffect(() => {
    const savedIndex = JSON.parse(localStorage.getItem('currentIndex'));
    const savedAvailableQuestions = JSON.parse(localStorage.getItem('availableQuestions'));

    if (savedAvailableQuestions) {
      setAvailableQuestions(savedAvailableQuestions);
    }

    if (savedIndex !== null && savedAvailableQuestions?.includes(savedIndex)) {
      setCurrentIndex(savedIndex);
    } else if (savedAvailableQuestions?.length > 0) {
      setCurrentIndex(savedAvailableQuestions[0]);
    }
  }, [setCurrentIndex]);

  useEffect(() => {
    if (restartSignal) {
      clearInterval(timerRef.current);
      setTimers(initialTimers);
      localStorage.removeItem('questionTimers');
      localStorage.removeItem('currentIndex');
      localStorage.removeItem('availableQuestions');
      setAvailableQuestions([0, 1]);
    }
  }, [restartSignal]);

  useEffect(() => {
    localStorage.setItem('currentIndex', JSON.stringify(currentIndex));
    localStorage.setItem('availableQuestions', JSON.stringify(availableQuestions));
  }, [currentIndex, availableQuestions]);

  useEffect(() => {
    localStorage.setItem('questionTimers', JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimers((prevTimers) => {
        const newTimers = [...prevTimers];
        if (availableQuestions.includes(currentIndex)) {
          newTimers[currentIndex] = Math.max(newTimers[currentIndex] - 1, 0);
        }
        return newTimers;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, availableQuestions]);

  useEffect(() => {

    const allTimersZero = timers.every((time) => time === 0);

    if (allTimersZero) {
      showPopup('All questions have expired! Submitting now...');
      handleSubmit(); // Call the submit function to handle the final submission
      localStorage.removeItem('questionTimers');
      window.close(); // Optionally close the window after submission
    }
    const expiredQuestions = timers
      .map((time, index) => (time === 0 ? index : null))
      .filter((index) => index !== null);

    const remainingQuestions = availableQuestions.filter(
      (index) => !expiredQuestions.includes(index)
    );

    if (availableQuestions.length !== remainingQuestions.length) {
      setAvailableQuestions(remainingQuestions);

      if (!remainingQuestions.includes(currentIndex) && remainingQuestions.length > 0) {
        setCurrentIndex(remainingQuestions[0]);
      }
    }

    if (remainingQuestions.length === 0) {
      showPopup('All questions have expired!');
      localStorage.removeItem('questionTimers');
      window.close();
    }
  }, [timers, availableQuestions, currentIndex, setCurrentIndex, handleSubmit, showPopup]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const navigateToQuestion = (index) => {
    if (availableQuestions.includes(index)) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="relative  w-full h-[90vh] overflow-hidden  bg-gradient-to-r from-[#2b2e33] to-[#1c1e22] flex flex-col items-start justify-start font-inter mx-1">
    <div
  className="absolute flex flex-col justify-start text-white z-[1] rounded-md inset-0.5 
  bg-[#282c34] bg-opacity-80 backdrop-blur-md w-full h-full overflow-y-auto pt-3 px-4 pb-12 sm:px-6 
  [&::-webkit-scrollbar]:w-2 
   [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:rounded-full 
  [&::-webkit-scrollbar-track]:bg-gray-800 
  [&::-webkit-scrollbar-thumb]:rounded-full 
  [&::-webkit-scrollbar-thumb]:bg-gray-600"
>
        <div className="w-full">
          <div className="flex justify-between mb-4 items-start">
            <div
              className={`text-white text-xs md:text-sm text-left py-1 px-3 rounded-full ${
                timers[currentIndex] < 10 ? 'bg-red-600' : 'bg-blue-600 bg-opacity-80 shadow-sm'
              }`}
            >
              Time Left: {formatTime(timers[currentIndex])}
            </div>
            <div className="text-white text-xs md:text-sm text-left py-1 px-3 rounded-full bg-blue-600 bg-opacity-80 shadow-sm">
              Score: 0.0 / 10
            </div>
          </div>

          <div className="mb-2 w-full text-xs md:text-sm leading-relaxed text-left">
            {questions[currentIndex]}
          </div>
        </div>
      </div>

      <div className="absolute bottom-2 flex items-center justify-center w-full z-10 space-x-2 md:space-x-4">
        <button
          type="button"
          className="bg-blue-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-md shadow-md hover:bg-blue-400 transition-transform transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
          onClick={onPrevious}
          disabled={availableQuestions.indexOf(currentIndex) === 0}
        >
          <FaArrowLeft />
        </button>

        <div className="flex justify-start items-start space-x-1">
          {availableQuestions.map((index) => (
            <button
              key={index}
              className={`rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs font-semibold ${
                currentIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-600 text-gray-300'
              } transition-transform transform hover:scale-110`}
              onClick={() => navigateToQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="bg-blue-500 text-white py-1 px-3 md:py-2 md:px-4 rounded-md shadow-md hover:bg-blue-400 transition-transform transform hover:scale-105 disabled:opacity-50 flex items-center justify-center"
          onClick={onNext}
          disabled={availableQuestions.indexOf(currentIndex) === availableQuestions.length - 1}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Question;
