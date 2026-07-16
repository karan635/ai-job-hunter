import Link from "next/link";
import { BriefcaseBusiness } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-[#070710] px-6 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-zinc-500 sm:flex-row">
        <Link href="/" className="flex items-center gap-2 font-semibold text-zinc-200">
          <BriefcaseBusiness className="size-5 text-violet-400" />
          AI Job Hunter
        </Link>
        <p>Build a job search that works as hard as you do.</p>
      </div>
    </footer>
  );
}
