"use client";
import { Target } from "lucide-react";
import { History } from "lucide-react";


import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  BriefcaseBusiness,
  FilePenLine,
  Mic,
  Settings,
} from "lucide-react";

import {
  UserButton,
  useUser,
} from "@clerk/nextjs";

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

    title: "Jobs-Match",

    href: "/dashboard/job-match",

    icon: Target,

  },

  {
    title: "Job History",

    href: "/dashboard/job-history",

    icon: History,
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

  // ✅ STEP 3 GOES HERE
  const { user , isLoaded } = useUser();
  if (!isLoaded) return null;

  return (

    // Sidebar starts here
    <aside className="fixed left-0 top-0 h-screen w-72 border-r border-zinc-800 bg-zinc-950 flex flex-col">

      {/* Logo */}
    <div className="border-b border-zinc-800 p-6">
        <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
            <div className="rounded-xl bg-violet-600 p-2">
                <BriefcaseBusiness className="h-6 w-6 text-white" />
            </div>

            <div>
                <h1 className="text-xl font-bold text-white">
                    AI Job Hunter
                </h1>

                <p className="text-xs text-zinc-400">
                 AI Career Assistant
                </p>
            </div>
        </Link>
  </div>

      {/* Navigation */}
      <nav className="space-y-2 px-4">

        {menu.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-4 py-3 text-zinc-400 hover:bg-violet-600 hover:text-white"
          >
            <item.icon size={20} />
            {item.title}
          </Link>
        ))}

      </nav>

    
      <div className="mt-auto border-t border-zinc-800 p-4">
        <div className="flex items-center gap-3">

          <UserButton />

          <div>
            <p className="text-sm font-semibold text-white">
              {user?.fullName}
            </p>

            <p className="text-xs text-zinc-400">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>

        </div>
      </div>

    </aside>
  );
}