import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Total Resumes
    const { count: totalResumes } = await supabaseAdmin
      .from("resumes")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Total Job Matches
    const { count: totalJobMatches } = await supabaseAdmin
      .from("job_matches")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);

    // Total Cover Letters
    const { count: totalCoverLetters } = await supabaseAdmin
      .from("cover_letters")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);


    // Average ATS Score
    const { data: atsData } = await supabaseAdmin
      .from("resume_analysis")
      .select("ats_score");

    const averageATS =
      atsData && atsData.length > 0
        ? Math.round(
            atsData.reduce(
              (sum, item) => sum + (item.ats_score ?? 0),
              0
            ) / atsData.length
          )
        : 0;

    return NextResponse.json({
      totalResumes: totalResumes ?? 0,
      totalJobMatches: totalJobMatches ?? 0,
      totalCoverLetters: totalCoverLetters ?? 0,
      averageATS,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);

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