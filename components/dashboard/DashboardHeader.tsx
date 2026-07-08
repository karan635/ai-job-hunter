"use client";

import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function DashboardHeader() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return null;

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="mb-8 flex flex-col gap-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome Back, {user?.firstName} 👋
        </h1>

        <p className="mt-2 text-zinc-400">
          {today}
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Lets optimize your career today.
        </p>
      </div>

      <Button className="bg-violet-600 hover:bg-violet-700">
        <Upload className="mr-2 h-4 w-4" />
        Upload Resume
      </Button>
    </div>
  );
}