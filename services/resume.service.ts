import { supabase } from "@/lib/supabase";

export async function uploadResume(
  file: File,
  userId: string
) {
  // Create unique storage path
  const storagePath = `${userId}/${Date.now()}-${file.name}`;

  // Upload file to Supabase Storage
  const { error: uploadError } = await supabase.storage
    .from("resume-files")
    .upload(storagePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // Save metadata in database
  const { data, error: dbError } = await supabase
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
    console.log(dbError.message);
    console.log(dbError.code);
    console.log(dbError.details);
    console.log(dbError.hint);
    throw dbError;
  }

  return data;
}