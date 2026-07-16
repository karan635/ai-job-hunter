"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, Sparkles, Upload } from "lucide-react";

export default function DashboardHeader() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <section className="relative overflow-hidden rounded-[1.75rem] border border-white/[0.1] bg-gradient-to-br from-violet-600/25 via-[#181522] to-cyan-500/10 p-6 shadow-[0_20px_55px_rgba(0,0,0,0.22)] sm:p-8">
      <div className="absolute -right-16 -top-16 size-56 rounded-full bg-violet-400/15 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 h-px w-40 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent" />

      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm font-medium text-violet-200">
            <Sparkles className="size-4" />
            Career command center
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ""}.
          </h1>
          <p className="mt-3 max-w-xl text-base leading-7 text-zinc-300">
            {today}. Review your progress, sharpen your application, and make your next move count.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/dashboard/resume"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-violet-950 transition hover:-translate-y-0.5 hover:bg-violet-50"
          >
            <Upload className="size-4" />
            Upload resume
          </Link>
          <Link
            href="/dashboard/job-match"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-black/15 px-4 text-sm font-semibold text-white transition hover:border-cyan-200/40 hover:bg-white/[0.08]"
          >
            Match a role <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
