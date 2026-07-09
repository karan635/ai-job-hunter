import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getLatestResumeAnalysis } from "@/lib/resume-analysis";
import ATSScoreCard from "@/components/dashboard/ATSScoreCard";
import SummaryCard from "@/components/dashboard/SummaryCard";
import SkillsCard from "@/components/dashboard/SkillsCard";
import EducationCard from "@/components/dashboard/EducationCard";
import ExperienceCard from "@/components/dashboard/ExperienceCard";
import ProjectsCard from "@/components/dashboard/ProjectsCard";
import ListCard from "@/components/dashboard/ListCard";

export default async function AnalysisPage() {
  const { userId } = await auth();
  

  if (!userId) {
    redirect("/sign-in");
  }

  const data = await getLatestResumeAnalysis(userId);

  if (!data) {
    return (
      <div className="p-8 text-white">
        No analyzed resume found.
      </div>
    );
  }
  const analysis = data.analysis.analysis;

  return (
    <div className="space-y-6 p-8">
      <h1 className="text-4xl font-bold text-white">
        Resume Analysis
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">
        <ATSScoreCard score={analysis.ats_score} />
        <SummaryCard summary={analysis.summary} />

        <div className="lg:col-span-2">
            <SkillsCard skills={analysis.skills} />
        </div>
        <EducationCard education={analysis.education} />
        <ExperienceCard experience={analysis.experience} />
        <div className="lg:col-span-2">
            <ProjectsCard projects={analysis.projects} />
        </div>  
        <ListCard
            title="💪 Strengths"
            items={analysis.strengths}
        />
        <ListCard
            title="⚠️ Weaknesses"
            items={analysis.weaknesses}
        />
        <div className="lg:col-span-2">
            <ListCard
                title="💡 AI Suggestions"
                items={analysis.suggestions}
            />
        </div>
      </div>
    </div>
  );
}