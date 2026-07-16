import { FileSearch, MessageSquareText, ScanSearch } from "lucide-react";

const features = [
  {
    icon: ScanSearch,
    title: "See what ATS sees",
    description: "Pinpoint missing skills, weak phrasing, and the exact improvements that make your resume more relevant.",
  },
  {
    icon: FileSearch,
    title: "Match every opportunity",
    description: "Drop in a job link and get a focused match analysis, instead of guessing whether you are a strong fit.",
  },
  {
    icon: MessageSquareText,
    title: "Prepare with confidence",
    description: "Generate role-specific cover letters and interview questions grounded in your experience and the job post.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-[#090912] px-6 pb-24 pt-16 lg:pb-28 lg:pt-20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-violet-300">Built for focused job seekers</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">A clearer path from resume to offer.</h2>
          <p className="mt-5 text-lg leading-8 text-zinc-400">Every tool is designed to help you take the next valuable step—not add another dashboard to manage.</p>
        </div>

        <div className="mt-10 grid max-w-3xl grid-cols-3 divide-x divide-white/[0.08] rounded-2xl border border-white/[0.08] bg-white/[0.025] px-3 py-5 sm:px-6">
          <div className="px-2 sm:px-5">
            <p className="text-2xl font-semibold text-white sm:text-3xl">1 hub</p>
            <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">for every application</p>
          </div>
          <div className="px-2 sm:px-5">
            <p className="text-2xl font-semibold text-white sm:text-3xl">3 steps</p>
            <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">to a sharper application</p>
          </div>
          <div className="px-2 sm:px-5">
            <p className="text-2xl font-semibold text-white sm:text-3xl">AI-led</p>
            <p className="mt-1 text-xs leading-5 text-zinc-500 sm:text-sm">but always in your voice</p>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article key={feature.title} className="group rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.055] to-transparent p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-400/30 hover:bg-violet-500/[0.06]">
                <div className="grid size-12 place-items-center rounded-2xl bg-violet-500/15 text-violet-200 ring-1 ring-violet-300/20 transition group-hover:scale-110 group-hover:bg-violet-500/25">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{feature.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
