"use client";

import { useEffect, useState } from "react";
import DifficultyBadge from "@/components/interview/DifficultyBadge";
import InterviewQuestionCard from "@/components/interview/InterviewQuestionCard";
import InterviewTipsCard from "@/components/interview/InterviewTipsCard";




interface Resume {
  id: string;
  file_name: string;
}

interface InterviewPrep {
  technical_questions: {
    question: string;
    answer: string;
  }[];
  behavioral_questions: {
    question: string;
    answer: string;
  }[];
  hr_questions: {
    question: string;
    answer: string;
  }[];
  coding_questions: {
    question: string;
    answer: string;
  }[];
  difficulty: string;
  tips: string[];
}

export default function InterviewPrepPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [selectedResume, setSelectedResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  

  const [loading, setLoading] = useState(false);
  const [interviewPrep, setInterviewPrep] =
    useState<InterviewPrep | null>(null);

  useEffect(() => {
    const loadResumes = async () => {
      try {
        const res = await fetch("/api/resumes");

        if (!res.ok) {
          throw new Error("Failed to fetch resumes");
        }

        const data = await res.json();
        setResumes(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadResumes();
  }, []);

  async function generateInterviewPrep() {
    if (!selectedResume || !jobDescription) {
      alert("Please select a resume and enter a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/interview-prep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resumeId: selectedResume,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate interview preparation.");
      }

      setInterviewPrep(data);
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      <h1 className="text-4xl font-bold mb-8 text-white">
        AI Interview Preparation
      </h1>

      {/* Resume Selector */}

      <div className="mb-6">
        <label className="block mb-2 text-white font-medium">
          Select Resume
        </label>

        <select
          value={selectedResume}
          onChange={(e) => setSelectedResume(e.target.value)}
          className="w-full border rounded-lg p-3 shadow-sm text-white bg-gray-800"
        >
          <option value="">Choose Resume</option>

          {resumes.map((resume) => (
            <option
              key={resume.id}
              value={resume.id}
            >
              {resume.file_name}
            </option>
          ))}
        </select>
      </div>

      {/* Job Description */}

      <div className="mb-6">
        <label className="block mb-2 text-white font-medium ">
          Job Description
        </label>

        <textarea
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full border rounded-lg p-3 text-white bg-gray-800 shadow-sm"
          placeholder="Paste job description here..."
        />
      </div>

      <button
        onClick={generateInterviewPrep}
        disabled={loading}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 disabled:opacity-50"
      >
        {loading
          ? "Generating..."
          : "Generate Interview Preparation"}
      </button>

      {/* Temporary JSON Output */}

      {interviewPrep && (
        <div className="mt-10 space-y-8">
            <DifficultyBadge
                difficulty={interviewPrep.difficulty}
            />
            <InterviewQuestionCard
                title="💻 Technical Questions"
                questions={interviewPrep.technical_questions}
            />
            <InterviewQuestionCard
                title="🧠 Behavioral Questions"
                questions={interviewPrep.behavioral_questions}
            />
            <InterviewQuestionCard
                title="👨‍💼 HR Questions"
                questions={interviewPrep.hr_questions}
            />
            <InterviewQuestionCard
                title="💻 Coding Questions"
                questions={interviewPrep.coding_questions}
            />
            <InterviewTipsCard
                tips={interviewPrep.tips}
            />
        </div>
      )}
    </div>
  );
}