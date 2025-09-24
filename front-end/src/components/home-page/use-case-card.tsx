"use client";

interface UseCaseCardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function UseCaseCard({ title, desc, icon }: UseCaseCardProps) {
  return (
    <div className="rounded-xl p-6 flex flex-col items-center text-center space-y-4 shadow-lg hover:scale-105 transition-transform duration-300 bg-gradient-to-tr from-orange-500 to-pink-400 w-52">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-white/90 text-sm">{desc}</p>
    </div>
  );
}
