import Link from "next/link";
import { Users, Heart } from "lucide-react";

export const metadata = {
  title: "For Communities & Churches — Resources",
  description: "Guides and toolkits for churches and local leaders supporting vulnerable children.",
};

export default function CommunityResourcesPage() {
  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Toolkits</span>
        <h1 className="text-4xl font-bold font-display text-[#114227]">For Communities & Churches</h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Every church and local community group has a vital role in providing family care, foster support, and protection for children. Download our free community action toolkits.
        </p>

        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 text-left space-y-4">
          <h3 className="text-lg font-bold text-[#114227]">Local Church & Leader Mobilization Guide</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Step-by-step instructions on setting up local care networks, establishing foster support groups, and coordinating with regional welfare authorities.
          </p>
          <Link href="/resources/e-learning" className="inline-block px-6 py-2.5 rounded-full bg-[#114227] text-white font-bold text-xs">
            Access Leader Training Course →
          </Link>
        </div>
      </div>
    </div>
  );
}
