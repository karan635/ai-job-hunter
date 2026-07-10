"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import MatchScoreCard from "@/components/job-match/MatchScoreCard";
import SkillsCard from "@/components/job-match/SkillsCard";
import InfoCard from "@/components/job-match/InfoCard";
import FeedbackCard from "@/components/job-match/FeedbackCard";
import { Button } from "@/components/ui/button";

interface JobHistoryReport {
  id: string;
  company: string;
  role: string;
  created_at: string;
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  resume_strengths: string[];
  improvements: string[];
  overall_feedback: string;
}

export default function JobHistoryReportPage() {
  const { id } = useParams();

  const [report, setReport] = useState<JobHistoryReport | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadReport = async () => {
      try {
        const response = await fetch(`/api/job-history/${id}`);

        if (!response.ok) {
          throw new Error("Unable to load report");
        }

        const data = await response.json();

        setReport(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center text-zinc-400">
        Loading report...
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center text-red-400">
        Report not found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-10">

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Job Match Report
          </h1>

          <p className="mt-2 text-zinc-400">
            View your previous AI Job Match analysis.
          </p>
        </div>

        <Link href="/dashboard/job-history">
          <Button variant="outline">
            ← Back
          </Button>
        </Link>
      </div>

      {/* Company & Role */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <p className="text-sm uppercase tracking-wide text-violet-400">
              Company
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {report.company}
            </h2>
          </div>

          <div>
            <p className="text-sm uppercase tracking-wide text-violet-400">
              Role
            </p>

            <h2 className="mt-2 text-3xl font-bold text-white">
              {report.role}
            </h2>
          </div>

        </div>
      </div>

      <MatchScoreCard
        score={report.match_score}
      />

      <div className="grid gap-6 lg:grid-cols-2">

        <SkillsCard
          title="✅ Matching Skills"
          skills={report.matching_skills}
          type="match"
        />

        <SkillsCard
          title="❌ Missing Skills"
          skills={report.missing_skills}
          type="missing"
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <InfoCard
          title="Resume Strengths"
          icon="💪"
          items={report.resume_strengths}
        />

        <InfoCard
          title="AI Suggestions"
          icon="💡"
          items={report.improvements}
        />

      </div>

      <FeedbackCard
        feedback={report.overall_feedback}
      />

    </div>
  );
}