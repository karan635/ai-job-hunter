"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface JobMatchResult {
  match_score: number;
  matching_skills: string[];
  missing_skills: string[];
  resume_strengths: string[];
  improvements: string[];
  overall_feedback: string;
}

export default function JobMatchPage() {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);

  const handleAnalyze = async () => {
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
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          🎯 AI Job Match Analyzer
        </h1>

        <p className="mt-2 text-zinc-400">
          Compare your resume with any job description using AI.
        </p>
      </div>

      {/* Input Card */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
        <label className="mb-3 block text-lg font-semibold text-white">
          Paste Job Description
        </label>

        <textarea
          rows={15}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the complete job description here..."
          className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-violet-500"
        />

        <Button
          className="mt-6 bg-violet-600 hover:bg-violet-700"
          onClick={handleAnalyze}
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Match"}
        </Button>
      </div>

      {/* Result */}
      {result && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-white">

          <h2 className="text-3xl font-bold text-violet-400">
            Match Score: {result.match_score}%
          </h2>

          {/* Matching Skills */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-green-400">
              ✅ Matching Skills
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {result.matching_skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Missing Skills */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-red-400">
              ❌ Missing Skills
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {result.missing_skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>

          {/* Resume Strengths */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-blue-400">
              💪 Resume Strengths
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {result.resume_strengths.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Suggestions */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-yellow-400">
              💡 Suggestions
            </h3>

            <ul className="mt-3 list-disc space-y-2 pl-5">
              {result.improvements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Feedback */}
          <div className="mt-8 rounded-xl bg-zinc-800 p-5">
            <h3 className="mb-2 text-xl font-semibold">
              📝 Overall Feedback
            </h3>

            <p className="leading-7 text-zinc-300">
              {result.overall_feedback}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}