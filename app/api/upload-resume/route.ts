import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
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

    // Save metadata to database
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

    const resumeText = await extractTextFromPDF(buffer);


    console.log("========== AI ANALYSIS ==========");
    const analysis = await analyzeResume(resumeText);
    console.dir(analysis, { depth: null });
    console.log("================================");  

    return NextResponse.json({
      success: true,
      resume,
      analysis,
    });

  } catch (error) {
    console.error("UPLOAD API ERROR:", error);


    return NextResponse.json(
      {  error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}