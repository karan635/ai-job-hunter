import DashboardCard from "./DashboardCard";

interface SkillsCardProps {
  skills: string[];
}

export default function SkillsCard({
  skills,
}: SkillsCardProps) {
  return (
    <DashboardCard title="Skills">
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </DashboardCard>
  );
}