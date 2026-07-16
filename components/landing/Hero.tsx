"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Target, WandSparkles } from "lucide-react";

const insightCards = [
  { label: "ATS readiness", value: "94%", tone: "from-violet-500 to-fuchsia-500" },
  { label: "Job match", value: "91%", tone: "from-cyan-400 to-blue-500" },
];

export default function Hero() {
  return (
    <section className="landing-grid relative overflow-hidden bg-[#070710] px-6 pb-20 pt-24 lg:pb-24 lg:pt-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(120,74,255,0.2),transparent_28%),radial-gradient(circle_at_15%_80%,rgba(18,182,224,0.12),transparent_24%)]" />
      <div className="absolute left-1/2 top-0 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-violet-400/50 to-transparent" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.9fr] lg:gap-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-3 py-1.5 text-sm font-medium text-violet-200"
          >
            <Sparkles className="size-4" />
            Your AI career co-pilot
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mt-7 text-5xl font-semibold tracking-[-0.045em] text-white sm:text-6xl lg:text-7xl"
          >
            Make every application
            <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
              impossible to ignore.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-zinc-400"
          >
            Turn your resume into a targeted job-search strategy. Get ATS feedback,
            job-match insights, tailored cover letters, and interview practice in one workspace.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-500 px-6 font-semibold text-white shadow-[0_12px_35px_rgba(109,72,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_45px_rgba(109,72,255,0.5)]"
            >
              Start for free <ArrowRight className="size-4" />
            </Link>
            <a
              href="#workflow"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-6 font-semibold text-zinc-200 transition hover:border-violet-300/30 hover:bg-white/[0.08]"
            >
              See how it works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-zinc-400"
          >
            {["Personalized recommendations", "ATS-focused analysis", "No credit card required"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-cyan-300" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, type: "spring", bounce: 0.25 }}
          className="hero-3d-scene mx-auto w-full max-w-[570px]"
        >
          <div className="hero-dashboard relative rounded-[2rem] border border-white/15 bg-[#111120]/90 p-4 shadow-[0_35px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:p-5">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 shadow-lg shadow-violet-500/30">
                  <WandSparkles className="size-4 text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Application strategy</p>
                  <p className="text-xs text-zinc-500">Updated moments ago</p>
                </div>
              </div>
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-xs font-medium text-emerald-300">Ready</span>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {insightCards.map((card) => (
                <div key={card.label} className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <p className="text-xs text-zinc-500">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{card.value}</p>
                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                    <div className={`h-full rounded-full bg-gradient-to-r ${card.tone} ${card.value === "94%" ? "w-[94%]" : "w-[91%]"}`} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-violet-500/15 to-cyan-500/[0.07] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-white">Next best action</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">Emphasize system design and cloud delivery experience for this role.</p>
                </div>
                <Target className="mt-0.5 size-5 shrink-0 text-cyan-300" />
              </div>
              <div className="mt-4 flex gap-2">
                {["AWS", "System design", "Leadership"].map((skill) => (
                  <span key={skill} className="rounded-lg bg-black/20 px-2 py-1 text-xs text-violet-200">{skill}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="hero-float-card hero-float-card-one hidden rounded-2xl border border-white/15 bg-[#17172a]/90 p-3 shadow-2xl backdrop-blur-xl sm:block">
            <p className="text-xs text-zinc-400">Cover letter</p>
            <p className="mt-1 text-sm font-semibold text-white">Personalized draft ready</p>
          </div>
          <div className="hero-float-card hero-float-card-two hidden items-center gap-2 rounded-2xl border border-cyan-300/20 bg-[#111c2b]/90 px-3 py-2.5 shadow-2xl backdrop-blur-xl sm:flex">
            <CheckCircle2 className="size-4 text-cyan-300" />
            <span className="text-xs font-medium text-white">3 gaps identified</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
