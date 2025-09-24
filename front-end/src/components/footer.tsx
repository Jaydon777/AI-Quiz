"use client";

export default function Footer() {
  return (
    <footer className="w-full bg-indigo-100 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-indigo-700 text-sm font-bold space-y-2 md:space-y-0">
        
        {/* Left: Project Name */}
        <div className="text-center md:text-left">
          AI Quiz Gen — Generate quizzes instantly with AI
        </div>

        {/* Right: Developers */}
        <div className="flex space-x-2 items-center text-center md:text-right">
          <span>Developed by</span>
          <a
            href="https://www.linkedin.com/in/hanieljaydon/"
            target="_blank"
            className="flex items-center space-x-1 hover:text-cyan-600 transition-colors duration-200"
          >
            <span>Haniel Jaydon</span>
          </a>
          <span>&</span>
          <a
            href="https://www.linkedin.com/in/deveshrajam/"
            target="_blank"
            className="flex items-center space-x-1 hover:text-cyan-600 transition-colors duration-200"
          >
            <span>Devesh Raja M</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
