"use client";

import { useState } from "react";

import ResumeHeader from "@/components/resume/ResumeHeader";
import UploadResume from "@/components/resume/UploadResume";
import ResumeList from "@/components/resume/ResumeList ";

export default function ResumePage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  return (
    <>
      <ResumeHeader />

      <UploadResume
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />

      <ResumeList selectedFile={selectedFile} />
    </>
  );
}