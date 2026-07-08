import DashboardCard from "./DashboardCard";

interface Project {
  name: string;
  description: string;
  url?: string;
}

interface Props {
  projects: Project[];
}

export default function ProjectsCard({
  projects,
}: Props) {
  return (
    <DashboardCard title="🚀 Projects">
      <div className="space-y-5">
        {projects.map((project, index) => (
          <div key={index}>
            <h3 className="font-semibold">
              {project.name}
            </h3>

            <p className="my-2">
              {project.description}
            </p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                className="text-blue-500 underline"
              >
                GitHub Repository
              </a>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}