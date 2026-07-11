interface InterviewTipsCardProps {
  tips: string[];
}

export default function InterviewTipsCard({
  tips,
}: InterviewTipsCardProps) {
  return (
    <div className="border rounded-xl p-6 bg-card">
      <h2 className="text-2xl font-bold mb-5">
        Interview Tips
      </h2>

      <ul className="space-y-3">
        {tips.map((tip, index) => (
          <li
            key={index}
            className="flex gap-3"
          >
            <span>✅</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}