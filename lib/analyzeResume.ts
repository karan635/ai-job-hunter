import { groq } from "./groq";

export async function analyzeResume(resumeText: string) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.2,
    response_format: {
      type: "json_object",
    },
    messages: [
      {
        role: "system",
        content: `
You are an expert ATS Resume Parser.

Return ONLY valid JSON.

Schema:

{
  "name": "",
  "email": "",
  "phone": "",
  "summary": "",
  "skills": [],
  "education": [],
  "experience": [],
  "projects": [],
  "ats_score": 0,
  "strengths": [],
  "weaknesses": [],
  "suggestions": []
}
  Rules:

- ATS score must be between 0 and 100.
- Give at least 5 strengths.
- Give at least 5 weaknesses.
- Give at least 5 actionable suggestions.
- Evaluate formatting, keywords, achievements, projects, experience, and skills.
- Do not leave any array empty unless the information is truly unavailable.
- Return only JSON.
        `,
      },
      {
        role: "user",
        content: resumeText,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content ?? "{}");
}