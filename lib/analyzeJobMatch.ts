import { groq } from "./groq";
import type { ResumeAnalysis } from "@/types/resume";

export async function analyzeJobMatch(
  resumeAnalysis: ResumeAnalysis,
  jobDescription: string
) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
You are an expert ATS Resume Analyzer and Senior Technical Recruiter.

Your job is to compare a candidate's resume against a job description exactly like modern ATS software.

Return ONLY valid JSON.

Schema:

{
  "company": string,
  "role": string,
  "match_score": number,
  "matching_skills": string[],
  "missing_skills": string[],
  "resume_strengths": string[],
  "improvements": string[],
  "overall_feedback": string
}

Instructions:

1. Identify the company name from the job description.
2. Identify the job title or role.
3. Calculate a realistic ATS Match Score between 0 and 100.
4. Never inflate the score.
5. Matching skills must exist in BOTH resume and job description.
6. Missing skills must come ONLY from the job description.
7. Resume strengths should be meaningful.
8. Improvements should be specific and actionable.
9. Overall feedback should be 2–4 professional sentences.
10. If company is not mentioned, return "Unknown Company".
11. If role is not mentioned, return "Unknown Role".

Return ONLY valid JSON.
`
      },
      {
        role: "user",
        content: `
Resume

${JSON.stringify(resumeAnalysis)}

--------------------------------

Job Description

${jobDescription}
`
      }
    ]
  });

  return JSON.parse(
    completion.choices[0].message.content ?? "{}"
  );
}