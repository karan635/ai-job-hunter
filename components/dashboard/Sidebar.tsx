"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  FilePenLine,
  Mic,
  Settings,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Resume",
    href: "/dashboard/resume",
    icon: FileText,
  },
  {
    title: "Jobs",
    href: "/dashboard/jobs",
    icon: BriefcaseBusiness,
  },
  {
    title: "Cover Letters",
    href: "/dashboard/cover-letter",
    icon: FilePenLine,
  },
  {
    title: "Interview",
    href: "/dashboard/interview",
    icon: Mic,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 border-r border-zinc-800 bg-zinc-950">
      <div className="p-6">

        <h1 className="text-2xl font-bold text-white">
          AI Job Hunter
        </h1>

      </div>

      <nav className="space-y-2 px-4">

        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 transition hover:bg-violet-600 hover:text-white"
          >
            <item.icon size={20} />

            {item.title}
          </Link>
        ))}

      </nav>
    </aside>
  );
}