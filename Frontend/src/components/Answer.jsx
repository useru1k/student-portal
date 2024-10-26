import React, { useState, useRef, useEffect } from "react";
import { Editor as MonacoEditor } from "@monaco-editor/react";
import { FaPlay, FaSun, FaMoon } from "react-icons/fa";
import "../assets/css/Answer.css";

const Answer = ({ currentIndex, language, code, onCodeChange }) => {
  const [theme, setTheme] = useState("vs-dark");
  const [showOutput, setShowOutput] = useState(false);
  const [customInput, setCustomInput] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("5,10,15");
  const [gotOutput, setGotOutput] = useState("");
  const [compilationMessage, setCompilationMessage] = useState("");
  const [useCustomInput, setUseCustomInput] = useState(false);
  const editorRef = useRef(null);
  const [editorContent, setEditorContent] = useState(code || "");

  useEffect(() => {
    setEditorContent(code || "");
  }, [currentIndex, code]);

  const handleEditorChange = (newCode) => {
    setEditorContent(newCode);
    onCodeChange(newCode);
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
        body: JSON.stringify({ code, language, customInput }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
      const result = await response.text();
      setGotOutput(result);
    } catch (error) {
      setGotOutput(`Error:${error}`);
      setCompilationMessage(`Compilation failed: ${error.message}`);
    }
  };

  return (
    <div
      className="container mx-auto p-4 flex flex-col rounded-lg space-y-4 w-[800px] h-[500px]"
      onContextMenu={(e) => {
        e.preventDefault();
        alert("Right-click disabled");
      }}
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