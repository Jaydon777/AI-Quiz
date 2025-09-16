"use client";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function Features() {
  const features = [
    "Instant quiz creation with AI",
    "Multiple question formats (MCQ, True/False, Short Answer)",
    "SEO-optimized and responsive",
    "Secure API-based data handling",
    "Share quizzes with ease",
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-cyan-100 via-cyan-50 to-cyan-200 flex flex-col justify-center py-24">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-700">
          Why Choose Our Quiz Generator?
        </h2>

        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 p-6 bg-white/70 backdrop-blur-md rounded-xl shadow-md hover:shadow-xl transition-all duration-300 w-full md:w-[calc(50%-12px)] lg:w-[calc(33%-16px)]"
            >
              <CheckCircleIcon className="h-8 w-8 text-cyan-500" />
              <p className="text-cyan-700 font-semibold">{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
