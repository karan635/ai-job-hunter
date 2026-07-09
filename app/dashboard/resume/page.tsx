"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import ResumeHeader from "@/components/resume/ResumeHeader";
import UploadResume from "@/components/resume/UploadResume";
import ResumeList from "@/components/resume/ResumeList ";
import { getUserResumes } from "@/services/resume.service";

export interface Resume {
  id: string;
  file_name: string;
  file_size: number;
  status: string;
  uploaded_at: string;

  resume_analysis?: {
    ats_score: number;
  }[];
}

export default function ResumePage() {
  const { user } = useUser();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadResumes = async () => {
      try {
        const data = await getUserResumes(user.id);
        setResumes(data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadResumes();
  }, [user]);

  return (
    <>
      <ResumeHeader />

      <UploadResume setResumes={setResumes} />

      <ResumeList
        resumes={resumes}
        loading={loading}
        setResumes={setResumes}
      />
    </>
  );
}