"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-black px-6 pb-24 pt-20">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-700/20 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl font-extrabold leading-tight text-white md:text-7xl"
        >
          Land Your Dream Job
          <span className="block bg-gradient-to-r from-violet-400 to-blue-500 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-zinc-400"
        >
          Optimize your resume, review your LinkedIn profile,
          generate AI cover letters, match jobs, and prepare for
          interviews — all in one intelligent platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10 flex justify-center gap-4"
        >
          <Button size="lg" className="bg-violet-600 hover:bg-violet-700">
            Get Started
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800"
          >
            Watch Demo
          </Button>
        </motion.div>
      </div>
    </section>
  );
}