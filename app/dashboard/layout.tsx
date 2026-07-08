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
    <div className="flex min-h-screen bg-black">
      <Sidebar />

      <main className="ml-72 flex-1 bg-black overflow-y-auto">
      <div className="p-8">
        {children}
      </div>
      </main>
    </div>
  );
}