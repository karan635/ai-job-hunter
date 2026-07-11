interface Question {
  question: string;
  answer: string;
}

interface InterviewQuestionCardProps {
  title: string;
  questions: Question[];
}

export default function InterviewQuestionCard({
  title,
  questions,
}: InterviewQuestionCardProps) {
  return (
    <div className="border rounded-xl p-6 mb-6 bg-card">
      <h2 className="text-2xl font-bold mb-6">
        {title}
      </h2>

      {questions.map((item, index) => (
        <div
          key={index}
          className="mb-6 border-b pb-6 last:border-none"
        >
          <h3 className="font-semibold text-lg">
            Q{index + 1}. {item.question}
          </h3>

          <p className="mt-3 text-muted-foreground">
            {item.answer}
          </p>
        </div>
      ))}
    </div>
  );
}