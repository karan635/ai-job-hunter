"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BriefcaseBusiness } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <BriefcaseBusiness className="h-7 w-7 text-violet-500" />
          <span className="text-xl font-bold text-white">
            AI Job Hunter
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="#features"
            className="text-sm text-zinc-300 transition hover:text-violet-400"
          >
            Features
          </Link>

          <Link
            href="#how-it-works"
            className="text-sm text-zinc-300 transition hover:text-violet-400"
          >
            How it Works
          </Link>

          <Link
            href="#pricing"
            className="text-sm text-zinc-300 transition hover:text-violet-400"
          >
            Pricing
          </Link>
        </nav>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          <Button  variant="ghost" className="text-white hover:bg-zinc-800">
            <Link href="/sign-in">Sign In</Link>
          </Button>

          <Button className="bg-violet-600 hover:bg-violet-700">
            <Link href="/sign-up">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}