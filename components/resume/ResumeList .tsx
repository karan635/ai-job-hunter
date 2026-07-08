interface ResumeListProps {
  selectedFile: File | null;
}

export default function ResumeList({
  selectedFile,
}: ResumeListProps) {
  if (!selectedFile) {
    return (
      <div className="mt-10 rounded-xl border border-zinc-800 p-8 text-center text-zinc-500">
        No resume uploaded yet.
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6">
      <h2 className="text-xl font-semibold text-white">
        My Resume
      </h2>

      <p className="mt-4 text-lg text-white">
        {selectedFile.name}
      </p>

      <p className="text-sm text-zinc-400">
        {(selectedFile.size / 1024).toFixed(1)} KB
      </p>

      <p className="mt-3 inline-block rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-400">
        Ready for Analysis
      </p>
    </div>
  );
}