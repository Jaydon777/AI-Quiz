import React, { useState, useEffect, useCallback } from "react";
import "./App.css";

function App() {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [secondsPerQuestion, setSecondsPerQuestion] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSubmit = useCallback(
    (timeUp = false) => {
      if (!submitted) {
        const correctIndex = quiz[currentQ].answerIndex;
        const correct = selected === correctIndex;
        setSubmitted(true);
        setScore((prev) => prev + (correct ? 10 : -5));
        setExplanation(
          (correct
            ? "✅ Correct.\n"
            : `❌ ${timeUp ? "Time's up!" : "Incorrect"}\nCorrect Answer: ${
                quiz[currentQ].options[correctIndex]
              }\n`) + quiz[currentQ].explanation
        );
      }
    },
    [submitted, quiz, currentQ, selected]
  );

  useEffect(() => {
    if (!submitted && quiz.length > 0 && !quizCompleted) {
      setTimeLeft(quiz[currentQ].secondsPerQuestion || Number(secondsPerQuestion));
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmit(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [currentQ, submitted, quiz, quizCompleted, handleSubmit, secondsPerQuestion]);

  const handleGenerateQuiz = async () => {
    if (!topic) return alert("Please enter a topic!");
    if (!numQuestions || numQuestions <= 0) return alert("Number of questions must be at least 1!");
    if (!secondsPerQuestion || secondsPerQuestion <= 0) return alert("Seconds per question must be at least 1!");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          numQuestions: Number(numQuestions),
          secondsPerQuestion: Number(secondsPerQuestion),
        }),
      });
      const data = await res.json();
      setQuiz(data.questions.map((q, idx) => ({ ...q, id: idx + 1 })));
      setCurrentQ(0);
      setSelected(null);
      setSubmitted(false);
      setExplanation("");
      setScore(0);
      setTimeLeft(Number(secondsPerQuestion));
      setQuizCompleted(false);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate quiz. Try again!");
    }
    setLoading(false);
  };

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setSubmitted(false);
      setExplanation("");
      setTimeLeft(quiz[currentQ + 1]?.secondsPerQuestion || Number(secondsPerQuestion));
    } else {
      setQuizCompleted(true);
    }
  };

  const handleResetInputs = () => {
    setQuiz([]);
    setCurrentQ(0);
    setSelected(null);
    setSubmitted(false);
    setExplanation("");
    setScore(0);
    setTimeLeft(0);
    setQuizCompleted(false);
  };

  return (
    <div className="app">
      <h1 className="title">AI QUIZ</h1>

      {quiz.length === 0 ? (
        <div className="input-box">
          <input
            type="text"
            placeholder="Enter Your Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="input-field"
          />
          <input
            type="number"
            placeholder="Enter Number of Questions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="input-field"
            min="1"
          />
          <input
            type="number"
            placeholder="Enter Seconds per Question"
            value={secondsPerQuestion}
            onChange={(e) => setSecondsPerQuestion(e.target.value)}
            className="input-field"
            min="1"
          />
          <button onClick={handleGenerateQuiz} className="generate-btn">
            {loading ? "Loading..." : "Generate Quiz"}
          </button>
        </div>
      ) : quizCompleted ? (
        <div className="final-screen fade-in">
          <h2>🎉 Quiz Completed!</h2>
          <p>Your Final Score: {score}</p>
          <button onClick={handleResetInputs} className="generate-btn">
            Take Another Quiz
          </button>
        </div>
      ) : (
        <div className="quiz-card">
          <div className="score-badge">🥇Score: {score}</div>
          <div className="timer">⏱ {timeLeft}s</div>
          <h2 className="question">
            Q{currentQ + 1}. {quiz[currentQ]?.question}
          </h2>

          <div className="options">
            {quiz[currentQ]?.options.map((opt, idx) => {
              let className = "option-btn";
              if (submitted) {
                if (idx === quiz[currentQ].answerIndex) className += " correct";
                else if (idx === selected && idx !== quiz[currentQ].answerIndex)
                  className += " wrong";
              } else if (selected === idx) {
                className += " selected";
              }
              return (
                <button
                  key={idx}
                  className={className}
                  onClick={() => !submitted && setSelected(idx)}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {!submitted ? (
            <button
              onClick={handleSubmit}
              className="submit-btn"
              disabled={selected === null}
            >
              Submit
            </button>
          ) : (
            <>
              <p className="explanation" style={{ whiteSpace: "pre-line" }}>
                {explanation}
              </p>
              <button onClick={handleNext} className="next-btn">
                {currentQ < quiz.length - 1 ? "Next" : "Finish Quiz"}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
