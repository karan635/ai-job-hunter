"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ResumeHeader() {
  return (
    <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Resume Workspace
        </h1>

        <p className="mt-2 text-zinc-400">
          Upload, organize and analyze your resumes with AI.
        </p>
      </div>

      <Button className="bg-violet-600 hover:bg-violet-700">
        <Upload className="mr-2 h-4 w-4" />
        Upload Resume
      </Button>
    </div>
  );
}