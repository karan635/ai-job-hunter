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
You are an expert ATS Job Match Analyzer.

Compare the candidate resume with the job description.

Return ONLY valid JSON.

Schema:

{
  "match_score": number,
  "matching_skills": string[],
  "missing_skills": string[],
  "resume_strengths": string[],
  "improvements": string[],
  "overall_feedback": string
}

Rules:

- Calculate a realistic match score (0-100).
- Do NOT always return 80+.
- Only include skills that truly match.
- Missing skills should come from the job description.
- Suggestions must be actionable.
- overall_feedback should be 2-3 sentences.
`
      },
      {
        role: "user",
        content: `
Resume:

${JSON.stringify(resumeAnalysis)}

--------------------------------

Job Description:

${jobDescription}
`
      }
    ]
  });

  return JSON.parse(
    completion.choices[0].message.content ?? "{}"
  );
}