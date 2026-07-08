import DashboardCard from "./DashboardCard";

interface Props {
  title: string;
  items: string[];
}

export default function ListCard({
  title,
  items,
}: Props) {
  return (
    <DashboardCard title={title}>
      <ul className="space-y-2 list-disc pl-5">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </DashboardCard>
  );
}