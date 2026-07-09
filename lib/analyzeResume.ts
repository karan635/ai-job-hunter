import { groq } from "./groq";

export async function analyzeResume(resumeText: string) {
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
You are an expert ATS Resume Parser.

Return ONLY valid JSON.

Schema:

{
  "name": string,
  "email": string,
  "phone": string,
  "summary": string,
  "skills": string[],
  "education": [{ "degree": string, "institution": string, "year": string, "gpa": string | null }],
  "experience": [{ "title": string, "company": string, "duration": string, "bullets": string[], "quantified": boolean }],
  "projects": [{ "name": string, "description": string, "tech_stack": string[], "impact": string | null }],
  "ats_score": number,
  "score_breakdown": {
    "contact_info": number,
    "professional_summary": number,
    "work_experience": number,
    "skills": number,
    "education": number,
    "projects": number,
    "ats_formatting": number
  },
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}
  If a field is missing from the resume, use "" for strings, [] for arrays, or null where explicitly allowed. Never fabricate data.

  Evaluate the resume using this rubric:
  1. Contact Information (10 pts)
    - Full name present (2)
    - Valid email format (2)
    - Phone number present (2)
    - LinkedIn/GitHub/portfolio link present (2)
    - Location (city/state, no full address needed) (2)
  Deduct to 0 if contact block is missing or unparseable.
  2. Professional Summary (10 pts)
    - Present at all (2)
    - Tailored to a specific role/domain, not generic filler (3)
    - Mentions years of experience or specialization concretely (3)
    - Free of clichés ("hardworking team player", "results-driven professional") (2)
    - 0 if absent. Cap at 5 if summary is generic boilerplate.
  3. Work Experience (20 pts)
    - At least one entry with title, company, dates (4)
    - Bullets use strong action verbs, not passive phrasing (4)
    - Bullets are quantified (%, $, time saved, scale, users) — award proportionally to how many bullets are quantified, not binary (6)
    - Relevance/recency of experience to a technical role (3)
    - Clear chronological structure, no unexplained gaps flagged (3)
    - 0 if no work experience section exists. Internships/co-ops count.
  4. Skills (20 pts)
    - Skills section present and structured (not buried in prose) (4)
    - Skills are specific tools/languages/frameworks, not vague soft skills (6)
    - Skills reflect actual usage shown elsewhere in resume (evidence-backed, not a keyword dump) (6)
    - Categorization (e.g., Languages / Frameworks / Tools) (4)
    - Deduct heavily (cap at 8) if skills list looks like unsupported keyword stuffing.
  5. Education (10 pts)
    - Degree, institution, year present (5)
    - Relevant coursework, honors, or GPA if above ~3.5/8.5 (3)
    - Formatting consistency with rest of resume (2)
  6. Projects (15 pts)
    - At least one project with a real description (4)
    - Tech stack explicitly listed per project (4)
    - Demonstrates measurable impact or outcome, not just "built X" (4)
    - Relevance to target technical role (3)
    - 0 if no projects section (acceptable to be 0 for senior candidates with strong work experience — do not penalize twice).
  7. ATS Formatting (15 pts)
    - No tables, columns, text boxes, or graphics that break parsing (4)
    - Standard section headers (Experience, Education, Skills, Projects) (3)
    - Consistent date formatting (2)
    - No headers/footers containing critical info (2)
    - Reasonable length (1 page for <5 yrs experience, ≤2 pages otherwise) (2)
    - Plain, parseable fonts/bullets (no emoji, no unicode bullets breaking parsers) (2)
  CALIBRATION RULES — enforce strictly
    - Do NOT default to 85, 80, or any round "safe" number. Compute the score by summing score_breakdown honestly.
    - ats_score MUST equal the sum of score_breakdown values. Verify this before returning.
    - A resume with no quantified achievements CANNOT score above 70 overall, regardless of other strengths.
    - A resume with no projects AND no work experience CANNOT score above 45.
    - A resume with formatting issues (tables/columns/graphics) CANNOT score above 65 on ats_formatting alone (cap that category at 6/15).
    - Generic/templated summaries cap the professional_summary category at 5/10.
    - Score ranges (for calibration, not a target to hit):
      - Poor: 20–50 — missing major sections, no quantification, generic content
      - Average: 50–75 — complete sections but weak evidence, some quantification
      - Good: 75–90 — strong quantified experience, relevant skills, clean formatting
      - Exceptional: 90–100 — all sections excellent, consistently quantified impact, zero formatting issues
    - If you are uncertain between two scores for a category, choose the LOWER one. Optimism is a failure mode here.
  ## STRENGTHS / WEAKNESSES / SUGGESTIONS
  - strengths: only list things with direct evidence in the resume text (max 5)
  - weaknesses: be specific — cite what's missing or weak, not generic advice (max 5)
  - suggestions: actionable, specific to this resume's actual gaps, not boilerplate tips (max 5)

Return ONLY the JSON object described above.

  



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