"use client";

import { useRef, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Bell, BriefcaseBusiness, Check, Loader2, MapPin, Settings2, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";

type Preferences = {
  targetRole: string;
  location: string;
  workStyle: "Remote" | "Hybrid" | "On-site";
  jobAlerts: boolean;
  weeklySummary: boolean;
};

const defaultPreferences: Preferences = {
  targetRole: "",
  location: "",
  workStyle: "Remote",
  jobAlerts: true,
  weeklySummary: true,
};

const storageKey = "ai-job-hunter-settings";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const [preferences, setPreferences] = useState<Preferences>(() => {
    if (typeof window === "undefined") return defaultPreferences;
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) return defaultPreferences;
    try { return { ...defaultPreferences, ...JSON.parse(stored) }; }
    catch { return defaultPreferences; }
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savedProfile, setSavedProfile] = useState(false);
  const [savedPreferences, setSavedPreferences] = useState(false);

  async function saveProfile() {
    if (!user) return;
    try {
      setSavingProfile(true);
      setSavedProfile(false);
      await user.update({ firstName: firstNameRef.current?.value.trim() ?? "", lastName: lastNameRef.current?.value.trim() ?? "" });
      setSavedProfile(true);
    } catch (error) {
      console.error(error);
      alert("We couldn't update your profile. Please try again.");
    } finally { setSavingProfile(false); }
  }

  function savePreferences() {
    window.localStorage.setItem(storageKey, JSON.stringify(preferences));
    setSavedPreferences(true);
    window.setTimeout(() => setSavedPreferences(false), 2500);
  }

  const updatePreference = <K extends keyof Preferences>(key: K, value: Preferences[K]) =>
    setPreferences((current) => ({ ...current, [key]: value }));

  if (!isLoaded) return <div className="py-20 text-center text-zinc-400">Loading settings...</div>;

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <section className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-950/70 via-zinc-900 to-cyan-950/40 p-8 shadow-2xl shadow-violet-950/20">
        <div className="absolute -right-12 -top-16 size-48 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative flex items-start gap-4"><div className="rounded-2xl bg-violet-400/15 p-3 text-violet-200"><Settings2 className="size-7" /></div><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Personalize your workspace</p><h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Settings</h1><p className="mt-3 max-w-2xl text-zinc-300">Keep your profile current and tune the job search experience around the roles you want.</p></div></div>
      </section>

      <div className="grid gap-8 lg:grid-cols-5">
        <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/10 lg:col-span-5 sm:p-8">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-violet-400/10 p-2.5 text-violet-300"><UserRound className="size-5" /></div><div><h2 className="font-semibold text-white">Public profile</h2><p className="text-sm text-zinc-400">Used across your AI Job Hunter workspace.</p></div></div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field ref={firstNameRef} label="First name" defaultValue={user?.firstName ?? ""} placeholder="Your first name" />
            <Field ref={lastNameRef} label="Last name" defaultValue={user?.lastName ?? ""} placeholder="Your last name" />
          </div>
          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 px-4 py-3"><p className="text-xs font-medium uppercase tracking-wider text-zinc-500">Email address</p><p className="mt-1 text-sm text-zinc-200">{user?.primaryEmailAddress?.emailAddress ?? "No email address"}</p></div>
          <Button onClick={saveProfile} disabled={savingProfile} className="mt-7 rounded-xl bg-violet-600 px-5 shadow-lg shadow-violet-950/40 hover:bg-violet-500">{savingProfile ? <Loader2 className="mr-2 size-4 animate-spin" /> : savedProfile ? <Check className="mr-2 size-4" /> : null}{savedProfile ? "Profile saved" : "Save profile"}</Button>
        </section>

      </div>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/10 sm:p-8"><div className="flex items-center gap-3"><div className="rounded-xl bg-amber-400/10 p-2.5 text-amber-300"><BriefcaseBusiness className="size-5" /></div><div><h2 className="font-semibold text-white">Job search preferences</h2><p className="text-sm text-zinc-400">Use these preferences as your starting point for each search.</p></div></div><div className="mt-7 grid gap-5 md:grid-cols-2"><Field label="Target role" value={preferences.targetRole} onChange={(value) => updatePreference("targetRole", value)} placeholder="e.g. Product designer" /><Field label="Preferred location" value={preferences.location} onChange={(value) => updatePreference("location", value)} placeholder="e.g. Bengaluru, India" icon={<MapPin className="size-4" />} /></div><div className="mt-6"><p className="mb-3 text-sm font-medium text-zinc-200">Preferred work style</p><div className="flex flex-wrap gap-3">{(["Remote", "Hybrid", "On-site"] as const).map((option) => <button key={option} type="button" onClick={() => updatePreference("workStyle", option)} className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${preferences.workStyle === option ? "border-violet-400 bg-violet-400/15 text-violet-100" : "border-zinc-700 bg-zinc-950 text-zinc-400 hover:border-zinc-500 hover:text-white"}`}>{option}</button>)}</div></div><Button onClick={savePreferences} className="mt-7 rounded-xl bg-violet-600 px-5 shadow-lg shadow-violet-950/40 hover:bg-violet-500">{savedPreferences && <Check className="mr-2 size-4" />}{savedPreferences ? "Preferences saved" : "Save preferences"}</Button></section>

      <section className="rounded-3xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl shadow-black/10 sm:p-8"><div className="flex items-center gap-3"><div className="rounded-xl bg-rose-400/10 p-2.5 text-rose-300"><Bell className="size-5" /></div><div><h2 className="font-semibold text-white">Notifications</h2><p className="text-sm text-zinc-400">Choose which helpful updates you want to receive.</p></div></div><div className="mt-7 divide-y divide-zinc-800"> <Toggle label="Job match alerts" description="Get notified when a saved role has a strong resume match." checked={preferences.jobAlerts} onChange={(value) => updatePreference("jobAlerts", value)} /><Toggle label="Weekly progress summary" description="Receive a recap of your resume, applications, and interview prep activity." checked={preferences.weeklySummary} onChange={(value) => updatePreference("weeklySummary", value)} /></div><Button onClick={savePreferences} variant="outline" className="mt-7 rounded-xl border-zinc-700 bg-white/[0.03] text-zinc-100 hover:bg-white/[0.08]">{savedPreferences && <Check className="mr-2 size-4" />}Save notification choices</Button></section>
    </div>
  );
}

