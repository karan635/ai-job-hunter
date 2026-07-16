"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BriefcaseBusiness,
  FilePenLine,
  FileText,
  History,
  LayoutDashboard,
  Mic,
  Settings,
  Target,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

const menu = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Resume", href: "/dashboard/resume", icon: FileText },
  { title: "Job Match", href: "/dashboard/job-match", icon: Target },
  { title: "Job History", href: "/dashboard/job-history", icon: History },
  { title: "Cover Letters", href: "/dashboard/cover-letter", icon: FilePenLine },
  { title: "Cover Letter History", href: "/dashboard/cover-letter-history", icon: History },
  { title: "Interview Prep", href: "/dashboard/interview-prep", icon: Mic },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
];

export default function Sidebar() {
  const { user, isLoaded } = useUser();
  const pathname = usePathname();

  if (!isLoaded) return null;

  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col border-r border-white/[0.08] bg-[#0c0c14] md:flex">
      <div className="border-b border-white/[0.08] p-6">
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
          <div className="rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 p-2 shadow-lg shadow-violet-500/20">
            <BriefcaseBusiness className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight text-white">AI Job Hunter</h1>
            <p className="text-xs text-zinc-500">AI career assistant</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-5">
        {menu.map((item) => {
          const isActive = item.href === "/dashboard"
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-900/20"
                  : "text-zinc-400 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <Icon className="size-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-white/[0.08] p-4">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.035] p-3">
          <UserButton />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{user?.fullName}</p>
            <p className="truncate text-xs text-zinc-500">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
