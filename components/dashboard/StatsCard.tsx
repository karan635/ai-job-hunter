import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
}: StatsCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 hover:border-violet-600 transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {value}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {subtitle}
            </p>
          </div>

          <div className="rounded-xl bg-violet-600/20 p-3">
            <Icon
              className="text-violet-500"
              size={28}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}