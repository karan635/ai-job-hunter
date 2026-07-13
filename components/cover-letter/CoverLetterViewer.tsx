"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CoverLetterViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  content: string;
}

export default function CoverLetterViewer({
  open,
  onOpenChange,
  title,
  content,
}: CoverLetterViewerProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl bg-zinc-900 border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl text-white">
            {title}
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-[70vh] overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="whitespace-pre-wrap leading-8 text-zinc-300">
            {content}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}