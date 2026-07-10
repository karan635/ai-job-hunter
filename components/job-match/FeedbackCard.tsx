interface FeedbackCardProps {
  feedback: string;
}

export default function FeedbackCard({
  feedback,
}: FeedbackCardProps) {
  return (
    <div className="rounded-2xl border border-violet-600/20 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">

      <h3 className="mb-4 text-xl font-semibold text-white">
        📝 Overall Feedback
      </h3>

      <p className="leading-8 text-zinc-300">
        {feedback}
      </p>

    </div>
  );
}