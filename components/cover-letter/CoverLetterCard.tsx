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
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
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