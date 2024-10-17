import React, { useState } from 'react';
import { Editor as MonacoEditor } from '@monaco-editor/react';
import { FaPlay, FaCheckCircle } from 'react-icons/fa';
import '../assets/css/Answer.css'; // Import the CSS file for layout and styling

const Answer = () => {
  const [code, setCode] = useState('// Write your code here...');
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [showOutput, setShowOutput] = useState(false);
  const [testResult, setTestResult] = useState(null); // For test case results

  const handleCompile = () => {
    setShowOutput(true); // Show output when "Run Code" is clicked
    const result = 'Wrong Answer'; // Simulate result (or get dynamically)
    setTestResult({
      status: result === 'Correct' ? 'Correct Answer' : 'Wrong Answer',
      message: result,
      testCase: 'Sample Test case 0',
      output: result === 'Correct' ? 'Expected Output' : 'Incorrect Output',
    });
  };

  const handleSubmit = () => {
    console.log('Submitting code:', code);
  };

  return (
    <div className="container ">
      {/* Top bar: Language selector and theme toggle */}
      <div className="top-bar">
        <div className="flex space-x-6 items-center">
          <button
            className="toggle-theme"
            onClick={() => setTheme(theme === 'vs-dark' ? 'light' : 'vs-dark')}
          >
            {theme === 'vs-dark' ? 'Light' : 'Dark'}
          </button>
          <div className="flex font-thin items-center space-x-2">
            <span className="text-sm">Language</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-selector"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python 3</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>
          </div>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className={`editor-container`}>
        <MonacoEditor
          height="100%"
          width="100%"
          defaultLanguage={language}
          theme={theme}
          value={code}
          onChange={(value) => setCode(value || '')}
          options={{
            lineNumbers: 'on',
            tabSize: 2,
            wordWrap: 'on',
            automaticLayout: true,
          }}
          className="rounded-md"
        />
      </div>

      {/* Bottom controls: Run and Submit buttons */}
      <div className="controls">
        <button
          className="btn-run"
          onClick={handleCompile}
        >
          <FaPlay />
          <span>Run Code</span>
        </button>
        <button
          className="btn-submit"
          onClick={handleSubmit}
        >
          <FaCheckCircle />
          <span>Submit Code</span>
        </button>
      </div>

      {/* Output Panel */}
      {showOutput && (
        <div className="output-panel">
          <div className="output-header">
            <h3 className={testResult?.status === 'Correct Answer' ? 'text-green' : 'text-red'}>
              {testResult?.status}
            </h3>
            <p>{testResult?.message}</p>
            <p className="text-sm">{testResult?.testCase}</p>
          </div>
          <div className="output-content">
            <p className="font-mono text-sm text-red-500">Compiler Message</p>
            <pre>{testResult?.output}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default Answer;
