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
      .from("cover_letters")
      .select(`
        id,
        company_name,
        job_title,
        content,
        created_at
      `)
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error(error);

      return NextResponse.json(
        { error: "Failed to fetch cover letters." },
        { status: 500 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);

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