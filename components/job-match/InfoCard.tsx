interface InfoCardProps {
  title: string;
  items: string[];
  icon: string;
}

export default function InfoCard({
  title,
  items,
  icon,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <h3 className="mb-5 text-xl font-semibold text-white">
        {icon} {title}
      </h3>

      <ul className="space-y-3">
        {items.length > 0 ? (
          items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 rounded-lg bg-zinc-800 p-3"
            >
              <span className="text-violet-400">•</span>
              <span className="text-zinc-300">{item}</span>
            </li>
          ))
        ) : (
          <p className="text-zinc-400">
            No data available.
          </p>
        )}
      </ul>
    </div>
  );
}