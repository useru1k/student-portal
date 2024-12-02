import React from "react";

const Question1 = () => {
  return (
    <div className="text-base leading-relaxed space-y-4">
      <h2 className="text-lg font-bold">Problem: Balanced Parentheses</h2>
      <p>
        You are given a string containing only the characters `(`, `)`, `{`, `}`, `[` and `]`. Your task is to write a function to determine if the input string is <span className="font-bold">valid</span>.
      </p>
      <p>An input string is <span className="font-bold">valid</span> if:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>Open brackets are closed by the same type of brackets.</li>
        <li>Open brackets are closed in the correct order.</li>
        <li>Every closing bracket has a corresponding open bracket of the same type.</li>
      </ul>
      <h3 className="font-bold">Input:</h3>
      <p>
        A single string <code>s</code> containing only the characters `(){}[]`, with a maximum length of 10<sup>4</sup>.
      </p>
      <h3 className="font-bold">Output:</h3>
      <p>
        Return <span className="font-bold">true</span> if the string is <span className="font-bold">valid</span>, otherwise return <span className="font-bold">false</span>.
      </p>
      <h3 className="font-bold">Constraints:</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>The string <code>s</code> consists only of the characters `()`, `{}`, `[]`.</li>
        <li>The length of <code>s</code> will not exceed 10<sup>4</sup>.</li>
      </ul>
    </div>
  );
};

export default Question1;
