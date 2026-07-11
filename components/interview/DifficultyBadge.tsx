interface DifficultyBadgeProps {
  difficulty: string;
}

export default function DifficultyBadge({
  difficulty,
}: DifficultyBadgeProps) {
  const color =
    difficulty === "Beginner"
      ? "bg-green-500"
      : difficulty === "Intermediate"
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-3">
        Difficulty Level
      </h2>

      <span
        className={`px-4 py-2 rounded-full text-white ${color}`}
      >
        {difficulty}
      </span>
    </div>
  );
}