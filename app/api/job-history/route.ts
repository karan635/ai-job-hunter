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

    const { data, error } = await supabaseAdmin
      .from("job_matches")
      .select(`
        id,
        company,
        role,
        match_score,
        created_at,
        resume_id,
        resumes!inner (
          user_id
        )
      `)
      .eq("resumes.user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      throw error;
    }

    return NextResponse.json(
      data.map((item) => ({
        id: item.id,
        company: item.company,
        role: item.role,
        match_score: item.match_score,
        created_at: item.created_at,
      }))
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}