import React, { useState } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

const Editor = () => {
  const [language, setLanguage] = useState("python");
  const [codes, setCodes] = useState(["", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };

  const handleCodeChange = (newCode) => {
    setCodes((prevCodes) => {
      const updatedCodes = [...prevCodes];
      updatedCodes[currentIndex] = newCode;
      return updatedCodes;
    });
  };

  const goToNextQuestion = () => {
    if (currentIndex < codes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar streakCount={1} className="fixed top-0 left-0 w-full z-10" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row min-h-screen p-4 space-y-4 md:space-y-0 md:space-x-4 pt-[4rem] overflow-y-auto scroll-smooth">
        
        {/* Question component */}
        <div 
          className={`w-full rounded-sm ${isAnswerVisible ? "hidden" : ""} md:block md:w-[45%] lg:w-[50%] xl:w-[34%] h-[50vh] md:h-[90vh] flex-shrink-0`}
        >
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
          />

          {/* Toggle button for Answer at the bottom of the Question component */}
          <button 
            onClick={toggleAnswerVisibility}
            className="block md:hidden mx-auto mt-4 text-blue-500 text-2xl"
          >
            {isAnswerVisible ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </button>
        </div>

        {/* Answer component */}
        <div 
          className={`w-full rounded-sm ${isAnswerVisible ? "" : "hidden"} md:block md:w-[55%] lg:w-[50%] xl:w-[65%] h-[80vh] md:h-[90vh] flex-shrink-0`}
        >
          <Answer
            currentIndex={currentIndex}
            code={codes[currentIndex]}
            onCodeChange={handleCodeChange}
            language={language}
            onLanguageChange={handleLanguageChange}
          />

          {/* Toggle button for Question at the bottom of the Answer component */}
          <button 
            onClick={toggleAnswerVisibility}
            className="block md:hidden mx-auto mt-4 text-blue-500 text-2xl"
          >
            {isAnswerVisible ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </button>
        </div>
      </div>
    </>
  );
};

export default Editor;
