"use client";

import { Button } from "@/components/ui/button";

interface CoverLetterCardProps {
  coverLetter: string;
  onCopy: () => void;
  onDownload: () => void;
  onRegenerate: () => void;
  loading: boolean;
}

export default function CoverLetterCard({
  coverLetter,
  onCopy,
  onDownload,
  onRegenerate,
  loading,
}: CoverLetterCardProps) {
  return (
    <div className="rounded-3xl border border-violet-400/20 bg-gradient-to-br from-zinc-900 to-violet-950/20 p-6 shadow-xl shadow-violet-950/10">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-white">
            ✍️ Generated Cover Letter
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            AI-generated personalized cover letter
          </p>
        </div>

        <Button
          variant="outline"
          onClick={onCopy}
        >
          📋 Copy
        </Button>
        <Button
            variant="outline"
            onClick={onDownload}
        >
            📄 Download PDF
        </Button>
        <Button
            onClick={onRegenerate}
            disabled={loading}
            className="bg-gradient-to-r from-violet-600 to-indigo-600"
        >
            {loading ? "Regenerating..." : "🔄 Regenerate"}
        </Button>

      </div>

      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
        <p className="whitespace-pre-wrap leading-8 text-zinc-300">
          {coverLetter}
        </p>
      </div>
    </div>
  );
}
