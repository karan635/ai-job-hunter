import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Sparkles, Target } from "lucide-react";

const nextSteps = [
  { title: "Upload or review your latest resume", description: "Keep your profile current before matching against new roles.", href: "/dashboard/resume", icon: FileText },
  { title: "Find your strongest job match", description: "Add a job link to see fit, gaps, and practical improvements.", href: "/dashboard/job-match", icon: Target },
  { title: "Create an application-ready cover letter", description: "Turn a job post into a tailored first draft in minutes.", href: "/dashboard/cover-letter", icon: Sparkles },
];

export default function RecentActivity() {
  return (
    <section className="grid gap-5 lg:grid-cols-[1.45fr_0.9fr]">
      <div className="rounded-3xl border border-white/[0.08] bg-white/[0.025] p-6 sm:p-7">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-cyan-300">Your focused plan</p>
            <h2 className="mt-1 text-2xl font-semibold text-white">Keep the momentum going</h2>
          </div>
          <span className="hidden rounded-full border border-emerald-300/15 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200 sm:inline-flex">Ready when you are</span>
        </div>

        <div className="mt-6 divide-y divide-white/[0.07]">
          {nextSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Link key={step.title} href={step.href} className="group flex gap-4 py-4 first:pt-0 last:pb-0">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-violet-500/12 text-violet-200 ring-1 ring-violet-300/10"><Icon className="size-4" /></div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Step {index + 1}</p>
                  <h3 className="mt-1 font-medium text-white transition group-hover:text-violet-200">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">{step.description}</p>
                </div>
                <ArrowRight className="mt-5 size-4 shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-violet-200" />
              </Link>
            );
          })}
        </div>
      </div>

      <aside className="rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-600/20 via-[#19162a] to-cyan-500/10 p-6 sm:p-7">
        <CheckCircle2 className="size-8 text-cyan-200" />
        <h2 className="mt-6 text-2xl font-semibold text-white">One workspace. Every application.</h2>
        <p className="mt-3 leading-7 text-zinc-300">Analyze your resume, tailor the application, and prepare for interviews without losing track of what matters.</p>
        <Link href="/dashboard/job-history" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-cyan-200 transition hover:text-white">Review job history <ArrowRight className="size-4" /></Link>
      </aside>
    </section>
  );
}
