export const dynamic = "force-dynamic";

import { ShieldAlert, CheckCircle, Users, Eye, Heart } from "lucide-react";
import prisma from "@/lib/db";

export default async function AboutPage() {
  const team = await prisma.teamMember.findMany({
    orderBy: { order: "asc" },
  });

  const values = [
    {
      title: "Transparency First",
      desc: "Every donor contribution, programmatic milestone, and audited balance sheet is published in full compliance.",
    },
    {
      title: "Sustainable Capability",
      desc: "We focus on building long-term capability and self-reliance rather than encouraging temporary dependency.",
    },
    {
      title: "Community Dignity",
      desc: "We operate with deep respect for the cultural realities and dignity of every family and community we serve.",
    },
  ];

  return (
    <div className="flex flex-col w-full animate-fade-up">
      
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
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-display">Who We Are</span>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight text-primary">
            Driven by Purpose. Defined by Service.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 font-light leading-relaxed">
            BBM Foundation is a social-impact institution dedicated to breaking structural barriers, creating pathways of self-reliance, and helping communities grow with dignity.
          </p>
        </div>

        {/* Section 1: Our Story (Text left, classroom picture right) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center" aria-labelledby="story-heading">
          <div className="lg:col-span-7 space-y-6 text-slate-600">
            <h3 id="story-heading" className="text-2xl font-display font-bold text-primary">Our Story</h3>
            <div className="w-12 h-1 bg-secondary rounded"></div>
            <p className="text-xs sm:text-sm leading-relaxed font-light">
              BBM Foundation was founded with a foundational resolve: that structural inequality can be addressed when individuals are equipped with access to quality learning, trade skills, and community safety nets.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-light">
              We started by addressing local learning gaps, providing mentorship, and organizing skill workshops. Over time, our programs grew to incorporate structured community wellness, women-led livelihood programs, and family support models. 
            </p>
            <p className="text-xs sm:text-sm leading-relaxed font-light italic border-l-4 border-amber-accent/50 pl-4 bg-brand-bg p-4 rounded-r-lg">
              "True social transformation is not about dependency; it is about building capability and matching it with meaningful opportunity."
            </p>
          </div>

          {/* School classroom image (Right side) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100 p-1.5 bg-white">
              <img
                src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800"
                alt="Teacher leading a class in adopted school room"
                className="w-full h-72 object-cover rounded-xl"
              />
            </div>
          </div>
        </section>

        {/* Section 2: Vision & Mission (Highlighted, premium cards) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8" aria-labelledby="vision-mission-heading">
          <h3 id="vision-mission-heading" className="sr-only">Vision and Mission Statement</h3>
          
          {/* Vision card (Deep Forest Green, Gold details) */}
          <div className="bg-primary text-white p-8 sm:p-10 rounded-2xl space-y-4 shadow-lg border border-primary/20 relative overflow-hidden">
            <Eye className="w-8 h-8 text-amber-accent" />
            <h4 className="text-xl font-bold font-display tracking-wide">Our Vision</h4>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed font-light">
              To build an inclusive society where every individual has the structural opportunity to learn, develop capabilities, prosper, and contribute actively to their community with self-reliance.
            </p>
          </div>

          {/* Mission card (Mint green tint, Forest Green details) */}
          <div className="bg-brand-bg p-8 sm:p-10 rounded-2xl border border-secondary/20 space-y-4 shadow-sm relative overflow-hidden">
            <Heart className="w-8 h-8 text-secondary fill-secondary/10" />
            <h4 className="text-xl font-bold font-display text-primary tracking-wide">Our Mission</h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light">
              To deliver practical programs in education support, vocational training, women’s livelihood facilitation, healthcare support, and youth responsibility, while maintaining absolute transparency and accountability.
            </p>
          </div>
        </section>

        {/* Section 3: Widescreen Children Classroom Graphic Banner */}
        <section className="relative rounded-3xl overflow-hidden h-64 sm:h-80 shadow-md">
          <div className="absolute inset-0 bg-primary/20 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200" 
            alt="School children studying happy classroom environment" 
            className="w-full h-full object-cover"
          />
        </section>

        {/* Section 4: Values Grid */}
        <section className="space-y-12" aria-labelledby="values-heading">
          <div className="text-center max-w-xl mx-auto space-y-3">
            <h3 id="values-heading" className="text-2xl font-display font-bold text-primary">Our Values</h3>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              The foundational pillars that direct our daily activities, partner selections, and operational audits.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-xl border border-border-gray space-y-2 shadow-sm">
                <h4 className="font-bold text-primary text-sm">{v.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">{v.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 5: Governance & Leadership (Queried from SQLite DB, founders photos & bios) */}
        <section className="space-y-12" aria-labelledby="gov-heading">
          <div className="border-t border-border-gray pt-16">
            <div className="max-w-2xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-display">Trust & Leadership</span>
              <h3 id="gov-heading" className="text-2xl font-display font-bold text-primary">Governance & Board</h3>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                BBM Foundation operates under a formal board of trustees committed to statutory compliance, regulatory standards, and regular impact evaluation.
              </p>
            </div>

            {/* Verification Alert Banner */}
            <div className="bg-amber-accent/10 border border-amber-accent/20 text-slate-700 rounded-xl p-4 my-8 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-amber-accent flex-shrink-0 mt-0.5" />
              <div className="text-[11px] space-y-1 font-light">
                <strong className="block text-primary font-bold">Compliance & Transparency Notice</strong>
                <p>
                  To ensure complete institutional compliance, official trustee identities and personal bios are subject to formal verification audits. Verified profiles are presented below in full compliance.
                </p>
              </div>
            </div>

            {/* Team Members Grid (Founders/Trustees from SQLite) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-border-gray flex flex-col sm:flex-row gap-6 shadow-sm items-center sm:items-start text-center sm:text-left">
                  {member.imageUrl ? (
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-border-gray flex-shrink-0 shadow-sm"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0 border border-border-gray">
                      <Users className="w-8 h-8" />
                    </div>
                  )}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                      <h4 className="font-bold text-primary text-sm sm:text-base leading-none">{member.name}</h4>
                      <span className="inline-block text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-brand-bg text-secondary border border-secondary/15">
                        Verified Trustee
                      </span>
                    </div>
                    <p className="text-[11px] font-bold text-secondary font-display">{member.role}</p>
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
