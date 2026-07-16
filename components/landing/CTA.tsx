import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-[#070710] px-6 pb-20 lg:pb-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-violet-300/20 bg-gradient-to-br from-violet-600/30 via-[#17132d] to-cyan-500/15 px-7 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:py-16">
        <div className="absolute -right-20 -top-20 size-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-2 text-sm font-semibold text-violet-200"><Sparkles className="size-4" /> Your next application can be your best one.</div>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Bring clarity to every job-search decision.</h2>
          <p className="mt-4 text-lg leading-8 text-zinc-300">Upload your resume, add a job link, and get a plan you can act on today.</p>
        </div>
        <Link href="/sign-up" className="relative mt-8 inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-6 font-semibold text-violet-950 transition hover:-translate-y-0.5 hover:bg-violet-50 lg:mt-0">Create your free account <ArrowRight className="size-4" /></Link>
      </div>
    </section>
  );
}
