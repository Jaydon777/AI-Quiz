"use client";

import { useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import QuizHero from "@/app/quiz/quiz-hero";
import QuizSetupForm from "@/app/quiz/quiz-setup-form";
import QuizCard from "@/app/quiz/quiz-card";
import QuizFinalScreen from "@/app/quiz/quiz-final-screen";

export default function QuizPage() {
  const [quiz, setQuiz] = useState<any[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0); 

  const handleReset = () => {
    setQuiz([]);
    setQuizCompleted(false);
    setScore(0);
  };

  return (
    <div className="min-h-screen flex flex-col flex-grow bg-gradient-to-br from-indigo-200 via-indigo-50 to-indigo-200 ">
      <Header />

      <main className="flex-1 pt-24 pb-24 px-4 sm:px-8 lg:px-20 flex flex-col gap-4 md:gap-12 items-center w-full ">
        <QuizHero />

        {!quiz.length ? (
          <QuizSetupForm setQuiz={setQuiz} />
        ) : quizCompleted ? (
          <QuizFinalScreen score={score} handleReset={handleReset} />
        ) : (
          <QuizCard
            quiz={quiz}
            setQuizCompleted={setQuizCompleted}
            score={score}
            setScore={setScore}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
