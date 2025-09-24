"use client";
import { MagnifyingGlassIcon, LightBulbIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      title: "Enter Topic",
      desc: "Type in your topic or keywords to generate a quiz instantly.",
      icon: <MagnifyingGlassIcon className="h-6 w-6 text-white" />,
      bg: "bg-indigo-300"
    },
    {
      title: "AI Generates Questions",
      desc: "Our AI creates accurate and challenging questions for your topic.",
      icon: <LightBulbIcon className="h-6 w-6 text-white" />,
      bg: "bg-indigo-300"
    },
    {
      title: "Practice or Share",
      desc: "Start practicing or share quizzes with friends, students, or teams.",
      icon: <RocketLaunchIcon className="h-6 w-6 text-white" />,
      bg: "bg-indigo-300"
    }
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 flex flex-col justify-center px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 text-center mb-16">
          How It Works
        </h2>

        {/* Timeline */}
        <div className="relative border-l-2 border-purple-300 ml-4 space-y-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-10 flex items-start space-x-4 hover:scale-105 transition-transform duration-300">
              {/* Circle with icon */}
              <div className={`absolute -left-6 top-0 w-12 h-12 rounded-full flex items-center justify-center ${step.bg} shadow-lg`}>
                {step.icon}
              </div>
              {/* Step Content */}
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-purple-700">{step.title}</h3>
                <p className="text-purple-600 mt-1">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link
            href="/quiz"
            className="inline-block bg-purple-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-cyan-600 transition-colors"
          >
            Try It Now
          </Link>
          <p className="mt-4 text-purple-600 italic text-sm">
            It only takes a few seconds to get started. No registration required.
          </p>
        </div>
      </div>
    </section>
  );
}
