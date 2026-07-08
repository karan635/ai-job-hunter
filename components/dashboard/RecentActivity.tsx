import ActivityItem from "./ActivityItem";

import {
  FileText,
  Sparkles,
  Briefcase,
  Mic,
} from "lucide-react";

const activities = [
  {
    title: "Resume Uploaded",
    description: "Software_Engineer_Resume.pdf",
    time: "2 minutes ago",
    icon: FileText,
  },
  {
    title: "ATS Score Updated",
    description: "Your ATS score improved to 94%",
    time: "10 minutes ago",
    icon: Sparkles,
  },
  {
    title: "Cover Letter Generated",
    description: "Google Frontend Developer",
    time: "35 minutes ago",
    icon: Briefcase,
  },
  {
    title: "Mock Interview Completed",
    description: "React + JavaScript Interview",
    time: "Yesterday",
    icon: Mic,
  },
];

export default function RecentActivity() {
  return (
    <section className="mt-10">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="space-y-4">
        {activities.map((activity) => (
          <ActivityItem
            key={activity.title}
            {...activity}
          />
        ))}
      </div>
    </section>
  );
}