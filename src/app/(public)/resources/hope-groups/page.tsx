export const dynamic = "force-dynamic";

import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Hope Groups — Resources",
  description: "Peer support circles for foster parents, adoptive families, and youth caregivers.",
};

export default async function HopeGroupsPage() {
  const dbResources = await prisma.resource.findMany({
    where: { category: "HOPE_GROUPS" },
  });

  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Peer Support</span>
        <h1 className="text-4xl font-bold font-display text-[#114227]">Hope Groups</h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Hope Groups provide a safe, confidential environment for foster parents, adoptive families, and caregivers to share experiences, build resilience, and receive professional guidance.
        </p>

        {dbResources.length > 0 ? (
          <div className="space-y-6 text-left">
            {dbResources.map((res) => (
              <div key={res.id} className="bg-[#e9f2eb] p-8 rounded-3xl border border-emerald-900/10 space-y-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-[#114227]">{res.title}</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded">
                    {res.format}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{res.description}</p>
                {res.linkUrl && (
                  <a
                    href={res.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-emerald-700 text-white font-bold text-xs hover:bg-emerald-800 transition-colors"
                  >
                    <span>Access Group Material</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#e9f2eb] p-8 rounded-3xl border border-emerald-900/10 text-left space-y-4">
            <h3 className="text-lg font-bold text-[#114227]">Start a Local Hope Group</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Access facilitator manuals, monthly group discussion topics, and self-care resources designed to prevent caregiver burnout.
            </p>
            <Link href="/get-involved" className="inline-block px-6 py-2.5 rounded-full bg-emerald-700 text-white font-bold text-xs">
              Join Hope Group Facilitator Network →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

