import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function QuickActionCard({
  title,
  description,
  icon: Icon,
}: QuickActionCardProps) {
  return (
    <Card className="group cursor-pointer border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-violet-600 hover:scale-[1.02]">
      <CardContent className="flex items-center justify-between p-6">
        <div>
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600/20">
            <Icon className="text-violet-500" size={24} />
          </div>

          <h3 className="text-lg font-semibold text-white">
            {title}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">
            {description}
          </p>
        </div>

        <ArrowRight className="text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-violet-500" />
      </CardContent>
    </Card>
  );
}