import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

interface Params {
  params: Promise<{
    id: string;
  }>;
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
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

    // Verify ownership
    const { data: letter, error: findError } =
      await supabaseAdmin
        .from("cover_letters")
        .select("id")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

    if (findError || !letter) {
      return NextResponse.json(
        { error: "Cover letter not found." },
        { status: 404 }
      );
    }

    // Delete cover letter
    const { error: deleteError } = await supabaseAdmin
      .from("cover_letters")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json(
        { error: "Failed to delete cover letter." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Cover letter deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}