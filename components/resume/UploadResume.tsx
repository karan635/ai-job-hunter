"use client";

import { useRef } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import type { Resume } from "@/app/dashboard/resume/page";

interface UploadResumeProps {
  selectedFile: File | null;
  setSelectedFile: React.Dispatch<
    React.SetStateAction<File | null>
  >;

  setResume: React.Dispatch<
    React.SetStateAction<Resume | null>
  >;
}

export default function UploadResume({
  selectedFile,
  setSelectedFile,
  setResume,
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
      // Show selected file in UI
      setSelectedFile(file);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("userId", user.id);

      const response = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setResume(result.resume);

      if (!response.ok) {
        throw new Error(result.error || "Upload failed");
      }

      console.log(result);

      alert("Resume uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <div className="rounded-2xl border-2 border-dashed border-zinc-700 bg-zinc-900/40 p-10">
      <div className="flex flex-col items-center">
        <UploadCloud className="h-12 w-12 text-violet-400" />

        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileChange}
        />

        <Button
          onClick={openFilePicker}
          className="mt-6 bg-violet-600"
        >
          Browse Files
        </Button>

        {selectedFile && (
          <p className="mt-4 text-green-400">
            ✅ Resume selected successfully: {selectedFile.name}
          </p>
        )}
      </div>
    </div>
  );
}