"use client";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-indigo-100 via-indigo-50 to-indigo-200 flex flex-col items-center justify-center text-center px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-700">
        AI-Powered Quiz Generator
      </h1>
      <p className="text-xl md:text-2xl font-semibold text-indigo-600 mt-4">
        Turn any topic into an interactive quiz within seconds.
      </p>
      <p className="max-w-2xl text-indigo-700 mt-4">
        Create personalized quizzes instantly with our AI-driven platform. Just enter a topic, and we’ll generate engaging, accurate, and challenging questions tailored to your needs. Perfect for students, teachers, and lifelong learners.
      </p>
      <Link
        href="/quiz"
        className="mt-6 inline-block bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-cyan-600 transition-colors"
      >
        Generate Your First Quiz
      </Link>
    </section>
  );
}
