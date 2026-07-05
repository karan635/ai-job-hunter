import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import DashboardPreview from "@/components/dashboard/DashboardPreview";

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <Hero />
      <DashboardPreview />
    </main>
  );
}