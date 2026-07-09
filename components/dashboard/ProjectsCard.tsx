import DashboardCard from "./DashboardCard";

interface Project {
  name: string;
  description: string;
  tech_stack: string[];
  impact: string | null;
}

interface Props {
  projects: Project[];
}

export default function ProjectsCard({
  projects,
}: Props) {
  if (!projects || projects.length === 0) {
    return (
      <DashboardCard title="🚀 Projects">
        <p className="text-gray-500">
          No projects found.
        </p>
      </DashboardCard>
    );
  }

  return (
    <DashboardCard title="🚀 Projects">
      <div className="space-y-6">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-5 last:border-none"
          >
            <h3 className="text-lg font-semibold">
              {project.name || "Untitled Project"}
            </h3>

            <p className="mt-2 text-gray-700">
              {project.description || "No description available."}
            </p>

            {(project.tech_stack ?? []).length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech_stack.map((tech, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {project.impact && (
              <div className="mt-4 rounded-lg bg-green-50 p-3">
                <p className="text-sm font-medium text-green-700">
                  📈 Impact
                </p>

                <p className="mt-1 text-sm text-green-600">
                  {project.impact}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}