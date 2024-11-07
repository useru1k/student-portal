import React, { useState, useRef, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FaPlay, FaSun, FaMoon, FaCode } from "react-icons/fa";
import "../assets/css/Answer.css";

const Answer = ({
  currentIndex,
  code,
  onCodeChange,
  language,
  onLanguageChange,
  questionLanguage,
}) => {
  const [theme, setTheme] = useState("vs-dark");
  const [showOutput, setShowOutput] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("5,10,15");
  const [gotOutput, setGotOutput] = useState(""); 
  const [compilationMessage, setCompilationMessage] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [showDifference, setShowDifference] = useState(false);
  const [highlightedOutput, setHighlightedOutput] = useState([]); 
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState("");
  const [showPrefilledCode, setShowPrefilledCode] = useState(false);

  const languagesArray = [
    { value: "python", label: "Python" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "javascript", label: "JavaScript" },
    { value: "java", label: "Java" },
  ];
  const filteredLanguages =
    questionLanguage === "any"
      ? languagesArray
      : languagesArray.filter((lang) => lang.value === questionLanguage);

  useEffect(() => {
    const storedCode = localStorage.getItem(`code_${currentIndex}`);
    setEditorContent(storedCode || code || "");

    const editorElement = editorRef.current?.container;
    if (editorElement) {
      editorElement.addEventListener("copy", handleCopyPaste);
      editorElement.addEventListener("paste", handleCopyPaste);
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("copy", handleCopyPaste);
        editorElement.removeEventListener("paste", handleCopyPaste);
      }
    };
  }, [currentIndex, code]);

  const handleEditorChange = (newCode) => {
    setEditorContent(newCode);
    onCodeChange(newCode);
    localStorage.setItem(`code_${currentIndex}`, newCode);
  };

  const handleCopyPaste = (event) => {
    event.preventDefault(); 
    alert("Copy-Paste functionality is disabled.");
  };

  useEffect(() => {
    const handleClipboardEvent = (e) => {
      e.preventDefault();
      alert(`Clipboard action (${e.type}) is disabled`);
    };

    document.addEventListener("copy", handleClipboardEvent);
    document.addEventListener("cut", handleClipboardEvent);
    document.addEventListener("paste", handleClipboardEvent);

    return () => {
      document.removeEventListener("copy", handleClipboardEvent);
      document.removeEventListener("cut", handleClipboardEvent);
      document.removeEventListener("paste", handleClipboardEvent);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "c" || e.key === "x" || e.key === "v")
      ) {
        e.preventDefault();
        alert("Clipboard actions (copy, cut, paste) are disabled");
      }
      if (e.key === "Insert" || (e.key === "Delete" && e.shiftKey)) {
        e.preventDefault();
        alert("Alternative clipboard actions are disabled");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const compileCode = async () => {
    setShowDifference(false);
    setShowOutput(true);
    setGotOutput("Compiling...");
    setCompilationMessage("");

    try {
      const response = await fetch("http://localhost:3000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: editorContent, language, customInput }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result = await response.text();
      setGotOutput(result);
    } catch (error) {
      setGotOutput(`Error: ${error.message}`);
      setCompilationMessage(`Compilation failed: ${error.message}`);
    }
  };

  const showDifferences = () => {
    const highlighted = [];
    const expectedOutputArray = expectedOutput.split(",");
    const gotOutputArray = gotOutput.split(",");
    const maxLength = Math.max(expectedOutputArray.length, gotOutputArray.length);

    for (let i = 0; i < maxLength; i++) {
      if (expectedOutputArray[i] !== gotOutputArray[i]) {
        highlighted.push(
          <span key={i} style={{ backgroundColor: "red" }}>
            {gotOutputArray[i] || " "}
          </span>
        );
      } else {
        highlighted.push(<span key={i}>{gotOutputArray[i] || " "}</span>);
      }
    }
    setHighlightedOutput(highlighted);
    setShowDifference((prev) => !prev);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col rounded-lg space-y-4 w-[800px] h-[98%]">
      {/* Top bar with theme toggle, language dropdown, etc. */}
      <div className="top-bar mb-1 flex justify-between items-center">
        <button
          className="toggle-theme bg-gray-700 text-white py-1 px-3 rounded-md flex items-center justify-center mr-2"
          onClick={() => setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"))}
        >
          {theme === "vs-dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        <button
          className="btn-prefill bg-blue-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={() => setShowPrefilledCode((prev) => !prev)}
        >
          <FaCode />
          <span>{showPrefilledCode ? "Hide Prefilled Code" : "Show Prefilled Code"}</span>
        </button>
        <button
          className="btn-run bg-green-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={compileCode}
        >
          <FaPlay />
          <span>Run</span>
        </button>
        <select
          value={language}
          onChange={(e) => onLanguageChange(e.target.value)}
          className="ml-4 bg-white border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-purple-200 text-black"
        >
          {filteredLanguages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

      {/* Editor container */}
      <div className="editor-container flex-grow border border-gray-300 rounded-md shadow-lg h-[50%] overflow-hidden">
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

      {/* Output section */}
      {showOutput && (
        <div className="output-section border border-gray-300 rounded-lg shadow-md bg-gray-800 p-4 h-[40%] overflow-y-auto">
          <table className="w-full table-fixed">
            <thead>
              <tr className="text-gray-300">
                <th className="w-1/2 p-2">Expected Output</th>
                <th className="w-1/2 p-2">Got Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-gray-600">
                  <textarea
                    value={expectedOutput}
                    readOnly
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                  />
                </td>
                <td className="p-2 border border-gray-600">
                  {showDifference ? (
                    <div className="highlighted-output w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none">
                      {highlightedOutput}
                    </div>
                  ) : (
                    <textarea
                      value={gotOutput}
                      readOnly
                      className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                    />
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            className="mt-4 bg-blue-500 text-white py-1 px-2 rounded-md text-sm"
            onClick={showDifferences}
          >
            Show Differences
          </button>
        </div>
      )}
    </div>
  );
};

export default Answer;
