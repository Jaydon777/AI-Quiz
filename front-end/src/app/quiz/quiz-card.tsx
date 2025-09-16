"use client";
import { useState, useEffect, useCallback } from "react";

interface QuizCardProps {
  quiz: any[];
  setQuizCompleted: (completed: boolean) => void;
  score: number;
  setScore: (score: number) => void;
}

export default function QuizCard({
  quiz,
  setQuizCompleted,
  score,
  setScore,
}: QuizCardProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [timeLeft, setTimeLeft] = useState(quiz[0]?.secondsPerQuestion || 30);

  const handleSubmit = useCallback(
    (timeUp = false) => {
      if (!submitted) {
        const correctIndex = quiz[currentQ].answerIndex;
        const correct = selected === correctIndex;
        setSubmitted(true);
        setScore(score + (correct ? 10 : -5));
        setExplanation(
          `${correct ? "✅ Correct" : `❌ ${timeUp ? "Time's up!" : "Incorrect"}`}\nCorrect Answer: ${
            quiz[currentQ].options[correctIndex]
          }\n${quiz[currentQ].explanation}`
        );
      }
    },
    [submitted, quiz, currentQ, selected, score, setScore]
  );

  useEffect(() => {
    if (!submitted) {
      const timer = setInterval(() => {
        setTimeLeft((prev: number) => {
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
  }, [currentQ, submitted, handleSubmit]);

  const handleNext = () => {
    if (currentQ < quiz.length - 1) {
      setCurrentQ((prev) => prev + 1);
      setSelected(null);
      setSubmitted(false);
      setExplanation("");
      setTimeLeft(quiz[currentQ + 1]?.secondsPerQuestion || 30);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center text-purple-700 font-semibold text-lg">
        <span>Score: {score}</span>
        <span>⏱ {timeLeft}s</span>
      </div>

      <h2 className="text-2xl font-semibold text-purple-700">
        Q{currentQ + 1}. {quiz[currentQ]?.question}
      </h2>

      <div className="flex flex-col gap-4">
        {quiz[currentQ]?.options.map((opt: string, idx: number) => {
          let baseClass =
            "w-full py-3 rounded-xl px-4 transition-colors text-left font-medium border";
          if (submitted) {
            if (idx === quiz[currentQ].answerIndex)
              baseClass += " bg-green-100 border-green-400";
            else if (idx === selected && idx !== quiz[currentQ].answerIndex)
              baseClass += " bg-red-100 border-red-400";
            else baseClass += " border-purple-200";
          } else if (selected === idx) {
            baseClass += " bg-purple-200 border-purple-400";
          } else {
            baseClass += " border-purple-200 bg-white hover:bg-purple-50";
          }
          return (
            <button
              key={idx}
              className={baseClass}
              onClick={() => !submitted && setSelected(idx)}
            >
              {opt}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={() => handleSubmit()}
          disabled={selected === null}
          className="bg-purple-400 text-white font-semibold rounded-xl py-3 w-full hover:bg-purple-500 transition-colors"
        >
          Submit
        </button>
      ) : (
        <>
          <p className="whitespace-pre-line text-purple-700">{explanation}</p>
          <button
            onClick={handleNext}
            className="bg-purple-400 text-white font-semibold rounded-xl py-3 w-full hover:bg-purple-500 transition-colors"
          >
            {currentQ < quiz.length - 1 ? "Next Question" : "Finish Quiz"}
          </button>
        </>
      )}
    </div>
  );
}
