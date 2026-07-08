import { supabaseAdmin } from "@/lib/supabase";

export async function getLatestResumeAnalysis(userId: string) {
  // Get latest resume
  const { data: resume, error: resumeError } = await supabaseAdmin
    .from("resumes")
    .select("*")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false })
    .limit(1)
    .single();

  if (resumeError || !resume) {
    return null;
  }

  // Get analysis
  const { data: analysis, error: analysisError } = await supabaseAdmin
    .from("resume_analysis")
    .select("*")
    .eq("resume_id", resume.id)
    .single();

  if (analysisError || !analysis) {
    return null;
  }

  return {
    resume,
    analysis,
  };
}