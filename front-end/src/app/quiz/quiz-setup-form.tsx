"use client";
import { useState } from "react";

interface QuizSetupFormProps {
  setQuiz: (quiz: any[]) => void;
}

export default function QuizSetupForm({ setQuiz }: QuizSetupFormProps) {
  const [topic, setTopic] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [secondsPerQuestion, setSecondsPerQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerateQuiz = async () => {
    if (!topic) return alert("Please enter a topic!");
    if (!numQuestions || Number(numQuestions) <= 0) return alert("Questions must be >= 1");
    if (!secondsPerQuestion || Number(secondsPerQuestion) <= 0) return alert("Seconds must be >= 1");

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
      console.log("API response:", data);

      // Handle old array format
      if (Array.isArray(data)) {
        setQuiz(data.map((q: any, idx: number) => ({ ...q, id: idx + 1 })));
      } 
      // Handle object format { questions: [...] } or { quiz: [...] }
      else if (data.questions && Array.isArray(data.questions)) {
        setQuiz(data.questions.map((q: any, idx: number) => ({ ...q, id: idx + 1 })));
      } 
      else if (data.quiz && Array.isArray(data.quiz)) {
        setQuiz(data.quiz.map((q: any, idx: number) => ({ ...q, id: idx + 1 })));
      } 
      else {
        alert("❌ Invalid quiz format from API");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Failed to generate quiz. Try again!");
    }
    setLoading(false);
  };

  return (
    <div className="border-4 border-indigo-200 rounded-2xl shadow-lg p-8 flex flex-col gap-6 w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter Your Topic"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        className="border border-purple-200 rounded-xl p-3 w-full text-indigo-800 focus:outline-none hover:border-purple-400 transition-colors"
      />
      <input
        type="number"
        placeholder="Number of Questions"
        value={numQuestions}
        onChange={(e) => setNumQuestions(e.target.value)}
        min="1"
        className="border border-purple-200 rounded-xl p-3 w-full text-indigo-800 focus:outline-none hover:border-purple-400 transition-colors"
      />
      <input
        type="number"
        placeholder="Seconds per Question"
        value={secondsPerQuestion}
        onChange={(e) => setSecondsPerQuestion(e.target.value)}
        min="1"
        className="border border-purple-200 rounded-xl p-3 w-full text-indigo-800 focus:outline-none hover:border-purple-400 transition-colors"
      />
      <button
        onClick={handleGenerateQuiz}
        disabled={loading}
        className="bg-purple-200 text-indigo-800 font-semibold rounded-xl py-3 w-full hover:bg-purple-300 transition-colors"
      >
        {loading ? "Loading..." : "Generate Quiz"}
      </button>
    </div>
  );
}
