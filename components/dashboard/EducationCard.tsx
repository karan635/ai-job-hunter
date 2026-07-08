import DashboardCard from "./DashboardCard";

interface Education {
  degree: string;
  institution: string;
  duration: string;
  location?: string;
  cgpa?: string;
}

interface EducationCardProps {
  education: Education[];
}

export default function EducationCard({
  education,
}: EducationCardProps) {
  return (
    <DashboardCard title="🎓 Education">
      <div className="space-y-4">
        {education.map((edu, index) => (
          <div key={index} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold">{edu.degree}</h3>
            <p>{edu.institution}</p>
            <p className="text-sm text-gray-500">
              {edu.duration}
            </p>
            {edu.cgpa && (
              <p className="text-sm">CGPA: {edu.cgpa}</p>
            )}
          </div>
        ))}
      </div>
    </DashboardCard>
  );
}