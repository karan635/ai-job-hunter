import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { generateCoverLetter } from "@/lib/generateCoverLetter";
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

    const { resumeId, jobUrl } = await request.json();

    if (typeof resumeId !== "string" || !resumeId) {
      return NextResponse.json(
        { error: "Resume is required." },
        { status: 400 }
      );
    }

    if (typeof jobUrl !== "string" || !jobUrl.trim()) {
      return NextResponse.json(
        { error: "A job posting URL is required." },
        { status: 400 }
      );
    }

    const jobDescription = await scrapeJobDescription(jobUrl.trim());

    // Fetch selected resume and its analysis
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

    // Generate Cover Letter
    const generatedLetter = await generateCoverLetter(
      resumeAnalysis,
      jobDescription
    );

    // Save Cover Letter to Database
    const { error: saveError } = await supabaseAdmin
      .from("cover_letters")
      .insert({
        user_id: userId,
        resume_id: resumeId,
        job_title: generatedLetter.jobTitle,
        company_name: generatedLetter.companyName,
        content: generatedLetter.coverLetter,
      });

    if (saveError) {
      console.error(
        "Failed to save cover letter:",
        saveError
      );
    }

    return NextResponse.json({
      coverLetter: generatedLetter.coverLetter,
    });

  } catch (error) {
    console.error("Cover Letter API Error:", error);

    if (error instanceof FirecrawlError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json(
      {
        error: "Something went wrong.",
      },
      {
        status: 500,
      }
    );
  }
}
