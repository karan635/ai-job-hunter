"use client";

import { useEffect, useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import DifficultyBadge from "@/components/interview/DifficultyBadge";
import InterviewQuestionCard from "@/components/interview/InterviewQuestionCard";
import InterviewTipsCard from "@/components/interview/InterviewTipsCard";
import ResumeSelector from "@/components/job-match/ResumeSelector";
import { Button } from "@/components/ui/button";

interface Resume { id: string; file_name: string; }
interface InterviewPrep {
  technical_questions: { question: string; answer: string }[];
  behavioral_questions: { question: string; answer: string }[];
  hr_questions: { question: string; answer: string }[];
  coding_questions: { question: string; answer: string }[];
  difficulty: string;
  tips: string[];
}

export default function InterviewPrepPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobUrl, setJobUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [interviewPrep, setInterviewPrep] = useState<InterviewPrep | null>(null);

  useEffect(() => {
    fetch("/api/resumes")
      .then((res) => res.ok ? res.json() : Promise.reject(new Error("Failed to fetch resumes")))
      .then((data) => {
        setResumes(data);
        if (data.length) setSelectedResume(data[0].id);
      })
      .catch(console.error);
  }, []);

  async function generateInterviewPrep() {
    if (!selectedResume || (!jobDescription.trim() && !jobUrl.trim())) {
      alert("Please select a resume and add a job posting URL or description.");
      return;
    }
    try {
      setLoading(true);
      const response = await fetch("/api/interview-prep", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resumeId: selectedResume, jobDescription, jobUrl }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to generate interview preparation.");
      setInterviewPrep(data);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Something went wrong.");
    } finally { setLoading(false); }
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/70 via-zinc-900 to-cyan-950/40 p-8 shadow-2xl shadow-violet-950/20">
        <div className="absolute -right-12 -top-16 size-48 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative flex items-start gap-4"><div className="rounded-2xl bg-violet-400/15 p-3 text-violet-200"><Sparkles className="size-7" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Practice with purpose</p><h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">AI Interview Preparation</h1><p className="mt-3 max-w-2xl text-zinc-300">Turn a job posting and your resume into realistic questions, ready-to-use answers, and a focused practice plan.</p></div></div>
      </section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/10 sm:p-8">
        <ResumeSelector resumes={resumes} selectedResumeId={selectedResume} setSelectedResumeId={setSelectedResume} />
        <div className="mt-7 grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2"><label className="mb-3 flex items-center gap-2 text-sm font-semibold text-white"><Link2 className="size-4 text-violet-300" /> Job posting URL</label><input type="url" value={jobUrl} onChange={(event) => setJobUrl(event.target.value)} placeholder="https://company.com/careers/..." className="w-full rounded-2xl border border-zinc-700 bg-zinc-950 px-4 py-3.5 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20" /><p className="mt-2 text-xs leading-5 text-zinc-500">We’ll extract the details from the posting automatically.</p></div>
          <div className="lg:col-span-3"><label className="mb-3 block text-sm font-semibold text-white">Or paste the job description</label><textarea rows={5} value={jobDescription} onChange={(event) => setJobDescription(event.target.value)} className="w-full resize-none rounded-2xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20" placeholder="Paste the role, responsibilities, and required skills..." /></div>
        </div>
        <Button onClick={generateInterviewPrep} disabled={loading} className="mt-7 w-full rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-500 py-6 text-base font-semibold text-white shadow-lg shadow-violet-900/30 transition hover:from-violet-500 hover:to-indigo-400">{loading ? "Building your interview plan..." : "Generate interview preparation"}</Button>
      </section>

      {interviewPrep && <div className="space-y-8"><DifficultyBadge difficulty={interviewPrep.difficulty} /><InterviewQuestionCard title="Technical Questions" questions={interviewPrep.technical_questions} /><InterviewQuestionCard title="Behavioral Questions" questions={interviewPrep.behavioral_questions} /><InterviewQuestionCard title="HR Questions" questions={interviewPrep.hr_questions} /><InterviewQuestionCard title="Coding Questions" questions={interviewPrep.coding_questions} /><InterviewTipsCard tips={interviewPrep.tips} /></div>}
    </div>
  );
}
