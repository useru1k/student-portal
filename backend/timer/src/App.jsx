import React, { useState, useEffect } from 'react';

const questions = [
  { question: "What is the capital of France?", answer: "Paris" },
  { question: "What is 2 + 2?", answer: "4" },
  { question: "What is the capital of Japan?", answer: "Tokyo" }
];

const Quiz = () => {
  const initialTime = 10;
  const [cQues, setCuQues] = useState(0);
  const [tRem, setTiRem] = useState(Array(questions.length).fill(initialTime));
  const [isQuesCom, setIsComp] = useState(Array(questions.length).fill(false));

  useEffect(() => {
    const timerId = setInterval(() => {
      setTiRem(prev => {
        const newTimes = [...prev];
        if (newTimes[cQues] > 0) {
          newTimes[cQues] -= 1;
        }
        if (newTimes[cQues] === 0) {
          clearInterval(timerId);
          setIsComp(prev => {
            const newCompletionStatus = [...prev];
            newCompletionStatus[cQues] = true;
            return newCompletionStatus;
          });
          moveToNextQuestion(); // Automatically move to the next question when time runs out
        }
        return newTimes;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [cQues]);

  const moveToNextQuestion = () => {
    setCuQues(prev => {
      const nextIndex = prev + 1;
      if (nextIndex < questions.length) {
        setIsComp(prev => {
          const newStatus = [...prev];
          newStatus[prev] = tRem[prev] === 0; // Set the current question as completed
          return newStatus;
        });
        return nextIndex;
      }
      return prev; // If no more questions, stay on the current one
    });
  };

  const moveToPreviousQuestion = () => {
    setCuQues(prev => {
      const prevIndex = prev - 1;
      return prevIndex >= 0 ? prevIndex : prev; // Prevent going below zero
    });
  };

  const jumpToQuestion = (index) => {
    if (!isQuesCom[index]) {
      setCuQues(index);
    }
  };

  const currentQuestion = questions[cQues];

  return (
    <div style={styles.container}>
    {currentQuestion ? (
      <>
      <h1 style={styles.question}>{currentQuestion.question}</h1>
      <p style={styles.timer}>Time Remaining: {tRem[cQues]} seconds</p>
      <div style={styles.buttonContainer}>
      {cQues > 0 && (
        <button
        style={styles.button}
        onClick={moveToPreviousQuestion}
        disabled={isQuesCom[cQues]}
        >
        Previous
        </button>
      )}
      {cQues < questions.length - 1 ? (
        <button
        style={styles.button}
        onClick={moveToNextQuestion}
        disabled={isQuesCom[cQues]}
        >
        Next
        </button>
      ) : (
        <span style={styles.completedMessage}>Quiz Completed!</span>
      )}
      </div>
      <div style={styles.navigationContainer}>
      {questions.map((_, index) => (
        <button
        key={index}
        style={styles.jumpButton}
        onClick={() => jumpToQuestion(index)}
        disabled={isQuesCom[index]} // Disable button for completed questions
        >
        {`Q${index + 1}`}
        </button>
      ))}
      </div>
      </>
    ) : (
      <h1 style={styles.endMessage}>No more questions!</h1>
    )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
  },
  question: {
    marginBottom: '20px',
    fontSize: '24px',
  },
  timer: {
    marginBottom: '20px',
    fontSize: '18px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  navigationContainer: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  jumpButton: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#28a745', // Green for jump buttons
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  completedMessage: {
    fontSize: '18px',
    color: '#28a745', // Green color for completion
  },
  endMessage: {
    fontSize: '24px',
    textAlign: 'center',
  },
};

export default Quiz;
