import React from "react";
const Question1 = () => {
    return (
       
        <pre className="whitespace-pre-wrap">
          
          {``}

        <span className="font-bold ">Problem: Balanced Parentheses</span>{`

You are given a string containing only the characters (, ), {, }, [ and ]. Your task is to write a function to determine if the input string is `}
          <span className="font-bold">valid</span>
          {`.

An input string is `}
          <span className="font-bold">valid</span>
          {` if:

1. Open brackets are closed by the same type of brackets.
2. Open brackets are closed in the correct order.
3. Every closing bracket has a corresponding open bracket of the same type.

`}
          <span className="font-bold">Input:</span>{` 
A single string s containing only the characters (){}[], with a maximum length of 10^4.

`}
          <span className="font-bold">Output:</span>{` 
Return `}
          <span className="font-bold">true</span>
          {` if the string is `}
          <span className="font-bold">valid</span>
          {`, otherwise return `}
          <span className="font-bold">false</span>.

{`

`}
          <span className="font-bold">Constraints:</span>{` 
- The string s consists only of the characters (), {}, [].
- The length of s will not exceed 10^4.`}

        </pre>
        
    );
  };
  
  export default Question1;
  