import React, { useState, useRef, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FaPlay, FaSun, FaMoon, FaCode } from "react-icons/fa";
import "../assets/css/Answer.css";

const Answer = ({ currentIndex, code, onCodeChange, language, onLanguageChange, questionLanguage }) => {
  const [theme, setTheme] = useState("vs-dark");
  const [showOutput, setShowOutput] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("5,10,15");
  const [gotOutput, setGotOutput] = useState("");
  const [compilationMessage, setCompilationMessage] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [showDifference, setShowDifference] = useState(false);
  const [differenceOutput, setDifferenceOutput] = useState("");
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
  const filteredLanguages = questionLanguage === "any" ? languagesArray : languagesArray.filter(lang => lang.value === questionLanguage);

  useEffect(() => {
    const storedCode = localStorage.getItem(`code_${currentIndex}`);
    setEditorContent(storedCode || code || "");
  }, [currentIndex, code]);

  const handleEditorChange = (newCode) => {
    setEditorContent(newCode);
    onCodeChange(newCode);
    localStorage.setItem(`code_${currentIndex}`, newCode);
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
        (e.key === 'c' || e.key === 'x' || e.key === 'v')
      ) {
        e.preventDefault();
        alert("Clipboard actions (copy, cut, paste) are disabled");
      }
      if (e.key === 'Insert' || (e.key === 'Delete' && e.shiftKey)) {
        e.preventDefault();
        alert("Alternative clipboard actions are disabled");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C, () => {
      alert("Copy is disabled");
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_X, () => {
      alert("Cut is disabled");
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V, () => {
      alert("Paste is disabled");
    });

    editor.onContextMenu((e) => {
      e.preventDefault();
      alert("Right-click context menu is disabled");
    });

    const editorContainer = editor.getDomNode().parentElement;
    editorContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      alert("Drag-and-drop is disabled");
    });
    editorContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      alert("Drag-and-drop is disabled");
    });

    editor.updateOptions({ contextmenu: false });
  };

  const compileCode = async () => {
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
    let diffHTML = "";
    const maxLength = Math.max(expectedOutput.length, gotOutput.length);

    for (let i = 0; i < maxLength; i++) {
      if (expectedOutput[i] !== gotOutput[i]) {
        diffHTML += `<span style="background-color: yellow">${gotOutput[i] || " "}</span>`;
      } else {
        diffHTML += gotOutput[i] || " ";
      }
    }

    setDifferenceOutput(diffHTML);
    setShowDifference(true);
  };

  return (
    <div
      className="container mx-auto p-4 flex flex-col rounded-lg space-y-4 w-[800px] h-[98%]"
      onContextMenu={(e) => {
        e.preventDefault();
        alert("Right-click disabled");
      }}
    >
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
          <span>{showPrefilledCode ? 'Hide Prefilled Code' : 'Show Prefilled Code'}</span>
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

      {showPrefilledCode && (
        <div className="prefilled-code-section border border-gray-300 rounded-md p-2 bg-gray-900 text-white">
          <h2 className="text-lg font-bold mb-2">Prefilled Code</h2>
          <pre className="whitespace-pre-wrap border border-gray-300 p-2 bg-gray-800 text-white">
            console.log('Hello, World!');
          </pre>
        </div>
      )}

      {/* Editor container */}
      <div className="editor-container flex-grow border border-gray-300 rounded-md shadow-lg h-[50%] overflow-hidden">
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage={language}
          theme={theme}
          value={editorContent}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          options={{
            lineNumbers: "on",
            tabSize: 2,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output section */}
      {showOutput && (
        <div className="output-section border border-gray-300 rounded-lg shadow-md bg-gray-800 p-4 h-[40%] overflow-y-auto">
          <div className="controls flex items-center space-x-2">
            <label className="flex items-center text-white">
              <input
                type="checkbox"
                checked={useCustomInput}
                onChange={() => setUseCustomInput(!useCustomInput)}
                className="mr-2"
              />
              Use Custom Input
            </label>
          </div>

          <table className="w-full table-fixed">
            <thead>
              <tr className="text-gray-300">
                {useCustomInput && <th className="w-1/3 p-2">Custom Input</th>}
                <th className="w-1/3 p-2">Expected Output</th>
                <th className="w-1/3 p-2">Got Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {useCustomInput && (
                  <td className="p-2 border border-gray-600">
                    <input
                      type="text"
                      value={customInput}
                      onChange={(e) => setCustomInput(e.target.value)}
                      className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md"
                    />
                  </td>
                )}
                <td className="p-2 border border-gray-600">
                  <textarea
                    value={expectedOutput}
                    readOnly
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                  />
                </td>
                <td className="p-2 border border-gray-600">
                  <textarea
                    value={gotOutput}
                    readOnly
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <button
            onClick={showDifferences}
            className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-md"
          >
            Show Difference
          </button>

          {showDifference && (
            <div
              className="mt-2 p-2 border border-red-500 bg-gray-700 text-white rounded-md"
              dangerouslySetInnerHTML={{ __html: differenceOutput }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Answer;
