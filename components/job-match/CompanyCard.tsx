interface CompanyCardProps {
  company: string;
  role: string;
}

export default function CompanyCard({
  company,
  role,
}: CompanyCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6">
      <p className="text-sm uppercase tracking-wide text-violet-400">
        Company
      </p>

      <h2 className="mt-1 text-2xl font-bold text-white">
        {company}
      </h2>

      <p className="mt-4 text-sm uppercase tracking-wide text-violet-400">
        Role
      </p>

      <h3 className="mt-1 text-xl font-semibold text-zinc-300">
        {role}
      </h3>
    </div>
  );
}