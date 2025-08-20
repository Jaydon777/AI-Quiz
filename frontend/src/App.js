import React, { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("easy");
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateQuiz = async () => {
    setLoading(true);
    setError("");
    setQuiz(null);

    try {
      const response = await fetch("http://localhost:5000/api/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, difficulty }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch quiz");
      }

      const data = await response.json();
      setQuiz(data);
    } catch (err) {
      console.error(err);
      setError("Failed to generate quiz. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>AI Quiz Generator</h1>

      <div>
        <input
          type="text"
          placeholder="Enter topic (e.g. Python)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ padding: "5px", marginRight: "10px" }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button
          onClick={handleGenerateQuiz}
          style={{ padding: "5px 15px", cursor: "pointer" }}
        >
          Generate Quiz
        </button>
      </div>

      {loading && <p>Loading quiz...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {quiz && quiz.questions && (
        <div style={{ marginTop: "20px" }}>
          <h2>
            Topic: {quiz.topic} ({quiz.difficulty})
          </h2>
          {quiz.questions.map((q, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                marginBottom: "15px",
              }}
            >
              <h3>
                Q{index + 1}: {q.question}
              </h3>
              <ul>
                {q.options.map((opt, i) => (
                  <li key={i}>{opt}</li>
                ))}
              </ul>
              <p>
                <strong>✅ Correct Answer:</strong>{" "}
                {q.options[q.answerIndex]}
              </p>
              <p>
                <em>💡 Explanation: {q.explanation}</em>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
