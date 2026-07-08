import DashboardCard from "./DashboardCard";

interface Experience {
  role: string;
  company: string;
  duration: string;
  achievements: string[];
}

interface Props {
  experience: Experience[];
}

export default function ExperienceCard({
  experience,
}: Props) {
  return (
    <DashboardCard title="💼 Experience">
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index}>
            <h3 className="font-semibold">
              {exp.role}
            </h3>

            <p className="text-sm text-gray-500">
              {exp.company}
            </p>

            <p className="mb-2 text-sm">
              {exp.duration}
            </p>

            <ul className="list-disc pl-5">
              {exp.achievements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}