import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { extractTextFromPDF } from "@/lib/pdf";
import { analyzeResume } from "@/lib/analyzeResume";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json(
        { error: "Missing file or userId" },
        { status: 400 }
      );
    }

    // Create unique storage path
    const storagePath = `${userId}/${Date.now()}-${file.name}`;

    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabaseAdmin.storage
      .from("resume-files")
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      return NextResponse.json(
        { error: uploadError.message },
        { status: 500 }
      );
    }

    // Save Resume Metadata
    const { data: resume, error: dbError } = await supabaseAdmin
      .from("resumes")
      .insert({
        user_id: userId,
        file_name: file.name,
        storage_path: storagePath,
        file_size: file.size,
        status: "uploaded",
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json(
        { error: dbError.message },
        { status: 500 }
      );
    }

    // Extract Resume Text
    const resumeText = await extractTextFromPDF(buffer);

    // Analyze Resume with AI
    const analysis = await analyzeResume(resumeText);

    console.log("========== AI ANALYSIS ==========");
    console.dir(analysis, { depth: null });
    console.log("================================");

    // Save Analysis
    const { error: analysisError } = await supabaseAdmin
      .from("resume_analysis")
      .insert({
        resume_id: resume.id,
        ats_score: analysis.ats_score,
        strengths: analysis.strengths.join("\n"),
        weaknesses: analysis.weaknesses.join("\n"),
        keywords: analysis.skills.join(", "),
        analysis: analysis,
      });

    if (analysisError) {
      console.error("Analysis save failed:", analysisError);
    }

    // Update Resume Status
    const { error: updateError } = await supabaseAdmin
      .from("resumes")
      .update({
        status: "analyzed",
      })
      .eq("id", resume.id);

    if (updateError) {
      console.error("Resume status update failed:", updateError);
    }

    return NextResponse.json({
      success: true,
      resume,
      analysis,
    });

  } catch (error) {
    console.error("UPLOAD API ERROR:", error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}