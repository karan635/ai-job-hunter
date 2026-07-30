"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import type { Resume } from "@/app/dashboard/resume/page";

interface UploadResumeProps {
  setResumes: React.Dispatch<
    React.SetStateAction<Resume[]>
  >;
}

export default function UploadResume({
  setResumes,
}: UploadResumeProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { user } = useUser();

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file || !user) return;

    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("userId", user.id);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      setResumes((prev) => [result.resume, ...prev]);

      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="rounded-3xl border-2 border-dashed border-violet-400/30 bg-gradient-to-br from-violet-950/20 to-zinc-900/60 p-10 transition hover:border-violet-400/60">
      <div className="flex flex-col items-center">

        <div className="rounded-2xl bg-violet-400/10 p-4"><UploadCloud className="h-10 w-10 text-violet-300" /></div><h2 className="mt-5 text-xl font-semibold text-white">Add a resume</h2><p className="mt-2 text-center text-sm text-zinc-400">PDF, DOC, or DOCX — we’ll analyze it for ATS-ready insights.</p>

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          onClick={openFilePicker}
          className="mt-6 rounded-xl bg-violet-600 px-6 shadow-lg shadow-violet-950/40 hover:bg-violet-500"
        >
          Browse Files
        </Button>

      </div>
    </div>
  );
}
