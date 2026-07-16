import { ArrowRight, FileUp, SearchCheck, Send } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileUp,
    title: "Upload your resume",
    description: "Start with the experience you already have. AI Job Hunter builds a practical snapshot of your strengths and gaps.",
  },
  {
    number: "02",
    icon: SearchCheck,
    title: "Add the job link",
    description: "We extract the job requirements and compare them with your profile, so you know where to focus before you apply.",
  },
  {
    number: "03",
    icon: Send,
    title: "Apply with direction",
    description: "Generate a tailored cover letter, refine your resume, and prepare talking points for the interview that follows.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#070710] px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">A simple, repeatable workflow</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">From raw application to real momentum.</h2>
          </div>
          <p className="max-w-md text-base leading-7 text-zinc-400">Use the same focused process for every role without rewriting everything from scratch.</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <article key={step.number} className="relative rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7">
                <span className="text-sm font-semibold text-violet-300">{step.number}</span>
                <div className="mt-7 grid size-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200 ring-1 ring-cyan-300/15"><Icon className="size-5" /></div>
                <h3 className="mt-6 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 leading-7 text-zinc-400">{step.description}</p>
                {index < steps.length - 1 && <ArrowRight className="absolute -right-8 top-1/2 z-10 hidden size-6 -translate-y-1/2 text-violet-300 lg:block" />}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
