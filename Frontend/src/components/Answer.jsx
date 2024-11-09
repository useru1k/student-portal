import React, { useState, useRef, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FaPlay, FaSun, FaMoon, FaCode, FaPaperPlane } from "react-icons/fa";
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
  const prefilledCode=`//your prefilled code example here
  console.log('hello world')`
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

  useEffect(() => {
    const handleClipboardEvent = (e) => {
      e.preventDefault();
      alert(`Clipboard action (${e.type}) is disabled`);
    };

    document.addEventListener("copy", handleClipboardEvent);
    document.addEventListener("cut", handleClipboardEvent);
    document.addEventListener("paste", handleClipboardEvent);
    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("dragstart", disableDragDrop);
    document.addEventListener("dragover", disableDragDrop);
    document.addEventListener("drop", disableDragDrop);

    return () => {
      document.removeEventListener("copy", handleClipboardEvent);
      document.removeEventListener("cut", handleClipboardEvent);
      document.removeEventListener("paste", handleClipboardEvent);
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("dragstart", disableDragDrop);
      document.removeEventListener("dragover", disableDragDrop);
      document.removeEventListener("drop", disableDragDrop);
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

  const handleSubmit = () => {
    // Implement submission logic here
    alert("Submitted Successfully");
  };

  const showDifferences = () => {
    const highlighted = [];
    const expectedOutputArray = expectedOutput.split(",");
    const gotOutputArray = gotOutput.split(",");
    const maxLength = Math.max(
      expectedOutputArray.length,
      gotOutputArray.length
    );

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
                    <div className="highlighted-output w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md">
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
