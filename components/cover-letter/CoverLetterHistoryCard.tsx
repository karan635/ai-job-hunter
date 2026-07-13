"use client";

import { Button } from "@/components/ui/button";
import {
  Eye,
  Copy,
  Download,
  Trash2,
  Building2,
  Briefcase,
  Calendar,
} from "lucide-react";

interface CoverLetterHistoryCardProps {
  companyName: string;
  jobTitle: string;
  createdAt: string;
  onView: () => void;
  onCopy: () => void;
  onDownload: () => void;
  onDelete: () => void;
}

export default function CoverLetterHistoryCard({
  companyName,
  jobTitle,
  createdAt,
  onView,
  onCopy,
  onDownload,
  onDelete,
}: CoverLetterHistoryCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-violet-600">
      <div className="space-y-3">

        <div className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-violet-400" />
          <h2 className="text-xl font-semibold text-white">
            {companyName || "Unknown Company"}
          </h2>
        </div>

        <div className="flex items-center gap-2 text-zinc-400">
          <Briefcase className="h-4 w-4" />
          <span>{jobTitle || "Unknown Position"}</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <Calendar className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">

          <Button
            variant="outline"
            onClick={onView}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>

          <Button
            variant="outline"
            onClick={onCopy}
          >
            <Copy className="mr-2 h-4 w-4" />
            Copy
          </Button>

          <Button
            variant="outline"
            onClick={onDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>

          <Button
            variant="destructive"
            onClick={onDelete}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>

        </div>
      </div>
    </div>
  );
}