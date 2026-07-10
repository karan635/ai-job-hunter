import { groq } from "./groq";
import type { ResumeAnalysis } from "@/types/resume";

export async function generateCoverLetter(
  resume: ResumeAnalysis,
  jobDescription: string
) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: `
You are an expert career coach and professional recruiter.

Write a modern, personalized cover letter.

Guidelines:

- Use information from the candidate's resume.
- Match the job description.
- Keep it professional.
- Keep it concise (300–400 words).
- Don't invent experience.
- Use formal business English.
- Return ONLY the cover letter text.
`,
      },
      {
        role: "user",
        content: `
Resume:

${JSON.stringify(resume)}

--------------------------------

Job Description:

${jobDescription}
`,
      },
    ],
  });

  return completion.choices[0].message.content ?? "";
}