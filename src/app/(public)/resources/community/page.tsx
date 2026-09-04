export const dynamic = "force-dynamic";

import Link from "next/link";
import { Users, Heart, ExternalLink } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "For Communities & Churches — Resources",
  description: "Guides and toolkits for churches and local leaders supporting vulnerable children.",
};

export default async function CommunityResourcesPage() {
  const dbResources = await prisma.resource.findMany({
    where: { category: "COMMUNITY" },
  });

  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Toolkits</span>
        <h1 className="text-4xl font-bold font-display text-[#114227]">For Communities & Churches</h1>
        <p className="text-slate-600 text-sm leading-relaxed max-w-2xl mx-auto">
          Every church and local community group has a vital role in providing family care, foster support, and protection for children. Download our free community action toolkits.
        </p>

        {dbResources.length > 0 ? (
          <div className="space-y-6 text-left">
            {dbResources.map((res) => (
              <div key={res.id} className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 space-y-4">
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
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#114227] text-white font-bold text-xs hover:bg-emerald-800 transition-colors"
                  >
                    <span>Access Resource</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-200 text-left space-y-4">
            <h3 className="text-lg font-bold text-[#114227]">Local Church & Leader Mobilization Guide</h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Step-by-step instructions on setting up local care networks, establishing foster support groups, and coordinating with regional welfare authorities.
            </p>
            <Link href="/resources/e-learning" className="inline-block px-6 py-2.5 rounded-full bg-[#114227] text-white font-bold text-xs">
              Access Leader Training Course →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

