import { groq } from "./groq";
import type { ResumeAnalysis } from "@/types/resume";

export interface GeneratedCoverLetter {
  companyName: string;
  jobTitle: string;
  coverLetter: string;
}

export async function generateCoverLetter(
  resume: ResumeAnalysis,
  jobDescription: string
): Promise<GeneratedCoverLetter> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
You are an expert career coach and professional recruiter.

Write a modern, personalized cover letter and identify the company and job title.

Return ONLY valid JSON matching this schema:

{
  "companyName": string,
  "jobTitle": string,
  "coverLetter": string
}

Guidelines for coverLetter:

- Use information from the candidate's resume.
- Match the job description.
- Keep it professional.
- Keep it concise (500-700 words).
- Explain how the candidate's most relevant skills, experience, and achievements align with the role's requirements.
- Include specific details from the resume when available, without repeating the resume verbatim.
- Don't invent experience.
- Use formal business English.

For companyName and jobTitle, use the job description only. If either is not available, return "Unknown Company" or "Unknown Position".
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

  const content = completion.choices[0].message.content;

  if (!content) {
    throw new Error("The cover letter generator returned an empty response.");
  }

  const result = JSON.parse(content) as Partial<GeneratedCoverLetter>;

  if (typeof result.coverLetter !== "string" || !result.coverLetter.trim()) {
    throw new Error("The cover letter generator returned an invalid response.");
  }

  return {
    companyName:
      typeof result.companyName === "string" && result.companyName.trim()
        ? result.companyName.trim()
        : "Unknown Company",
    jobTitle:
      typeof result.jobTitle === "string" && result.jobTitle.trim()
        ? result.jobTitle.trim()
        : "Unknown Position",
    coverLetter: result.coverLetter.trim(),
  };
}
