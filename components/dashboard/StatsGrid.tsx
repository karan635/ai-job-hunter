import StatsCard from "./StatsCard";

import {
  FileText,
  Briefcase,
  FileSignature,
  Mic,
} from "lucide-react";

const stats = [
  {
    title: "ATS Score",
    value: "94%",
    subtitle: "Excellent",
    icon: FileText,
  },
  {
    title: "Job Matches",
    value: 28,
    subtitle: "+5 Today",
    icon: Briefcase,
  },
  {
    title: "Cover Letters",
    value: 12,
    subtitle: "Generated",
    icon: FileSignature,
  },
  {
    title: "Interviews",
    value: 6,
    subtitle: "Scheduled",
    icon: Mic,
  },
];

export default function StatsGrid() {
  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatsCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}