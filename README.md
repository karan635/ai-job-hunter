# Hangar — AI Job Hunter

An AI-powered job hunting web app that helps you analyze and improve your resume, track applications, and (eventually) find and match relevant job openings.

> ⚠️ **Project status: early development.** Core pieces are being built and wired up (auth, resume upload, AI resume analysis, dashboard). Expect breaking changes, missing features, and rough edges. Not production-ready yet.

## What it does today

- **Auth** — Sign up / sign in via [Clerk](https://clerk.com/).
- **Resume upload** — Upload a PDF resume, which is stored in Supabase Storage and text-extracted server-side.
- **AI resume analysis** — The extracted resume text is sent to an LLM (via [Groq](https://groq.com/), Llama 3.3 70B) which returns a structured ATS-style report: parsed contact info, skills, education, experience, projects, an ATS score, strengths, weaknesses, and improvement suggestions.
- **Dashboard** — A dashboard shell with stats cards, recent activity, and quick actions (UI scaffolding in progress).
- **Landing page** — Marketing/landing page with hero, features, "how it works," and CTA sections.

## Planned / in progress

- Job matching and scraping/search integration.
- Persisting and displaying AI resume analysis results in the dashboard.
- Fixing a known Supabase RLS issue where Clerk-issued JWTs cause `auth.uid()` to resolve to `NULL` inside Postgres policies, which currently blocks authenticated inserts from server-side calls in some flows.
- Application tracking.
- General UI polish and mobile responsiveness.

## Tech stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router) + React 19 + TypeScript
- **Styling/UI:** Tailwind CSS v4, shadcn/ui (base-nova style), Radix/Base UI primitives, Framer Motion, lucide-react icons
- **Auth:** [Clerk](https://clerk.com/)
- **Database & storage:** [Supabase](https://supabase.com/) (Postgres + Storage, with Row Level Security)
- **AI:** [Groq](https://groq.com/) (Llama 3.3 70B) for resume parsing/analysis
- **PDF parsing:** `pdf2json`
- **Forms/validation:** React Hook Form + Zod

## Project structure

```
app/
  page.tsx                  # Landing page
  sign-in/, sign-up/        # Clerk auth pages
  dashboard/                # Dashboard shell + resume pages
  api/upload-resume/        # Resume upload + storage + DB insert
  api/test-groq/            # Groq connectivity test route
components/
  landing/                  # Hero, Features, HowItWorks, CTA, Navbar, Footer
  dashboard/                # Sidebar, StatsGrid, RecentActivity, QuickActions, etc.
  resume/                   # Upload UI, resume list, resume cards
  ui/                       # shadcn/ui primitives
lib/
  supabase.ts                # Supabase client (anon + admin/service-role)
  groq.ts                    # Groq client
  analyzeResume.ts           # Prompting/parsing logic for resume analysis
  pdf.ts                      # PDF text extraction
  utils.ts
services/
  resume.service.ts          # Resume-related data access layer
types/                       # Shared TypeScript types
proxy.ts                      # Clerk middleware (route protection)
```

## Getting started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com/) account/project
- A [Supabase](https://supabase.com/) project (with a `resume-files` storage bucket and a `resumes` table)
- A [Groq](https://console.groq.com/) API key

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/karan635/ai-job-hunter.git
   cd ai-job-hunter
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root with:

   ```bash
   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   CLERK_SECRET_KEY=

   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   SUPABASE_SERVICE_ROLE_KEY=

   # Groq
   GROQ_API_KEY=
   ```

4. Run the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Contributing

This project is actively being built and **contributions are very welcome** — whether that's fixing bugs, improving the UI, helping resolve the Supabase RLS/Clerk auth issue, or adding new features like job matching.

If you'd like to contribute:

1. Fork the repo and create a feature branch.
2. Make your changes.
3. Open a pull request describing what you changed and why.

Feel free to open an issue first if you want to discuss an idea, report a bug, or check whether something's already being worked on.

## License

No license has been specified yet. Until one is added, please check with the repo owner before reusing this code.
