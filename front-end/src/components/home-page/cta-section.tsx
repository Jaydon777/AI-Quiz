"use client";
import Link from "next/link";

export default function CTASection() {
  return (
    <section className="w-full min-h-[80vh] bg-gradient-to-b from-cyan-100 via-cyan-50 to-blue-100 flex items-center justify-center px-4 py-12">
      <div className="text-center max-w-3xl space-y-6">
        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-cyan-700">
          Ready to Test Your Knowledge?
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-cyan-600">
          Enter a topic, set your difficulty, and let AI generate a quiz instantly. Perfect for practice, study, or fun challenges!
        </p>

        {/* CTA Button */}
        <Link
          href="/quiz"
          className="inline-block mt-4 bg-cyan-700 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-blue-600 transition-colors duration-300 text-lg"
        >
          Generate Your First Quiz
        </Link>
      </div>
    </section>
  );
}
