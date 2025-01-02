import React, { useState, useEffect } from "react";
import Answer from "../components/Answer";
import Question from "../components/Question";
import Navbar from "../components/Navbar";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { useSelector,useDispatch } from "react-redux";
import { updateCode } from '../redux/codeSlice'
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Editor = () => {
  const [language, setLanguage] = useState("python");
  const [codes, setCodes] = useState(["", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerVisible, setIsAnswerVisible] = useState(false);
  // const dispatch=useDispatch();
  // const codes=useSelector((state)=>state.codes.codes);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();   

  const [tabSwitchCount, setTabSwitchCount] = useState(0);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [popupMessage, setPopupMessage] = useState(null);
  const [timer, setTimer] = useState(0); // Timer state3
  const testId = searchParams.get("testId");
  const handleLanguageChange = (selectedLanguage) => {
    setLanguage(selectedLanguage);
  };
  

  const handleCodeChange = (newCode) => {
    setCodes((prevCodes) => {
      const updatedCodes = [...prevCodes];
      updatedCodes[currentIndex] = newCode;
      return updatedCodes;
    });
    //dispatch(updateCode({index:currentIndex,value:newCode}));
  };
    
  const handleSubmit = () => {
    setTimer(0); // Reset timer when clicking Submit
    const marks = Math.floor(Math.random() * 100);
    const status = marks >= 50 ? "Pass" : "Fail"; // Basic pass/fail logic

    // restartTimer();
    setShowOutput(true); // Example logic to show output on submission

    const submission = {
      marksObtained: marks,
      submissionDate: new Date().toLocaleString(),
      question: "Sample Question",
      answer: "Sample Answer",
      feedback: "Good job!",
      status: status,
    };
   
    const submissions =
      JSON.parse(localStorage.getItem(`submissions_${testId}`)) || [];
    submissions.push(submission);
    localStorage.setItem(`submissions_${testId}`, JSON.stringify(submissions));
    localStorage.removeItem('questionTimers');
    navigate(`/finishattempt?testId=${testId}`);
  };


  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 1000); // Hide the pop-up after 3 seconds
  };

  const goToNextQuestion = () => {
    if (currentIndex < codes.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowOutput(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowOutput(false)
    }
  };

  const toggleAnswerVisibility = () => {
    setIsAnswerVisible(!isAnswerVisible);
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setTabSwitchCount((prevCount) => prevCount + 1);

        if (tabSwitchCount === 0) {
          showPopup("Warning: You switched tabs! Stay on this page for the session.");
        } else if (tabSwitchCount === 1) {
          showPopup("You have switched tabs again. You will be logged out soon.");
        } else if (tabSwitchCount >= 2) {
          showPopup("You have been logged out due to switching tabs multiple times.");
          setIsLoggedOut(true);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [tabSwitchCount]);

  useEffect(() => {
    if (isLoggedOut) {
      const timer = setTimeout(() => {
        handleSubmit();
      }, 5000); // 5 seconds timer

      return () => clearTimeout(timer); // Clear timer on component unmount
    }
  }, [isLoggedOut]); // This effect is only triggered when isLoggedOut changes

  if (isLoggedOut) {
    return <p>You have been logged out due to tab switching.</p>;
  }

  return (
    <>
      <Navbar streakCount={1} className="fixed top-0 left-0 w-full z-10" />
      <div className="flex flex-col md:flex-row min-h-screen   md:space-y-0 md:space-x-2 pt-[4rem] overflow-y-auto scroll-smooth">
        <div 
          className={`w-full rounded-sm ${isAnswerVisible ? "hidden" : ""} md:block md:w-[45%] lg:w-[50%] xl:w-[34%] h-[53vh] md:h-[90vh] flex-shrink-0`}
        >
          <Question
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            onNext={goToNextQuestion}
            onPrevious={goToPreviousQuestion}
            setShowOutput={setShowOutput}
            showOutput={showOutput}
            showPopup={showPopup}
            handleSubmit={handleSubmit}
          />
          <button 
            onClick={toggleAnswerVisibility}
            className="block md:hidden mx-auto mt-4 text-blue-500 text-2xl"
          >
            {isAnswerVisible ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />}
          </button>
        </div>
        {popupMessage && <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-medium text-gray-800">{popupMessage}</p>
      </div>
    </div>}
        <div 
          className={`w-full rounded-sm ${isAnswerVisible ? "" : "hidden"} md:block md:w-[55%] lg:w-[50%] xl:w-[65%] h-[80vh] md:h-[92vh] flex-shrink-0`}
        >
          <Answer
            currentIndex={currentIndex}
            code={codes[currentIndex]}
            onCodeChange={handleCodeChange}
            language={language}
            onLanguageChange={handleLanguageChange}
            setShowOutput={setShowOutput}
            showOutput={showOutput}
            showPopup={showPopup}
            handleSubmit={handleSubmit}
            setTimer={setTimer}
          />
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
