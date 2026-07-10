"use client";

import { useEffect, useState } from "react";
import JobHistoryCard from "@/components/job-match/JobHistoryCard";

interface JobHistory {
  id: string;
  company: string;
  role: string;
  match_score: number;
  created_at: string;
}

export default function JobHistoryPage() {
  const [history, setHistory] = useState<JobHistory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const response = await fetch("/api/job-history");

        if (!response.ok) {
          throw new Error("Failed to fetch history");
        }

        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-zinc-400">
        Loading Job History...
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center">
        <h2 className="text-2xl font-bold text-white">
          No Job Match History
        </h2>

        <p className="mt-3 text-zinc-400">
          Analyze your first job description to see your history here.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-white">
          📜 Job Match History
        </h1>

        <p className="mt-2 text-zinc-400">
          Review all your previous AI Job Match analyses.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {history.map((item) => (
          <JobHistoryCard
            key={item.id}
            id={item.id}
            company={item.company}
            role={item.role}
            matchScore={item.match_score}
            createdAt={item.created_at}
          />
        ))}
      </div>
    </div>
  );
}