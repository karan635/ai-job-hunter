export interface ResumeAnalysis {
  summary: string;
  skills: string[];
  education: {
    degree: string;
    institution: string;
    year: string;
    gpa: string | null;
  }[];
  experience: {
    title: string;
    company: string;
    duration: string;
    bullets: string[];
    quantified: boolean;
  }[];
  projects: {
    name: string;
    description: string;
    tech_stack: string[];
    impact: string | null;
  }[];
  ats_score: number;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
}