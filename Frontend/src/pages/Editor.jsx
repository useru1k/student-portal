import React, { useState } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";

const Editor = () => {
  const [language, setLanguage] = useState("python"); // Default language
 // const [code, setCode] = useState("// Write your code here..."); // Initial code state

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
      <div className="flex w-full h-screen p-0">
        <div className="h-full p-1">
          <Question />
        </div>
        <div className="w-[70%] flex flex-col p-1">
          <div className="h-[70%] pt-1">
            <Answer
              currentIndex={0}
              language={language}
              onCodeChange={handleCodeChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Editor;
