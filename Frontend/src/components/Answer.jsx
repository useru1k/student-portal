import React, { useState, useRef, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FaPlay, FaSun, FaMoon } from "react-icons/fa";
import "../assets/css/Answer.css";
const Answer = ({ currentIndex, language, onCodeChange }) => {
  const [theme, setTheme] = useState("vs-dark");
  const [showOutput, setShowOutput] = useState(false); // To track if output should be shown
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("5,10,15");
  const [gotOutput, setGotOutput] = useState("");
  const [compilationMessage, setCompilationMessage] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false); // State for custom input checkbox
  const [code, setCode] = useState(""); // State for the editor's code
  const editorRef = useRef(null);

  // Disable clipboard actions (copy, cut, paste)
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

  // Disable keyboard shortcuts for clipboard actions
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

  // Disable drag-and-drop and context menu in the Monaco Editor
  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;

    // Disable cut, copy, and paste in the editor
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_C, () => {
      alert("Copy is disabled");
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_X, () => {
      alert("Cut is disabled");
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_V, () => {
      alert("Paste is disabled");
    });

    // Disable right-click context menu
    editor.onContextMenu((e) => {
      e.preventDefault();
      alert("Right-click context menu is disabled");
    });

    // Disable drag-and-drop in the editor
    const editorContainer = editor.getDomNode().parentElement;
    editorContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      alert("Drag-and-drop is disabled");
    });
    editorContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      alert("Drag-and-drop is disabled");
    });

    editor.updateOptions({ contextmenu: false }); // Disable context menu option
  };

  // Compilation function
  const compileCode = async () => {
    setShowOutput(true); // Show the output panel when compiling
    setGotOutput("Compiling..."); // Show a message indicating compilation is in progress
    setCompilationMessage("");

    try {
      const response = await fetch("http://localhost:3000/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, customInput }), // Send customInput if checked
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result = await response.text();
      setGotOutput(result); // Set the result in Got Output field
    } catch (error) {
      setGotOutput(`Error:${error}`); // Show error in Got Output
      setCompilationMessage(`Compilation failed: ${error.message}`); // Show compilation message
    }
  };

  return (
    <div
      className="container mx-auto p-4 flex flex-col space-y-4 h-[90vh]"
      onContextMenu={(e) => {
        e.preventDefault();
        alert("Right-click disabled");
      }} // Disable right-click globally
    >
      {/* Top bar with Theme and Run button */}
      <div className="top-bar mb-2 flex justify-between items-center">
        <button
          className="toggle-theme bg-gray-700 text-white py-1 px-3 rounded-md flex items-center justify-center mr-2"
          onClick={() =>
            setTheme((prev) => (prev === "vs-dark" ? "light" : "vs-dark"))
          }
        >
          {theme === "vs-dark" ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        <button
          className="btn-run bg-green-500 text-white py-1 px-2 rounded-md flex items-center space-x-1 text-sm"
          onClick={compileCode}
        >
          <FaPlay />
          <span>Run</span>
        </button>
      </div>

      {/* Monaco Editor */}
      <div className="editor-container flex-grow border border-gray-300 rounded-md shadow-lg h-[60%] overflow-hidden">
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage={language}
          theme={theme}
          value={code}
          onChange={(newCode) => setCode(newCode)} // Update the code on change
          onMount={handleEditorDidMount}
          options={{
            lineNumbers: "on",
            tabSize: 2,
            wordWrap: "on",
            automaticLayout: true,
          }}
        />
      </div>

      {/* Output Section */}
      {showOutput && (
        <div className="output-section border border-gray-300 rounded-lg shadow-md bg-gray-800 p-4 h-[40%] overflow-y-auto">
          <div className="controls mb-4 flex items-center space-x-2">
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
                {useCustomInput && (
                  <th className="w-1/3 p-2">Custom Input</th>
                )}
                <th className="w-1/3 p-2">Expected Output</th>
                <th className="w-1/3 p-2">Got Output</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* Custom Input */}
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

                {/* Expected Output */}
                <td className="p-2 border border-gray-600">
                  <textarea
                    value={expectedOutput}
                    onChange={(e) => setExpectedOutput(e.target.value)}
                    className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded-md resize-none"
                  />
                </td>

                {/* Got Output */}
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
        </div>
      )}
    </div>
  );
};

export default Answer;
