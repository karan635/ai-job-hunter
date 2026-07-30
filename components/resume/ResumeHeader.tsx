"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ResumeHeader() {
  return (
    <div className="relative mb-8 flex flex-col gap-6 overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/70 via-zinc-900 to-cyan-950/40 p-7 shadow-2xl shadow-violet-950/20 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Your career foundation</p><h1 className="mt-2 text-3xl font-bold text-white">
          Resume Workspace
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload, organize and analyze your resumes with AI.
        </p>
      </div>

      <Button className="rounded-xl bg-violet-600 shadow-lg shadow-violet-950/40 hover:bg-violet-500">
        <Upload className="mr-2 h-4 w-4" />
        Upload Resume
      </Button>
    </div>
  );
}
