import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";

interface QuickActionCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
}

export default function QuickActionCard({ title, description, icon: Icon, href }: QuickActionCardProps) {
  return (
    <Link href={href} className="group rounded-2xl border border-white/[0.08] bg-white/[0.035] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-cyan-400/[0.05]">
      <div className="flex items-start justify-between gap-4">
        <div className="grid size-11 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/10"><Icon className="size-5" /></div>
        <ArrowUpRight className="size-5 text-zinc-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
      </div>
      <h3 className="mt-5 text-base font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
    </Link>
  );
}
