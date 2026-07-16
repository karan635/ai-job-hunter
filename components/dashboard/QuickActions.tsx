import {
  FileSearch,
  FileSignature,
  Mic,
  Briefcase,
} from "lucide-react";

import QuickActionCard from "./QuickActionCard";

const actions = [
  {
    title: "Analyze Resume",
    description: "Get ATS score and AI feedback",
    icon: FileSearch,
    href: "/dashboard/resume",
  },
  {
    title: "Generate Cover Letter",
    description: "Create tailored cover letters",
    icon: FileSignature,
    href: "/dashboard/cover-letter",
  },
  {
    title: "Mock Interview",
    description: "Practice AI interview questions",
    icon: Mic,
    href: "/dashboard/interview-prep",
  },
  {
    title: "Job Matching",
    description: "Find jobs matching your resume",
    icon: Briefcase,
    href: "/dashboard/job-match",
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-violet-300">Make progress now</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">Your next best actions</h2>
        </div>
        <p className="hidden text-sm text-zinc-500 sm:block">Choose one focused task to move forward.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {actions.map((action) => (
          <QuickActionCard
            key={action.title}
            {...action}
          />
        ))}
      </div>
    </section>
  );
}
