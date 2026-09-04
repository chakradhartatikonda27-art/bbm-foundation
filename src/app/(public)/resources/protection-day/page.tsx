import Link from "next/link";
import { Heart } from "lucide-react";

export const metadata = {
  title: "Child Protection Day — Resources",
  description: "Annual awareness day dedicated to highlighting child protection, foster care, and adoption.",
};

export default function ProtectionDayPage() {
  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Annual Event</span>
        <h1 className="text-4xl font-bold font-display text-[#114227]">Child Protection & Orphan Sunday</h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          A dedicated national and global awareness day where communities gather to pray, advocate, and take tangible action for orphaned and vulnerable children.
        </p>

        <div className="bg-sky-50 p-8 rounded-3xl border border-sky-200 text-left space-y-4">
          <h3 className="text-lg font-bold text-slate-900">Event Host Packet & Media Kit</h3>
          <p className="text-xs text-slate-700 leading-relaxed">
            Includes presentation slides, video bumpers, printable brochures, and sermon notes for hosting Child Protection Day at your church or community center.
          </p>
          <Link href="/get-involved" className="inline-block px-6 py-2.5 rounded-full bg-[#2563eb] text-white font-bold text-xs">
            Download Host Packet →
          </Link>
        </div>
      </div>
    </div>
  );
}
