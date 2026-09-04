import Link from "next/link";
import { Compass, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "BBM Roadmap — Resources",
  description: "The 4-cornerstone roadmap for broadscale collaboration, prevention, intervention, and living refreshed.",
};

export default function RoadmapPage() {
  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Framework</span>
          <h1 className="text-4xl font-bold font-display text-[#114227]">The BBM Roadmap</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Our 4-quadrant strategic guide for orphanhood prevention, family reunification, and community collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-sky-50 p-8 rounded-3xl border border-sky-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">Cornerstone 1</span>
            <h3 className="text-xl font-bold text-slate-900">Prevention</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Strengthening families before crisis occurs through economic enablement, parenting education, and community support networks.</p>
          </div>
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Cornerstone 2</span>
            <h3 className="text-xl font-bold text-slate-900">Broadscale Collaboration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Uniting governments, NGOs, churches, and civic leaders under a shared mission to serve vulnerable children.</p>
          </div>
          <div className="bg-amber-50 p-8 rounded-3xl border border-amber-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Cornerstone 3</span>
            <h3 className="text-xl font-bold text-slate-900">Intervention</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Providing immediate foster care, legal protection, and safe havens for children in emergency situations.</p>
          </div>
          <div className="bg-rose-50 p-8 rounded-3xl border border-rose-200 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">Cornerstone 4</span>
            <h3 className="text-xl font-bold text-slate-900">Living Refreshed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">Sustaining caregivers and advocates with spiritual renewal, mental health support, and peer hope groups.</p>
          </div>
        </div>

        <div className="text-center pt-6">
          <Link
            href="/resources/e-learning"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#2563eb] text-white font-bold text-xs shadow-md"
          >
            Take The Full Roadmap Course →
          </Link>
        </div>
      </div>
    </div>
  );
}
