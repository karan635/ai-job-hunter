import DashboardCard from "./DashboardCard";

interface SummaryCardProps {
  summary: string;
}

export default function SummaryCard({
  summary,
}: SummaryCardProps) {
  return (
    <DashboardCard title="Professional Summary">
      <p className="leading-7 text-gray-600 dark:text-gray-300">
        {summary}
      </p>
    </DashboardCard>
  );
}