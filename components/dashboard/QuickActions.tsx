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
  },
  {
    title: "Generate Cover Letter",
    description: "Create tailored cover letters",
    icon: FileSignature,
  },
  {
    title: "Mock Interview",
    description: "Practice AI interview questions",
    icon: Mic,
  },
  {
    title: "Job Matching",
    description: "Find jobs matching your resume",
    icon: Briefcase,
  },
];

export default function QuickActions() {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid gap-6 md:grid-cols-2">
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