import React, { useState, useEffect } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";

const Editor = () => {
  const [language, setLanguage] = useState("python"); 
  const [codes, setCodes] = useState(["", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const questionLanguage='any';//db value foe language

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    console.log("Selected language:", selectedLanguage);
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
      <div className="flex-1 w-full flex flex-row min-h-screen pt-[4rem]">
        <div className="flex-grow p-1">
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
          />
        </div>
        <div className="flex-1 w-full flex flex-col p-1">
          <div className="flex-grow pt-1">
            <Answer
              currentIndex={currentIndex}
              code={codes[currentIndex]}
              onCodeChange={handleCodeChange}
              language={language}
              onLanguageChange={handleLanguageChange}
              questionLanguage={questionLanguage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
