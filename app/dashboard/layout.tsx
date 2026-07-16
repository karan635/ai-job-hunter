import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-[#09090f]">
      <Sidebar />

      <main className="min-h-screen bg-[radial-gradient(circle_at_88%_0%,rgba(112,67,220,0.12),transparent_27%),#09090f] md:ml-72">
        <div className="p-5 sm:p-7 lg:p-10">
          {children}
        </div>
      </main>
  </div>
  );
}
