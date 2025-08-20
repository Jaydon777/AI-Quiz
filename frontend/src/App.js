import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quiz, setQuiz] = useState(null);
  const [error, setError] = useState("");

  const generateQuiz = async () => {
    setError("");
    setQuiz(null);

    try {
      const response = await fetch("http://localhost:5000/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate quiz");
      }

      const data = await response.json();
      setQuiz(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. Try again!");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Quiz Generator</h1>
      <input
        type="text"
        placeholder="Enter topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
      <button onClick={generateQuiz}>Generate Quiz</button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {quiz && quiz.questions && (
        <div>
          <h2>{quiz.topic} Quiz ({quiz.difficulty})</h2>
          {quiz.questions.map((q, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <p>
                <strong>Q{index + 1}:</strong> {q.question}
              </p>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p>✅ Correct Answer: {q.options[q.answerIndex]}</p>
              <p>ℹ️ {q.explanation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
