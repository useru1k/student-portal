import React, { useState, useEffect } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";

const Editor = () => {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("// Write your code here...");
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

  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    console.log("Selected language:", selectedLanguage);
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  return (
    <>
      <Navbar
        language={language}
        streakCount={1} // Example streak count
        onLanguageChange={handleLanguageChange}
      />
      <div className="flex w-full h-screen p-0 mt-16">
        <div className="h-full p-1">
          <Question />
        </div>
        <div className="w-[70%] flex flex-col p-1">
          <div className="h-[40%] pt-1">
            <Answer
              currentIndex={0}
              language={language}
              code={code}
              onCodeChange={handleCodeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
