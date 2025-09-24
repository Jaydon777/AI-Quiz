"use client";

interface QuizFinalScreenProps {
  score: number;
  handleReset: () => void;
}

export default function QuizFinalScreen({ score, handleReset }: QuizFinalScreenProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-10 text-center flex flex-col gap-6 w-full max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-purple-700">🎉 Quiz Completed!</h2>
      <p className="text-xl">Your Final Score: {score}</p>
      <button
        onClick={handleReset}
        className="bg-purple-400 text-white font-semibold rounded-xl py-3 w-full hover:bg-purple-500 transition-colors"
      >
        Take Another Quiz
      </button>
    </div>
  );
}
