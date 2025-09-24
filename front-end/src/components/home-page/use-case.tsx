"use client";
import UseCaseCard from "./use-case-card";
import { AcademicCapIcon, BookOpenIcon, BuildingLibraryIcon, PencilSquareIcon, TicketIcon } from "@heroicons/react/24/outline";

export default function UseCases() {
  const cases = [
    { title: "Education", desc: "Teachers generate quizzes for class easily.", icon: <AcademicCapIcon className="h-8 w-8 text-white" /> },
    { title: "Self-Study", desc: "Students prepare for exams and practice topics.", icon: <BookOpenIcon className="h-8 w-8 text-white" /> },
    { title: "Corporate Training", desc: "HR teams test employee knowledge effectively.", icon: <BuildingLibraryIcon className="h-8 w-8 text-white" /> },
    { title: "Content Creators", desc: "Add quizzes to blogs & online courses seamlessly.", icon: <PencilSquareIcon className="h-8 w-8 text-white" /> },
    { title: "Event Hosts", desc: "Make interactive trivia games for your events.", icon: <TicketIcon className="h-8 w-8 text-white" /> },
  ];

  return (
    <section className="w-full min-h-screen bg-gradient-to-b from-orange-100 via-orange-50 to-pink-100 flex flex-col justify-center px-4 py-12">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-extrabold text-orange-700 text-center mb-16">
          Where Can You Use It?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 justify-items-center">
          {cases.map((useCase, idx) => (
            <UseCaseCard key={idx} title={useCase.title} desc={useCase.desc} icon={useCase.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}
