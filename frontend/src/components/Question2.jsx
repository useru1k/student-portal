import React from "react";

const Question1 = () => {
  return (
    <pre className="whitespace-pre-wrap">
      
      {``}
      
      <span className="font-bold">Problem: Odd or Even</span>{`

You are given an integer n. Your task is to write a function to determine if the number is odd or even.

A number is considered:
1. **Even** if it is divisible by 2 (i.e., n % 2 === 0).
2. **Odd** if it is not divisible by 2 (i.e., n % 2 !== 0).

`}
      <span className="font-bold">Input:</span>
      {`A single integer n, where -10^9 ≤ n ≤ 10^9.`}
      <span className="font-bold">Output:</span>{` 
Return the string `}
      <span className="font-bold">"Even"</span>
      {` if the number is even, and `}
      <span className="font-bold">"Odd"</span>
      {` if the number is odd.`}

{`

`}
      <span className="font-bold">Constraints:</span>
      {`The integer n will be within the range -10^9 to 10^9.`}
    </pre>
  );
};

export default Question1;
