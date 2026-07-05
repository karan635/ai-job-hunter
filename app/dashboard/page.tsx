import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div>   
      <h1 className="text-4xl font-bold text-white">
        Welcome Back 👋
      </h1>

      <p className="mt-2 text-zinc-400">
        Lets optimize your career today.
      </p>
    </div>
  );
}