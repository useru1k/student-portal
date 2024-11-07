import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';

const M = () => {
  const initialCode = `// frozen-start
const frozenCode = "This part of the code is frozen";
// frozen-end

function myFunction() {
    console.log("This part is editable.");
}`;

  const [code, setCode] = useState(initialCode);
  const editorRef = useRef(null);

  // Define frozen ranges using the markers
  const frozenRanges = [
    {
      startLine: initialCode.split('\n').findIndex(line => line.includes('// frozen-start')) + 1, // Start line of frozen section
      endLine: initialCode.split('\n').findIndex(line => line.includes('// frozen-end')) + 1 // End line of frozen section
    }
  ];

  useEffect(() => {
    if (editorRef.current) {
      // Once the editor is mounted, freeze the section as read-only
      freezeFrozenSections(editorRef.current.editor);
    }
  }, []);

  // Function to make frozen section read-only
  const freezeFrozenSections = (editor) => {
    const model = editor.getModel();

    // Set the frozen range as read-only using editor's API
    frozenRanges.forEach(range => {
      // Mark frozen lines as read-only
      for (let line = range.startLine; line <= range.endLine; line++) {
        model.updateOptions({
          readOnly: true,  // Make lines read-only
        });
      }
    });
  };

  // Monaco Editor change handler
  const handleEditorChange = (value, event) => {
    const cursorPosition = event.position.lineNumber;
    
    // If the cursor is inside the frozen section, prevent editing
    if (isCursorInFrozenSection(cursorPosition)) {
      setCode(code); // Reset code (disallow modification inside frozen section)
      alert("Editing inside the frozen section is disabled.");
    } else {
      setCode(value); // Allow editing outside the frozen section
    }
  };

  // Check if cursor is in the frozen section based on line number
  const isCursorInFrozenSection = (lineNumber) => {
    return frozenRanges.some(range => lineNumber >= range.startLine && lineNumber <= range.endLine);
  };

  // Handle editor mount to capture the Monaco editor instance
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    freezeFrozenSections(editor);  // Apply frozen read-only ranges once editor is mounted
  };

  return (
    <div>
      <h2>Code Editor with Monaco (Frozen Sections)</h2>
      <MonacoEditor
        height="400px"
        language="javascript"
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          selectOnLineNumbers: true,
          readOnly: false,
        }}
        editorDidMount={handleEditorMount}
      />
    </div>
  );
};

export default M;
