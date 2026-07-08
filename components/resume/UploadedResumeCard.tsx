"use client";

import { Button } from "@/components/ui/button";
import {
  FileText,
  Eye,
  Trash2,
  Sparkles,
  Calendar,
} from "lucide-react";

export default function UploadedResumeCard() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-violet-500/40">
      <div className="flex items-start justify-between">

        {/* Left Side */}
        <div className="flex gap-4">
          <div className="rounded-xl bg-violet-600/20 p-4">
            <FileText className="h-8 w-8 text-violet-400" />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white">
              Software_Engineer_Resume.pdf
            </h2>

            <div className="mt-2 flex items-center gap-2 text-sm text-zinc-400">
              <Calendar className="h-4 w-4" />
              Uploaded Today
            </div>

            <div className="mt-3 inline-flex rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              Ready for Analysis
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex gap-3">

          <Button
            variant="outline"
            className="border-zinc-700 bg-transparent text-white hover:bg-zinc-800"
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>

          <Button className="bg-violet-600 hover:bg-violet-700">
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze
          </Button>

          <Button
            variant="destructive"
            size="icon"
          >
            <Trash2 className="h-4 w-4" />
          </Button>

        </div>

      </div>
    </div>
  );
}