const Field = ({ label, defaultValue, value, onChange, placeholder, icon, ref }: { label: string; defaultValue?: string; value?: string; onChange?: (value: string) => void; placeholder: string; icon?: React.ReactNode; ref?: React.Ref<HTMLInputElement> }) => {
  return <label className="block"><span className="mb-2 block text-sm font-medium text-zinc-200">{label}</span><div className="relative">{icon && <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">{icon}</span>}<input ref={ref} defaultValue={defaultValue} value={value} onChange={onChange ? (event) => onChange(event.target.value) : undefined} placeholder={placeholder} className={`w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-violet-400 focus:ring-2 focus:ring-violet-400/20 ${icon ? "pl-10" : ""}`} /></div></label>;
}

function Toggle({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <div className="flex items-center justify-between gap-5 py-5"><div><p className="text-sm font-medium text-white">{label}</p><p className="mt-1 max-w-xl text-sm leading-5 text-zinc-400">{description}</p></div><button type="button" onClick={() => onChange(!checked)} aria-pressed={checked} className={`relative h-7 w-12 shrink-0 rounded-full transition ${checked ? "bg-violet-500" : "bg-zinc-700"}`}><span className={`absolute top-1 size-5 rounded-full bg-white shadow transition ${checked ? "left-6" : "left-1"}`} /></button></div>;
}
