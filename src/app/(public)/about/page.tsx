export const dynamic = "force-dynamic";

import { ShieldAlert, CheckCircle, Users, Eye, Heart, Camera } from "lucide-react";
import prisma from "@/lib/db";
import AboutImageSlider from "@/components/AboutImageSlider";
import { getSiteContent } from "@/lib/siteContent";

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  const defaultAbout = {
    title: "About BBM Foundation",
    subtitle: "Dedicated to restoring families, educating children, and empowering communities across Andhra Pradesh & Telangana.",
    history: "Founded with a vision to eliminate orphanhood and uplift underprivileged communities, BBM Foundation has touched thousands of lives through direct action and partnership.",
    mission: "To enable every child to thrive within a loving family and access life-changing opportunities for education and growth.",
    vision: "A compassionate society where zero children are left orphaned or without quality education and protection.",
    value1Title: "Compassion First",
    value1Desc: "Serving every individual with dignity and unconditional care.",
    value2Title: "Transparency",
    value2Desc: "100% financial and operational accountability in every project.",
    value3Title: "Community Impact",
    value3Desc: "Sustainable programs designed for long-term community transformation.",
  };

  const aboutContent = await getSiteContent("about_page", defaultAbout);

  const values = [
    { title: aboutContent.value1Title, desc: aboutContent.value1Desc },
    { title: aboutContent.value2Title, desc: aboutContent.value2Desc },
    { title: aboutContent.value3Title, desc: aboutContent.value3Desc },
  ];

  return (
    <div className="flex flex-col w-full animate-fade-up bg-white">
      
      {/* 1. TOP ABOUT HEADER BANNER */}
      <section 
        className="relative py-20 flex items-center justify-center text-white bg-cover bg-center -mt-20 pt-36"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(17, 66, 39, 0.5), rgba(17, 66, 39, 0.85)), url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1920')"
        }}
        aria-label="About Page Header"
      >
        <div className="relative text-center space-y-4">
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-widest uppercase drop-shadow-md">
            ABOUT US
          </h1>
          <div className="w-16 h-1 bg-amber-accent mx-auto rounded"></div>
          <p className="text-xs sm:text-sm text-slate-200 tracking-wider font-light uppercase">
            Who We Are • Our Journey • Governance Trustees
          </p>
        </div>
      </section>

      {/* Main Content Wrapper */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-20">
        
        {/* Editorial Subtitle block */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-display">Who We Are</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-[#114227]">
            {aboutContent.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            {aboutContent.subtitle}
          </p>
        </div>

        {/* Section 1: Our Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" aria-labelledby="story-heading">
          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <h3 id="story-heading" className="text-2xl font-display font-bold text-[#114227]">Our Story</h3>
            <div className="w-12 h-1 bg-emerald-600 rounded"></div>
            <p className="text-xs sm:text-sm leading-relaxed font-light">
              {aboutContent.history}
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-light italic border-l-4 border-emerald-600 pl-4 bg-emerald-50 p-4 rounded-r-lg text-emerald-950">
              "True social transformation is not about dependency; it is about building capability and matching it with meaningful opportunity."
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-lg border border-slate-200 p-2 bg-slate-900 aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800"
                alt="Teacher leading a class in adopted school room"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </section>

        {/* Section 2: ROTATABLE IMAGE SLIDER SHOWCASE (User Requested Feature) */}
        <section className="space-y-6" aria-labelledby="rotatable-images-heading">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                <Camera className="w-4 h-4" />
                <span>Interactive Gallery</span>
              </div>
              <h3 id="rotatable-images-heading" className="text-2xl sm:text-3xl font-display font-extrabold text-[#114227]">
                Field Moments & Rotatable Photo Showcase
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Auto-rotating image carousel showcasing real-world initiatives across education, safety, infrastructure, and foster care.
              </p>
            </div>
          </div>

          {/* Rotatable Image Slider Component */}
          <AboutImageSlider />
        </section>

        {/* Section 3: Vision & Mission */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-labelledby="vision-mission-heading">
          <h3 id="vision-mission-heading" className="sr-only">Vision and Mission Statement</h3>
          
          <div className="bg-[#114227] text-white p-8 sm:p-10 rounded-3xl space-y-4 shadow-lg border border-emerald-900/30 relative overflow-hidden">
            <Eye className="w-8 h-8 text-emerald-400" />
            <h4 className="text-xl font-bold font-display tracking-wide">Our Vision</h4>
            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed font-light">
              {aboutContent.vision}
            </p>
          </div>

          <div className="bg-emerald-50 p-8 sm:p-10 rounded-3xl border border-emerald-200 space-y-4 shadow-sm relative overflow-hidden">
            <Heart className="w-8 h-8 text-emerald-700 fill-emerald-100" />
            <h4 className="text-xl font-bold font-display text-[#114227] tracking-wide">Our Mission</h4>
            <p className="text-slate-700 text-xs sm:text-sm leading-relaxed font-light">
              {aboutContent.mission}
            </p>
          </div>
        </section>

        {/* Section 4: Values Grid */}
        <section className="space-y-12" aria-labelledby="values-heading">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 id="values-heading" className="text-2xl font-display font-bold text-[#114227]">Our Values</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              The foundational pillars that direct our daily activities, partner selections, and operational audits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl border border-slate-200 space-y-2 shadow-sm">
                <h4 className="font-bold text-[#114227] text-sm">{v.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Governance & Leadership */}
        <section className="space-y-12" aria-labelledby="gov-heading">
          <div className="border-t border-slate-200 pt-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 font-display">Trust & Leadership</span>
              <h3 id="gov-heading" className="text-2xl font-display font-bold text-[#114227]">Governance & Board</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                BBM Foundation operates under a formal board of trustees committed to statutory compliance, regulatory standards, and regular impact evaluation.
              </p>
            </div>

            <div className="bg-amber-50 border border-amber-200 text-slate-700 rounded-2xl p-4 my-8 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-[11px] space-y-1 font-light">
                <strong className="block text-slate-900 font-bold">Compliance & Transparency Notice</strong>
                <p>
                  To ensure complete institutional compliance, official trustee identities and personal bios are subject to formal verification audits. Verified profiles are presented below in full compliance.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-6 shadow-sm items-center sm:items-start text-center sm:text-left">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-slate-200 flex-shrink-0 shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0 border border-slate-200">
                      <Users className="w-8 h-8" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 text-sm sm:text-base leading-none">{member.name}</h4>
                      <span className="inline-block text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                        Verified Trustee
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-emerald-700 font-display">{member.role}</p>
                    <p className="text-xs text-slate-500 leading-relaxed font-light">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}
