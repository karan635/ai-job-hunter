import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;

    const { data, error } = await supabaseAdmin
      .from("job_matches")
      .select(`
        id,
        company,
        role,
        match_score,
        analysis,
        created_at,
        resumes!inner (
          user_id
        )
      `)
      .eq("id", id)
      .eq("resumes.user_id", userId)
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json({
        id: data.id,
        company: data.company,
        role: data.role,
        created_at: data.created_at,
        ...data.analysis,
});

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Unable to fetch report." },
      { status: 500 }
    );
  }
}