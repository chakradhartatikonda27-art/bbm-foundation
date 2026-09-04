export const dynamic = "force-dynamic";

import Link from "next/link";
import { Play } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Videos & Media — Resources",
  description: "Watch video stories of impact, leadership interviews, and field updates.",
};

export default async function VideosPage() {
  const dbResources = await prisma.resource.findMany({
    where: { category: "VIDEO" },
  });

  const defaultVideos = [
    { title: "Refresh Camps Summer Highlights 2026", duration: "12:45", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600", linkUrl: "#" },
    { title: "Servant Leadership in Child Advocacy", duration: "18:20", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600", linkUrl: "#" },
    { title: "Community Reunification in South India", duration: "09:30", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=600", linkUrl: "#" },
  ];

  const videoList = dbResources.length > 0
    ? dbResources.map((r) => ({
        title: r.title,
        duration: r.format || "Video",
        img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600",
        linkUrl: r.linkUrl || "#",
      }))
    : defaultVideos;

  return (
    <div className="bg-white py-16 sm:py-24 animate-fade-up">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 font-display">Media</span>
          <h1 className="text-4xl font-bold font-display text-[#114227]">Videos & Documentaries</h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm">
            Watch real-world field reports, caregiver testimonials, and conference recordings.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoList.map((v, i) => (
            <a
              key={i}
              href={v.linkUrl}
              target={v.linkUrl !== "#" ? "_blank" : "_self"}
              rel="noreferrer"
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200 shadow-sm space-y-4 p-4 block group"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-900 cursor-pointer">
                <img src={v.img} alt={v.title} className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                  {v.duration}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">{v.title}</h3>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

