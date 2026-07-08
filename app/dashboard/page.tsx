import Link from "next/link";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";


export default function DashboardPage() {
  return (
  <>
    <DashboardHeader />
    <StatsGrid />
    <QuickActions />
    <RecentActivity />
  </>
  );
}