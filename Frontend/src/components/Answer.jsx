import React, { useState, useRef, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import {
  FaPlay,
  FaSun,
  FaMoon,
  FaCode,
  FaPaperPlane,
  FaCheckCircle,
} from "react-icons/fa";
import "../assets/css/Answer.css";
import { useDispatch, useSelector } from "react-redux";
import { setCodes, updateCode, updateOutput } from "../redux/codeSlice";
import { CircleChevronDown } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const OutputIcon = () => {
  return <FaCheckCircle style={{ color: "green", marginLeft: "5px" }} />;
};

const Answer = ({
  currentIndex,
  code,
  onCodeChange,
  language,
  onLanguageChange,
  questionLanguage,
  setShowOutput,
  showOutput,
  restartTimer,
}) => {
  const dispatch = useDispatch();
  const codes = useSelector((state) => state.codes.codes);
  const [theme, setTheme] = useState("vs-dark");
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("5,10,15");
  const [outputs, setOutputs] = useState([]);
  const [compilationMessage, setCompilationMessage] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [showDifference, setShowDifference] = useState(false);
  const [highlightedOutput, setHighlightedOutput] = useState([]);
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [showPrefilledCode, setShowPrefilledCode] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const prefilledCode = `//your prefilled code example here
  console.log('hello world')`;
  const languagesArray = [
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
  ];
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const testId = searchParams.get("testId");
  const filteredLanguages =
    questionLanguage === "any"
      ? languagesArray
      : languagesArray.filter((lang) => lang.value === questionLanguage);

  

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1); // Increment timer every second
    }, 1000);

    return () => clearInterval(interval); // Clear interval on unmount
  }, []);

  useEffect(() => {
    const storedCode =
      codes[currentIndex]?.code || localStorage.getItem(`code_${currentIndex}`);
    setEditorContent(storedCode || code || "");

    const editorElement = editorRef.current?.container;
    if (editorElement) {
      editorElement.addEventListener("copy", handleCopyPaste);
      editorElement.addEventListener("paste", handleCopyPaste);
      editorElement.addEventListener("contextmenu", disableRightClick);
      editorElement.addEventListener("dragstart", disableDragDrop);
      editorElement.addEventListener("dragover", disableDragDrop);
      editorElement.addEventListener("drop", disableDragDrop);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("copy", handleCopyPaste);
        editorElement.removeEventListener("paste", handleCopyPaste);
        editorElement.removeEventListener("contextmenu", disableRightClick);
        editorElement.removeEventListener("dragstart", disableDragDrop);
        editorElement.removeEventListener("dragover", disableDragDrop);
        editorElement.removeEventListener("drop", disableDragDrop);
      }
    };
  }, [currentIndex, code]);

  const handleEditorChange = (newCode) => {
    setEditorContent(newCode);
    onCodeChange(newCode);
    localStorage.setItem(`code_${currentIndex}`, newCode);
    dispatch(
      updateCode({
        index: currentIndex,
        code: newCode,
        output: codes[currentIndex]?.output || "",
      })
    );
  };

  const disableRightClick = (event) => {
    event.preventDefault();
    alert("Right-click is disabled.");
  };

  const disableDragDrop = (event) => {
    event.preventDefault();
    alert("Drag-and-drop functionality is disabled.");
  };

  const handleCopyPaste = (event) => {
    event.preventDefault();
    alert("Copy-Paste functionality is disabled.");
  };

  const compileCode = async () => {
    const blacklistedWords = ["function", "while"]; // blackword declartion
    const whitelistedWords = ["print", "sum"]; // whiteword declaration
  
    // Function to check if a blacklisted word is inside a print statement
    const isBlackwordInPrintStatement = (content, blackWord) => {
      const regex = new RegExp(
        `(?:console\\.log|print|printf|System\\.out\\.println)\\s*\\(.*?\\b${blackWord}\\b.*?\\)`,
        "g"
      );
      return regex.test(content);
    };
  
    // Check for blacklisted words not in print statements
    const hasBlacklistedWordsOutsidePrint = blacklistedWords.some((blackWord) => {
      const isInsidePrint = isBlackwordInPrintStatement(editorContent, blackWord);
      return editorContent.includes(blackWord) && !isInsidePrint;
    });
  
    // Check for presence of whitelisted words
    const hasWhitelistedWords = whitelistedWords.some((whiteWord) =>
      editorContent.includes(whiteWord)
    );
  
    if (hasBlacklistedWordsOutsidePrint) {
      alert(`Error: Code contains prohibited blacklisted words {${blacklistedWords.join(", ")}}`);
      return;
    }
    
  
    if (!hasWhitelistedWords) {
      alert("Error: Code does not contain any required whitelisted words.");
      return;
    }
  
    // If validation passes, proceed with compilation
    setShowDifference(false);
    setShowOutput(true);
    dispatch(updateOutput({ index: currentIndex, output: "Compiling..." }));
    setCompilationMessage("");
    const inputToSend = customInput ? customInput : input;
  
    try {
      const response = await fetch("http://localhost:3000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: editorContent,
          language,
          input: inputToSend,
        }),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result = await response.text();
      dispatch(updateOutput({ index: currentIndex, output: result }));
    } catch (error) {
      dispatch(updateOutput({ index: currentIndex, output: error.message }));
      setCompilationMessage(`Compilation failed: ${error.message}`);
    }
  };
  
  const handleSubmit = () => {
    setTimer(0); // Reset timer when clicking Submit
    const marks = Math.floor(Math.random() * 100);
    const status = marks >= 50 ? "Pass" : "Fail"; // Basic pass/fail logic

    restartTimer();
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

    navigate(`/review?testId=${testId}`);
  };

  const showDifferences = () => {
    if (!showDifference) {
      const highlighted = [];
      const gotOutput = codes[currentIndex]?.output || "";
      const maxLength = Math.max(expectedOutput.length, gotOutput.length);

      for (let i = 0; i < maxLength; i++) {
        if (expectedOutput[i] !== gotOutput[i]) {
          highlighted.push(
            <span key={i} style={{ backgroundColor: "yellow", color: "black" }}>
              {gotOutput[i] || " "}
            </span>
          );
        } else {
          highlighted.push(<span key={i}>{gotOutput[i] || " "}</span>);
        }
      }
      setHighlightedOutput(highlighted);
    }
    setShowDifference(!showDifference);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col rounded-lg space-y-4 h-full lg:h-[98%]">
      {/* Top bar with theme toggle, language dropdown, etc. */}
      <div className="top-bar mb-1 flex flex-wrap gap-2 justify-between items-center">
        <button
          className="toggle-theme bg-gray-700 text-white py-1 px-3 rounded-md flex items-center justify-center"
          onClick={() =>
            setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"))
          }
        >
          {theme === "vs-dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        <button
          className="btn-prefill bg-blue-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={() => setShowPrefilledCode((prev) => !prev)}
        >
          <FaCode />
          <span>
            {showPrefilledCode ? "Hide Prefilled Code" : "Show Prefilled Code"}
          </span>
        </button>
        <button
          className="btn-run bg-green-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={compileCode}
        >
          <FaPlay />
          <span>Run</span>
        </button>
        <button
          className="btn-submit bg-blue-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={handleSubmit}
        >
          <FaPaperPlane />
          <span>Submit</span>
        </button>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="ml-4 bg-white border border-gray-300 rounded-md py-1 px-2 sm:py-2 sm:px-4 focus:outline-none focus:ring focus:ring-purple-200 text-black text-xs sm:text-sm"
        >
          <option value="python">Python</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
        </select>
      </div>
      {showPrefilledCode && (
        <div className="prefilled-code-section border border-gray-300 rounded-md p-2 bg-gray-900 text-white">
          <pre
            className="whitespace-pre-wrap

border border-gray-300 p-2

bg-gray-800 text-white"
          >
            {prefilledCode}
          </pre>
        </div>
      )}
      {/* Editor container */}
      <div className="editor-container flex-grow border border-gray-300 rounded-md shadow-lg h-[50%] overflow-hidden sm:h-[400px]">
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage={language}
          theme={theme}
          value={editorContent}
          onChange={handleEditorChange}
          options={{
            lineNumbers: "on",
            tabSize: 2,
            wordWrap: "on",
            automaticLayout: true,
            readOnly: false,
            contextmenu: false,
          }}
          ref={editorRef}
        />
      </div>
      {showPrefilledCode && (
        <div className="prefilled-code-section border border-gray-300 rounded-md p-2 bg-gray-900 text-white">
          <pre
            className="whitespace-pre-wrap

border border-gray-300 p-2

bg-gray-800 text-white"
          >
            {prefilledCode}
          </pre>
        </div>
      )}
      {/* Output section */}
      {showOutput && (
        <div className="output-section border border-gray-300 rounded-lg shadow-md bg-gray-800 p-4 h-[40%] sm:h-[300px] overflow-y-auto">
          <div className="flex flex-roe justify-end items-end">
            <button
              className="btn-output-toggle py-1 px-2 rounded-md flex justify-end items-end space-x-1 text-sm"
              onClick={() => setShowOutput((prev) => !prev)}
            >
              <CircleChevronDown />
            </button>
          </div>

          <table className="w-full table-fixed">
            <thead>
              <tr className="text-gray-300">
                <th className="w-1/3 p-2">Input</th>
                <th className="w-1/3 p-2">Expected Output</th>
                <th className="w-1/3 p-2">Got Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-600">
                  <textarea
                    value={"10"}
                    readOnly
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                    style={{ display: "flex", height: "80px", width: "100%" }}
                  />
                </td>
                <td className="p-2 border border-gray-600">
                  <textarea
                    value={expectedOutput}
                    readOnly
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                    style={{ display: "flex", height: "80px", width: "100%" }}
                  />
                </td>
                <td className="p-2 border border-gray-600">
                  {showDifference ? (
                    <div
                      className="highlighted-output w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                      style={{
                        position: "sticky",
                        height: "80px",
                        width: "100%",
                        overflowY: "auto",
                      }}
                    >
                      {highlightedOutput}
                    </div>
                  ) : (
                    <textarea
                      value={codes[currentIndex]?.output}
                      readOnly
                      className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                      style={{ display: "flex", height: "80px", width: "100%" }}
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-2 mt-4">
            <button
              className="toggle-difference bg-gray-700 text-white py-1 px-4 rounded-md"
              onClick={showDifferences}
            >
              {showDifference ? "Hide Differences" : "Show Differences"}
            </button>
            <button
              className="toggle-input bg-gray-700 text-white py-1 px-4 rounded-md"
              onClick={() => setUseCustomInput((prev) => !prev)}
              onBlur={() => setCustomInput("")}
            >
              {useCustomInput ? "Hide Custom Input" : "Custom Input"}
            </button>
          </div>
          {useCustomInput && (
            <textarea
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="Enter custom input..."
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md mt-4"
            />
          )}
        </div>
      )}
    </div>

  );
};

export default Answer;
