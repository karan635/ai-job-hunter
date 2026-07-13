"use client";

import { useEffect, useState } from "react";

import StatsCard from "./StatsCard";

import {
  FileText,
  Briefcase,
  FileSignature,
  BarChart3,
} from "lucide-react";

interface DashboardStats {
  totalResumes: number;
  totalJobMatches: number;
  totalCoverLetters: number;
  averageATS: number;
}

export default function StatsGrid() {
  const [stats, setStats] = useState<DashboardStats>({
    totalResumes: 0,
    totalJobMatches: 0,
    totalCoverLetters: 0,
    averageATS: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loaddashboardStats = async () => {
      try {
        const res = await fetch("/api/dashboard");

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data.");
        }
        const data = await res.json();
          
        setStats(data);
      }catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      } 
    };
    loaddashboardStats();
  }, []);

  const dashboardStats = [
    {
      title: "Average ATS Score",
      value: loading ? "..." : `${stats.averageATS}%`,
      subtitle: "Across all resumes",
      icon: BarChart3,
    },
    {
      title: "Total Resumes",
      value: loading ? "..." : stats.totalResumes,
      subtitle: "Uploaded",
      icon: FileText,
    },
    {
      title: "Job Matches",
      value: loading ? "..." : stats.totalJobMatches,
      subtitle: "Generated",
      icon: Briefcase,
    },
    {
      title: "Cover Letters",
      value: loading ? "..." : stats.totalCoverLetters,
      subtitle: "Generated",
      icon: FileSignature,
    },
  ];

  return (
    <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {dashboardStats.map((stat) => (
        <StatsCard
          key={stat.title}
          {...stat}
        />
      ))}
    </section>
  );
}