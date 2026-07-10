"use client";

interface Resume {
  id: string;
  file_name: string;
}

interface ResumeSelectorProps {
  resumes: Resume[];
  selectedResumeId: string;
  setSelectedResumeId: (id: string) => void;
}

export default function ResumeSelector({
  resumes,
  selectedResumeId,
  setSelectedResumeId,
}: ResumeSelectorProps) {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-lg font-semibold text-white">
        Select Resume
      </label>

      <select
        value={selectedResumeId}
        onChange={(e) => setSelectedResumeId(e.target.value)}
        className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-violet-500"
      >
        <option value="">Choose a Resume</option>

        {resumes.map((resume) => (
          <option key={resume.id} value={resume.id}>
            {resume.file_name}
          </option>
        ))}
      </select>
    </div>
  );
}