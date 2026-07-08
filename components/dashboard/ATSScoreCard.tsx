interface ATSScoreCardProps {
  score: number;
}

export default function ATSScoreCard({
  score,
}: ATSScoreCardProps) {
  return (
    <div className="rounded-xl border bg-white dark:bg-zinc-900 p-6 shadow-sm">
      <h2 className="text-lg font-semibold">
        ATS Score
      </h2>

      <div className="mt-6 flex items-center justify-center">
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-8 border-green-500 text-4xl font-bold">
          {score}
        </div>
      </div>

      <p className="mt-4 text-center text-gray-500">
        {score >= 80
          ? "Excellent Resume 🎉"
          : score >= 60
          ? "Good Resume 👍"
          : "Needs Improvement"}
      </p>
    </div>
  );
}