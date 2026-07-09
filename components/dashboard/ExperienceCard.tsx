import DashboardCard from "./DashboardCard";

interface Experience {
  title: string;
  company: string;
  duration: string;
  bullets: string[];
  quantified: boolean;
}

interface Props {
  experience: Experience[];
}

export default function ExperienceCard({
  experience,
}: Props) {
  if (!experience || experience.length === 0) {
    return (
      <DashboardCard title="💼 Experience">
        <p className="text-gray-500">
          No work experience found.
        </p>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="💼 Experience">
      <div className="space-y-6">
        {experience.map((exp, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-5 last:border-none"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {exp.title || "Role Not Available"}
              </h3>

              {exp.quantified && (
                <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                  Quantified
                </span>
              )}
            </div>

            <p className="text-sm text-gray-500">
              {exp.company || "Unknown Company"}
            </p>

            <p className="mb-3 text-sm text-gray-400">
              {exp.duration || "Duration not specified"}
            </p>

            {(exp.bullets ?? []).length > 0 ? (
              <ul className="list-disc space-y-2 pl-5">
                {exp.bullets.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">
                No achievements available.
              </p>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}