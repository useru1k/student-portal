import React, { useState, useEffect,useRef } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { MdOutlineArrowUpward, MdOutlineArrowDownward } from "react-icons/md";
import { FaPlay, FaSun, FaMoon } from "react-icons/fa";
import "../assets/css/Answer.css";

const Answer = ({ currentIndex, language, code, onCodeChange }) => {
  const [theme, setTheme] = useState("vs-dark");
  const [TextCode, setCode] = useState('// Write your code here...');
  const [showOutput, setShowOutput] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("5,10,15");
  const [gotOutput, setGotOutput] = useState("");
  const [compilationMessage, setCompilationMessage] = useState("");
  const previousCode = useRef('');
  let textareaCode=TextCode;
  const [previousCodetextarea,setPreviousCodetextarea]=useState(TextCode);
  const handleOnChange = (value) => {
    const filteredValue = value.replace(/[\s\t\[\]{}()<>.,;:'"\\#@!$%^&*+=~`/]/g, '');
    console.log('Filtered code:', filteredValue);
    console.log('Previous code:', previousCode.current);

    let lengthDifference = filteredValue.length - previousCode.current.length;
    console.log(lengthDifference);
    
    if (lengthDifference > 3 && lengthDifference !== 0) {
      alert("You pasted a code");
      setCode(previousCodetextarea); 
      setPreviousCodetextarea(value)
      console.log("Setting code to previousCodetextarea:", previousCodetextarea);
    } else {
      setPreviousCodetextarea(TextCode);
      console.log("Setting code to current value:", value);
     textareaCode=value;
     setCode(value);
    }
    console.log("Code in textarea:",textareaCode);
    
    previousCode.current = filteredValue;
  };


  const compileCode = async () => {
    setShowOutput(true);
    setGotOutput("");
    setCompilationMessage("");

    try {
      const response = await fetch("http://localhost:3000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result_1 = await response.text();
      console.log(result_1)
      document.getElementById("hee").innerText = result_1;
    } catch (error) {
      setCompilationMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="top-bar mb-4 flex justify-between items-center">
        <button
          className="toggle-theme bg-gray-700 text-white py-1 px-3 rounded-md flex items-center justify-center"
          onClick={() =>
            setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"))
          }
        >
          {theme === "vs-dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

      </div>

      <div className="editor-container mb-4 border border-gray-300 rounded-md shadow-lg">
        <MonacoEditor
          height="400px"
          width="100%"
          defaultLanguage={language}
          theme={theme}
          // value={code}
          // onChange={(value) => onCodeChange(value || "")} 
          value={TextCode}
          onChange={handleOnChange} 
          options={{
            lineNumbers: "on",
            tabSize: 2,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>

      <div className="controls mb-6 flex space-x-2">
        <button
          className="btn-run bg-green-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={compileCode}
        >
          <FaPlay />
          <span>Run</span>
        </button>
      </div>

      {showOutput && (
        <div className="output-section mt-4">
          <h3>Output:</h3>
          <pre id="hee"></pre>
          <p>{compilationMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Answer;
