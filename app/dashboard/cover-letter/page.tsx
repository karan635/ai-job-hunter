
"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import ResumeSelector from "@/components/job-match/ResumeSelector";

import { getUserResumes } from "@/services/resume.service";
import type { Resume } from "@/app/dashboard/resume/page";

import CoverLetterCard from "@/components/cover-letter/CoverLetterCard";
import jsPDF from "jspdf";

export default function CoverLetterPage() {
  const { user } = useUser();

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    const loadResumes = async () => {
      try {
        const data = await getUserResumes(user.id);

        setResumes(data || []);

        if (data?.length) {
          setSelectedResumeId(data[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadResumes();
  }, [user]);

  const handleGenerate = async () => {
    if (!selectedResumeId) {
      alert("Please select a resume.");
      return;
    }

    if (!companyName.trim()) {
      alert("Please enter the company name.");
      return;
    }

    if (!jobTitle.trim()) {
      alert("Please enter the job title.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/cover-letter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: selectedResumeId,
          companyName,
          jobTitle,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to generate cover letter."
        );
      }

      setCoverLetter(data.coverLetter);
    } catch (error) {
      console.error(error);
      alert("Unable to generate cover letter.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(coverLetter);
    alert("Cover letter copied!");
  };

  const downloadCoverLetter = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("AI Generated Cover Letter", 20, 20);

    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(coverLetter, 170);
    doc.text(lines, 20, 35);

    doc.save("cover-letter.pdf");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          ✍️ AI Cover Letter Generator
        </h1>

        <p className="mt-2 text-zinc-400">
          Generate a personalized cover letter in seconds.
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <ResumeSelector
          resumes={resumes}
          selectedResumeId={selectedResumeId}
          setSelectedResumeId={setSelectedResumeId}
        />

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-3 block text-lg font-semibold text-white">
              Company Name
            </label>

            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Google"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="mb-3 block text-lg font-semibold text-white">
              Job Title
            </label>

            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. Frontend Developer"
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-violet-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="mb-3 block text-lg font-semibold text-white">
            Job Description
          </label>

          <textarea
            rows={12}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description..."
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white outline-none focus:border-violet-500"
          />

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full bg-gradient-to-r from-violet-600 to-indigo-600"
          >
            {loading ? "Generating..." : "✨ Generate Cover Letter"}
          </Button>
        </div>
      </div>

      {coverLetter && (
        <CoverLetterCard
          coverLetter={coverLetter}
          onCopy={copyToClipboard}
          onDownload={downloadCoverLetter}
          onRegenerate={handleGenerate}
          loading={loading}
        />
      )}
    </div>
  );
}
