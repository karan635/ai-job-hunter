import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsGrid from "@/components/dashboard/StatsGrid";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentActivity from "@/components/dashboard/RecentActivity";


export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <DashboardHeader />
      <StatsGrid />
      <QuickActions />
      <RecentActivity />
    </div>
  );
}
