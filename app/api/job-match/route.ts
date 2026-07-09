import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { analyzeJobMatch } from "@/lib/analyzeJobMatch";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { jobDescription } = await request.json();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    // Get latest analyzed resume
    const { data: resume, error: resumeError } =
      await supabaseAdmin
        .from("resumes")
        .select(`
          id,
          resume_analysis (
            analysis
          )
        `)
        .eq("user_id", userId)
        .order("uploaded_at", {
          ascending: false,
        })
        .limit(1)
        .single();

    if (resumeError || !resume) {
      return NextResponse.json(
        { error: "No analyzed resume found." },
        { status: 404 }
      );
    }

    const resumeAnalysis =
      resume.resume_analysis?.[0]?.analysis;
    console.log(JSON.stringify(resume, null, 2));

    if (!resumeAnalysis) {
      return NextResponse.json(
        { error: "Resume analysis not found." },
        { status: 404 }
      );
    }

    // AI Job Match
    const result = await analyzeJobMatch(
      resumeAnalysis,
      jobDescription
    );

    // Save result
    await supabaseAdmin
      .from("job_matches")
      .insert({
        resume_id: resume.id,
        job_description: jobDescription,
        match_score: result.match_score,
        analysis: result,
      });

    return NextResponse.json(result);

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}