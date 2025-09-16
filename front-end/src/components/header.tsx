"use client";
import Link from "next/link";
import { SparklesIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-indigo-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <SparklesIcon className="h-8 w-8 text-indigo-700" />
          <span className="font-bold text-indigo-700 text-lg">AI Quiz Gen</span>
        </div>

        {/* Right: Desktop Links */}
        <div className="hidden md:flex space-x-6">
          <Link
            href="/"
            className="font-semibold text-indigo-700 hover:text-cyan-600 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/quiz"
            className="font-semibold text-indigo-700 hover:text-cyan-600 transition-colors"
          >
            Let's Start Quizzing
          </Link>
        </div>

        {/* Right: Mobile/Tablet Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-indigo-700 focus:outline-none p-2 bg-white/60 backdrop-blur-md rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            {menuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 mx-4 bg-white/70 backdrop-blur-md rounded-xl shadow-lg flex flex-col gap-3 p-4 transition-all duration-300">
          <Link
            href="/"
            className="font-semibold text-indigo-700 hover:text-cyan-600 transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/quiz"
            className="font-semibold text-indigo-700 hover:text-cyan-600 transition-colors px-3 py-2 rounded-md hover:bg-indigo-50"
            onClick={() => setMenuOpen(false)}
          >
            Let's Start Quizzing
          </Link>
        </div>
      )}
    </header>
  );
}
