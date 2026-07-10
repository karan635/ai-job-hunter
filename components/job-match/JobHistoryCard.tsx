import Link from "next/link";
import { Briefcase, Building2, CalendarDays } from "lucide-react";

interface JobHistoryCardProps {
  id: string;
  company: string;
  role: string;
  matchScore: number;
  createdAt: string;
}

export default function JobHistoryCard({
  id,
  company,
  role,
  matchScore,
  createdAt,
}: JobHistoryCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/10">
      <div className="space-y-4">
        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Building2 size={18} />
            <span className="text-sm font-medium uppercase">
              Company
            </span>
          </div>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {company}
          </h2>
        </div>

        <div>
          <div className="flex items-center gap-2 text-violet-400">
            <Briefcase size={18} />
            <span className="text-sm font-medium uppercase">
              Role
            </span>
          </div>

          <p className="mt-2 text-lg text-zinc-300">
            {role}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-400">
              Match Score
            </p>

            <p className="text-3xl font-bold text-green-400">
              {matchScore}%
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center justify-end gap-2 text-zinc-400">
              <CalendarDays size={16} />
              <span className="text-sm">
                {new Date(createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        <Link
          href={`/dashboard/job-history/${id}`}
          className="block rounded-xl bg-violet-600 py-3 text-center font-semibold text-white transition hover:bg-violet-700"
        >
          View Report
        </Link>
      </div>
    </div>
  );
}