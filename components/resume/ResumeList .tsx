import Link from "next/link";
import {
  FileText,
  CalendarDays,
  HardDrive,
  BadgeCheck,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import type { Resume } from "@/app/dashboard/resume/page";

interface ResumeListProps {
  resumes: Resume[];
  loading: boolean;
  setResumes: React.Dispatch<
    React.SetStateAction<Resume[]>
  >;
}


export default function ResumeList({
  resumes,
  loading,
  setResumes,
}: ResumeListProps) {
  if (loading) {
    return (
      <div className="mt-10 text-center text-zinc-400">
        Loading resumes...
      </div>
    );
  }

  const deleteResume = async (resumeId: string) => {
  const confirmDelete = window.confirm(
  "Are you sure you want to delete this resume?\n\nThis action cannot be undone.");

  if (!confirmDelete) return;

  try {
    const response = await fetch("/api/delete-resume", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        resumeId,
      }),
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setResumes((prev) =>
      prev.filter((resume) => resume.id !== resumeId)
    );

    alert("Resume deleted.");
  } catch (error) {
    console.error(error);
    alert("Unable to delete resume.");
  }
};

  if (resumes.length === 0) {
    return (
      <div className="mt-10 rounded-xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <FileText className="mx-auto mb-4 h-12 w-12 text-zinc-500" />

        <h2 className="text-xl font-semibold text-white">
          No resumes uploaded
        </h2>

        <p className="mt-2 text-zinc-400">
          Upload your first resume to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {resumes.map((resume) => (
        <div
          key={resume.id}
          className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition hover:border-violet-500"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-violet-600/20 p-3">
                <FileText className="h-6 w-6 text-violet-400" />
              </div>

              <div>
                <h2 className="font-semibold text-white">
                  {resume.file_name}
                </h2>

                <p className="text-sm text-zinc-400">
                  {(resume.file_size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs font-medium text-green-400">
              {resume.status}
            </span>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-3 text-sm text-zinc-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-violet-400" />

              {new Date(resume.uploaded_at).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <HardDrive className="h-4 w-4 text-violet-400" />

              {(resume.file_size / 1024).toFixed(1)} KB
            </div>

            <div className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-green-400" />

              ATS Score:
              <span className="font-semibold text-white">
                {resume.resume_analysis?.[0]?.ats_score ?? "--"}%
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex gap-3">
            <Button  className="flex-1">
              <Link href={`/dashboard/resume/${resume.id}`}>
                View Analysis
              </Link>
            </Button>

            <Button
              variant="destructive"
              size="icon"
              onClick={() => deleteResume(resume.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}