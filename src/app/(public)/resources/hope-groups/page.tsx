import Link from "next/link";
import { Users } from "lucide-react";

export const metadata = {
  title: "Hope Groups — Resources",
  description: "Peer support circles for foster parents, adoptive families, and youth caregivers.",
};

export default function HopeGroupsPage() {
  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Peer Support</span>
        <h1 className="text-4xl font-bold font-display text-[#114227]">Hope Groups</h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Hope Groups provide a safe, confidential environment for foster parents, adoptive families, and caregivers to share experiences, build resilience, and receive professional guidance.
        </p>

        <div className="bg-[#e9f2eb] p-8 rounded-3xl border border-emerald-900/10 text-left space-y-4">
          <h3 className="text-lg font-bold text-[#114227]">Start a Local Hope Group</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Access facilitator manuals, monthly group discussion topics, and self-care resources designed to prevent caregiver burnout.
          </p>
          <Link href="/get-involved" className="inline-block px-6 py-2.5 rounded-full bg-emerald-700 text-white font-bold text-xs">
            Join Hope Group Facilitator Network →
          </Link>
        </div>
      </div>
    </div>
  );
}
