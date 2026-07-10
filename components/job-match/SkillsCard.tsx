interface SkillsCardProps {
  title: string;
  skills: string[];
  type: "match" | "missing";
}

export default function SkillsCard({
  title,
  skills,
  type,
}: SkillsCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-5 text-xl font-semibold text-white">
        {title}
      </h3>

      <div className="flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span
              key={skill}
              className={`rounded-full px-4 py-2 text-sm font-medium ${
                type === "match"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-zinc-400">
            No skills found.
          </p>
        )}
      </div>
    </div>
  );
}