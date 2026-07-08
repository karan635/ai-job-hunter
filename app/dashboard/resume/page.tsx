"use client";

import { useState } from "react";

import ResumeHeader from "@/components/resume/ResumeHeader";
import UploadResume from "@/components/resume/UploadResume";
import ResumeList from "@/components/resume/ResumeList ";

export interface Resume {
  id: string;
  file_name: string;
  file_size: number;
  status: string;
  uploaded_at: string;
}

export default function ResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resume, setResume] = useState<Resume | null>(null);

  return (
    <>
      <ResumeHeader />

      <UploadResume
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setResume={setResume}
      />

      <ResumeList
        selectedFile={selectedFile}
        resume={resume}
      />
    </>
  );
}