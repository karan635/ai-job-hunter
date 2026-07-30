
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

  const [jobUrl, setJobUrl] = useState("");

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

    if (!jobUrl.trim()) {
      alert("Please enter a job posting URL.");
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
          jobUrl,
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
      alert(error instanceof Error ? error.message : "Unable to generate cover letter.");
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
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/70 via-zinc-900 to-indigo-950/50 p-8 shadow-2xl shadow-violet-950/20">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Tailored applications</p>
        <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
          ✍️ AI Cover Letter Generator
        </h1>

        <p className="mt-2 text-zinc-400">
          Generate a personalized cover letter in seconds.
        </p>
      </div>

      <div className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/10 sm:p-8">
        <ResumeSelector
          resumes={resumes}
          selectedResumeId={selectedResumeId}
          setSelectedResumeId={setSelectedResumeId}
        />

        <div className="mt-6">
          <label className="mb-3 block text-lg font-semibold text-white">
            Job Posting URL
          </label>

          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            placeholder="https://company.com/careers/jobs/..."
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20"
          />

          <p className="mt-2 text-sm text-zinc-400">
            We’ll use Firecrawl to extract the job description from this page.
          </p>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 py-6 text-base shadow-lg shadow-violet-900/30"
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
