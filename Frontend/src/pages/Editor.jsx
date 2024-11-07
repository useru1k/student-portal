import React, { useState, useEffect } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";

const Editor = () => {
  const [language, setLanguage] = useState("python");
  const [codes, setCodes] = useState(["", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  // Handle tab visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prevCount) => prevCount + 1);
        
        if (tabSwitchCount === 0) {
          alert('Warning: You switched tabs! Stay on this page for the session.');
        } else if (tabSwitchCount === 1) {
          alert('You have switched tabs again. You will be logged out soon.');
        } else if (tabSwitchCount >= 2) {
          alert('You have been logged out due to switching tabs multiple times.');
          setIsLoggedOut(true);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [tabSwitchCount]); // Run useEffect when tabSwitchCount changes

  if (isLoggedOut) {
    return <p>You have been logged out due to tab switching.</p>;
  }

  return (
    <>
      {/* Fixed Navbar */}
      <Navbar streakCount={1} className="fixed top-0 left-0 w-full z-10" />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row min-h-screen p-4 space-y-4 md:space-y-0 md:space-x-4 pt-[4rem] overflow-y-auto overflow-x-auto">

        {/* Question component */}
        <div className="w-full rounded-sm md:w-[40%] lg:w-[45%] xl:w-[35%] 2xl:w-[30%]">
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
          />
        </div>

        {/* Answer component */}
        <div className="w-full rounded-sm md:w-[60%] lg:w-[55%] xl:w-[64%] 2xl:w-[70%]">
          <Answer
            currentIndex={currentIndex}
            code={codes[currentIndex]}
            onCodeChange={handleCodeChange}
            language={language}
            onLanguageChange={handleLanguageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Editor;
