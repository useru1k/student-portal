import React from "react";

const Question2 = () => {
  return (
    <div className="text-base leading-relaxed space-y-4 style={{ fontFamily: 'Inter, sans-serif' }}">
      <h2 className="text-lg font-bold ">Problem: Odd or Even</h2>
      <p>
        You are given an integer <code>n</code>. Your task is to write a function to determine if the number is odd or even.
      </p>
      <p>A number is considered:</p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <span className="font-bold">Even</span> if it is divisible by 2 (i.e., <code>n % 2 === 0</code>).
        </li>
        <li>
          <span className="font-bold">Odd</span> if it is not divisible by 2 (i.e., <code>n % 2 !== 0</code>).
        </li>
      </ul>
      <h3 className="font-bold">Input:</h3>
      <p>
        A single integer <code>n</code>, where <code>-10^9 ≤ n ≤ 10^9</code>.
      </p>
      <h3 className="font-bold">Output:</h3>
      <p>
        Return the string <span className="font-bold">"Even"</span> if the number is even, and <span className="font-bold">"Odd"</span> if the number is odd.
      </p>
      <h3 className="font-bold">Constraints:</h3>
      <ul className="list-disc list-inside space-y-2">
        <li>
          The integer <code>n</code> will be within the range <code>-10^9</code> to <code>10^9</code>.
        </li>
      </ul>
    </div>
  );
};

export default Question2;
