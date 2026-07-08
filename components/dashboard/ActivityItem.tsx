import { LucideIcon } from "lucide-react";

interface ActivityItemProps {
  title: string;
  description: string;
  time: string;
  icon: LucideIcon;
}

export default function ActivityItem({
  title,
  description,
  time,
  icon: Icon,
}: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-4 transition-all duration-300 hover:border-violet-600">
      <div className="rounded-lg bg-violet-600/20 p-2">
        <Icon className="h-5 w-5 text-violet-500" />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          {description}
        </p>

        <p className="mt-2 text-xs text-zinc-500">
          {time}
        </p>
      </div>
    </div>
  );
}