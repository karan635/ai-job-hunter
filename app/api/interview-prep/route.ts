import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateInterviewPrep } from "@/lib/generateInterviewPrep";
import { FirecrawlError, scrapeJobDescription } from "@/lib/firecrawl";

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { resumeId, jobDescription, jobUrl } = await request.json();

    if (!resumeId) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    const pastedJobDescription = typeof jobDescription === "string" ? jobDescription.trim() : "";
    const submittedJobUrl = typeof jobUrl === "string" ? jobUrl.trim() : "";

    if (!pastedJobDescription && !submittedJobUrl) {
      return NextResponse.json(
        { error: "Paste a job description or provide a job posting URL." },
        { status: 400 }
      );
    }

    const resolvedJobDescription = submittedJobUrl
      ? await scrapeJobDescription(submittedJobUrl)
      : pastedJobDescription;

    // Fetch selected resume
    const { data: resume, error: resumeError } =
      await supabaseAdmin
        .from("resumes")
        .select(`
          id,
          resume_analysis (
            analysis
          )
        `)
        .eq("id", resumeId)
        .eq("user_id", userId)
        .single();

    if (resumeError || !resume) {
      return NextResponse.json(
        { error: "Resume not found." },
        { status: 404 }
      );
    }

    const resumeAnalysis =
      resume.resume_analysis?.[0]?.analysis;

    if (!resumeAnalysis) {
      return NextResponse.json(
        { error: "Resume analysis not found." },
        { status: 404 }
      );
    }

    const interviewPrep = await generateInterviewPrep(
      resumeAnalysis,
      resolvedJobDescription
    );

    return NextResponse.json(interviewPrep);

  } catch (error) {
    console.error(error);

    if (error instanceof FirecrawlError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
