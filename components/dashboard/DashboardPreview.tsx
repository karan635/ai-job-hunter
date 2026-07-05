"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="relative -mt-24 px-6 pb-24">
        <div className="absolute inset-0 flex justify-center">
            <div className="h-[500px] w-[500px] rounded-full bg-violet-600/20 blur-[140px]" />
        </div>
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto max-w-6xl"
      >
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl p-8 shadow-2xl">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              AI Resume Analysis
            </h2>

            <span className="rounded-full bg-violet-600 px-4 py-1 text-sm text-white">
              Premium AI
            </span>
          </div>

          <div className="mt-8 space-y-6">

            {/* ATS */}

            <div>
              <div className="flex justify-between text-zinc-300">
                <span>ATS Score</span>
                <span>94%</span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-zinc-800">
                <div className="h-3 w-[94%] rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
              </div>
            </div>

            {/* Job Match */}

            <div>
              <div className="flex justify-between text-zinc-300">
                <span>Job Match</span>
                <span>91%</span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-zinc-800">
                <div className="h-3 w-[91%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
              </div>
            </div>

            {/* Missing Skills */}

            <div>
              <h3 className="mb-3 font-semibold text-white">
                Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {["Docker", "AWS", "Kubernetes"].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Status */}

            <div className="grid gap-4 md:grid-cols-2">

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" />

                  <div>
                    <p className="text-white">
                      Cover Letter
                    </p>

                    <p className="text-sm text-zinc-400">
                      Ready to Generate
                    </p>
                  </div>
                </div>

              </div>

              <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">

                <div className="flex items-center gap-3">
                  <CheckCircle2 className="text-green-400" />

                  <div>
                    <p className="text-white">
                      Interview Preparation
                    </p>

                    <p className="text-sm text-zinc-400">
                      25 AI Questions Ready
                    </p>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}