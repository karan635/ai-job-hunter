"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import ResumeSelector from "@/components/job-match/ResumeSelector";
import MatchScoreCard from "@/components/job-match/MatchScoreCard";
import SkillsCard from "@/components/job-match/SkillsCard";
import InfoCard from "@/components/job-match/InfoCard";
import FeedbackCard from "@/components/job-match/FeedbackCard";

import { getUserResumes } from "@/services/resume.service";
import type { Resume } from "@/app/dashboard/resume/page";

interface JobMatchResult {
  company : string;
  role : string;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  resume_strengths: string[];
  improvements: string[];
  overall_feedback: string;
}

export default function JobMatchPage() {
  const { user } = useUser();

  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<JobMatchResult | null>(null);

  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResumeId, setSelectedResumeId] = useState("");

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

  const handleAnalyze = async () => {
    if (!selectedResumeId) {
      alert("Please select a resume.");
      return;
    }

    if (!jobDescription.trim()) {
      alert("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/job-match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobDescription,
          resumeId: selectedResumeId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Analysis failed");
      }

      setResult(data);
    } catch (error) {
      console.error(error);
      alert("Job Match failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          🎯 AI Job Match Analyzer
        </h1>

        <p className="mt-2 text-zinc-400">
          Compare your resume with any job description using AI.
        </p>
      </div>

      {/* Input Section */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
        <ResumeSelector
          resumes={resumes}
          selectedResumeId={selectedResumeId}
          setSelectedResumeId={setSelectedResumeId}
        />

        <div className="mt-6">
          <label className="mb-3 block text-lg font-semibold text-white">
            Paste Job Description
          </label>

          <textarea
            rows={14}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the complete job description here..."
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 p-5 text-white outline-none transition-all duration-300 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
          />

          <Button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-6 w-full rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 py-6 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:from-violet-700 hover:to-indigo-700 disabled:opacity-50"
          >
            {loading ? "Analyzing Resume..." : "🚀 Analyze Job Match"}
          </Button>
        </div>
      </div>
      {/* Results */}
{result && (
  <div className="space-y-6">

    {/* Company & Role */}
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm uppercase tracking-wide text-violet-400">
            Company
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {result.company}
          </h2>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-violet-400">
            Role
          </p>

          <h2 className="mt-2 text-3xl font-bold text-white">
            {result.role}
          </h2>
        </div>
      </div>
    </div>

    {/* Match Score */}
    <MatchScoreCard score={result.match_score} />

    {/* Skills */}
    <div className="grid gap-6 lg:grid-cols-2">
      <SkillsCard
        title="✅ Matching Skills"
        skills={result.matching_skills}
        type="match"
      />

      <SkillsCard
        title="❌ Missing Skills"
        skills={result.missing_skills}
        type="missing"
      />
    </div>

    {/* Resume Strengths & Suggestions */}
    <div className="grid gap-6 lg:grid-cols-2">
      <InfoCard
        title="Resume Strengths"
        icon="💪"
        items={result.resume_strengths}
      />

      <InfoCard
        title="AI Suggestions"
        icon="💡"
        items={result.improvements}
      />
    </div>

    {/* Overall Feedback */}
    <FeedbackCard
      feedback={result.overall_feedback}
    />

  </div>
)
}
    </div>
  );
}
