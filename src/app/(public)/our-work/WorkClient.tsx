"use client";

import { useState } from "react";
import { ArrowRight, BookOpen, Briefcase, Heart, Home, GraduationCap, PlusCircle, ShieldAlert } from "lucide-react";
import Link from "next/link";

interface Program {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string | null;
  status: string;
  verified: boolean;
}

interface WorkClientProps {
  initialPrograms: Program[];
}

export default function WorkClient({ initialPrograms }: WorkClientProps) {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const categories = [
    { key: "ALL", label: "All Sectors" },
    { key: "EDUCATION", label: "Education" },
    { key: "SKILLS", label: "Skill Development" },
    { key: "WOMEN_FAMILY", label: "Women & Families" },
    { key: "YOUTH", label: "Youth Development" },
    { key: "HEALTH", label: "Health & Wellbeing" },
    { key: "COMMUNITY", label: "Community Development" },
  ];

  const filteredPrograms =
    activeCategory === "ALL"
      ? initialPrograms
      : initialPrograms.filter((p) => p.category === activeCategory);

  // Icon mapping helper
  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case "EDUCATION":
        return <GraduationCap className="w-5 h-5 text-secondary" />;
      case "SKILLS":
        return <Briefcase className="w-5 h-5 text-secondary" />;
      case "WOMEN_FAMILY":
        return <Heart className="w-5 h-5 text-secondary" />;
      case "YOUTH":
        return <PlusCircle className="w-5 h-5 text-secondary" />;
      case "HEALTH":
        return <Heart className="w-5 h-5 text-secondary" />;
      case "COMMUNITY":
        return <Home className="w-5 h-5 text-secondary" />;
      default:
        return <BookOpen className="w-5 h-5 text-secondary" />;
    }
  };

  return (
    <div className="space-y-12">
      {/* Category Tabs Scrollbar */}
      <div className="flex overflow-x-auto pb-4 gap-2 scrollbar-thin border-b border-border-gray justify-start lg:justify-center">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap focus:outline-none ${
              activeCategory === cat.key
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-border-gray"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Program Grid */}
      {filteredPrograms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((prog) => (
            <article
              key={prog.id}
              className="bg-white rounded-2xl border border-border-gray overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300 animate-fade-up"
            >
              <div>
                {prog.imageUrl ? (
                  <img
                    src={prog.imageUrl}
                    alt={prog.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
                    No Image Provided
                  </div>
                )}
                
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600">
                      {getCategoryIcon(prog.category)}
                      {prog.category.replace("_", " ")}
                    </span>
                    {!prog.verified && (
                      <span className="inline-flex items-center text-[9px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/25">
                        Audit Pending
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold text-primary font-display">{prog.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed font-light">
                    {prog.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 mt-6 flex justify-between items-center">
                <Link
                  href={`/contact?purpose=${prog.category}`}
                  className="text-xs font-semibold text-slate-400 hover:text-secondary transition-colors"
                >
                  Inquire About This Sector
                </Link>
                <Link
                  href="/donate"
                  className="inline-flex items-center text-sm font-bold text-primary hover:text-secondary group transition-colors"
                >
                  Support
                  <Heart className="w-4 h-4 ml-1.5 fill-current text-secondary group-hover:scale-110 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-border-gray rounded-2xl space-y-4 max-w-md mx-auto">
          <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-lg font-bold text-primary">No Active Programs Found</h3>
          <p className="text-xs text-slate-400">
            There are currently no active programs loaded in the database for the selected sector.
          </p>
        </div>
      )}
    </div>
  );
}
