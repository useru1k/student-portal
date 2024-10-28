import React, { useState } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";

const Editor = () => {
  const [language, setLanguage] = useState("python"); 
  const [codes, setCodes] = useState(["", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex);
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    console.log("Selected language:",selectedLanguage);
  };

  const handleCodeChange = (newCode) => {
    setCodes((prevCodes) => {
      const updatedCodes = [...prevCodes];
      updatedCodes[currentIndex] = newCode;
      return updatedCodes;
    });
  };

  return (
    <>
      <Navbar
        streakCount={1} // Example streak count
        
      />
       <div className="flex-1 w-full flex  flex-row min-h-screen">
        <div className="flex-grow p-1">
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
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
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
