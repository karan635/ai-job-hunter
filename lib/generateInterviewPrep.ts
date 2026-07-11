import { groq } from "./groq";
import type { ResumeAnalysis } from "@/types/resume";

export async function generateInterviewPrep(
  resume: ResumeAnalysis,
  jobDescription: string
) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `
You are an expert technical interviewer and hiring manager.

Generate a complete interview preparation guide.

Return ONLY valid JSON.

Use this exact format:

{
  "technical_questions": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "behavioral_questions": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "hr_questions": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "coding_questions": [
    {
      "question": "",
      "answer": ""
    }
  ],
  "difficulty": "",
  "tips": []
}

Rules:
- 5 Technical Questions
- 5 Behavioral Questions
- 5 HR Questions
- 3 Coding Questions
- Each answer should be concise and interview-ready.
- Difficulty must be Beginner, Intermediate, or Advanced.
- Provide exactly 5 interview tips.
- Return ONLY JSON.
- Do not use markdown.
- Do not wrap the JSON in code fences.
`,
      },
      {
        role: "user",
        content: `
Resume:

${JSON.stringify(resume)}

----------------------------------

Job Description:

${jobDescription}
`,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content ?? "{}");
}