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
    <Card className="group overflow-hidden border-white/[0.08] bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-violet-400/35 hover:bg-violet-500/[0.06]">
      <CardContent className="relative p-5">
        <div className="absolute right-0 top-0 size-24 rounded-full bg-violet-500/[0.08] blur-2xl transition group-hover:bg-violet-500/[0.15]" />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">
              {title}
            </p>

            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white">
              {value}
            </h2>

            <p className="mt-1 text-sm text-zinc-500">
              {subtitle}
            </p>
          </div>

          <div className="rounded-2xl border border-violet-300/15 bg-violet-500/15 p-3">
            <Icon
              className="text-violet-300"
              size={24}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
