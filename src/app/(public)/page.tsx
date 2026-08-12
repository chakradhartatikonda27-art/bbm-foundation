export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowRight, BookOpen, Briefcase, Heart, Award, Shield, Users, CheckCircle } from "lucide-react";
import prisma from "@/lib/db";

export default async function HomePage() {
  // Fetch dynamic content from SQLite
  const programs = await prisma.program.findMany({
    where: { status: "ACTIVE" },
    take: 3,
  });

  const stories = await prisma.story.findMany({
    take: 2,
  });

  const metrics = await prisma.metric.findMany();

  return (
    <div className="flex flex-col w-full animate-fade-up">
      
      {/* 1. HERO SECTION (Misty Green tea gardens background, white centered header) */}
      <section 
        className="relative min-h-[50vh] sm:min-h-[60vh] -mt-20 pt-36 pb-24 sm:pt-44 sm:pb-32 flex items-center justify-center text-white overflow-hidden bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(to bottom, rgba(17, 66, 39, 0.45), rgba(17, 66, 39, 0.75)), url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920')"
        }}
        aria-label="Introduction Hero"
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h1 className="text-4xl sm:text-6xl font-display font-extrabold tracking-widest uppercase leading-tight drop-shadow-md">
            OUR PURPOSE
          </h1>
          <div className="w-24 h-1 bg-amber-accent mx-auto rounded"></div>
          <p className="text-sm sm:text-base text-slate-100 tracking-wider font-light max-w-2xl mx-auto leading-relaxed uppercase">
            Building Lives • Creating Opportunities • Serving Humanity
          </p>
        </div>
      </section>

      {/* 2. PILLARS STRIP */}
      <section className="bg-white border-b border-border-gray py-6" aria-label="Organizational Pillars">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="py-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pillar I</span>
              <span className="block text-sm font-extrabold text-secondary mt-0.5">VISION</span>
            </div>
            <div className="py-2 border-l border-slate-100">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pillar II</span>
              <span className="block text-sm font-extrabold text-secondary mt-0.5">SERVICE</span>
            </div>
            <div className="py-2 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pillar III</span>
              <span className="block text-sm font-extrabold text-secondary mt-0.5">IMPACT</span>
            </div>
            <div className="py-2 border-t md:border-t-0 border-l border-slate-100 pt-4 md:pt-2">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">Pillar IV</span>
              <span className="block text-sm font-extrabold text-secondary mt-0.5">LEGACY</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR PURPOSE SECTION (Screenshot 1 & 2 layout: White BG, green header, laughter children photo) */}
      <section className="py-20 sm:py-24 bg-white" aria-labelledby="purpose-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="purpose-heading" className="text-3xl font-display font-bold text-secondary">
              Our Purpose
            </h2>
            <div className="w-12 h-1 bg-amber-accent mx-auto mt-2 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Text details */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                At BBM Foundation, we believe in creating a bright future for every child, with the goal of positively impacting thousands of lives. We believe that true success is not measured only by what we achieve for ourselves, but by how many lives we positively influence along the way.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                We also help families invest in long-term security. Our wide range of community enablement models and skill development options make it easy for people to find the right place to build self-reliance, support their education, or grow their livelihood opportunities.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                Many people have already found the perfect pathway with us, helping them take the first step toward securing their family's future and contributing to the nation.
              </p>
              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors group"
                >
                  Learn About BBM Foundation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Laughing Children Image (Right side) */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800"
                  alt="Happy school children laughing"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VISION SECTION (Screenshot 2 layout: Soft mint green background, wood blocks metaphor) */}
      <section className="py-20 sm:py-24 bg-brand-bg border-y border-border-gray" aria-labelledby="vision-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="vision-heading" className="text-3xl font-display font-bold text-secondary">
              Vision
            </h2>
            <div className="w-12 h-1 bg-amber-accent mx-auto mt-2 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Building Blocks Metaphor (Left side) */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100 bg-white p-2">
                <img
                  src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=800"
                  alt="Teamwork hands together supporting each other"
                  className="w-full h-80 object-cover rounded-xl"
                />
              </div>
            </div>

            {/* Vision text details */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                Our daily mission is simple: to create a lasting impact that helps shape a brighter future for every child. Every morning, we are driven by the dream of making a positive difference in the lives of the communities we serve.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                We believe that every child is full of potential to shape their own future and uplift their family. Just as a bird is meant to soar freely, children should never be confined by structural limits. With the right opportunities, they don't just make their families proud, but also contribute to their communities.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                At the same time, we help families secure their future by offering reliable, verified solutions. We make it our priority to implement transparent, high-impact programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HERITAGE SECTION (Screenshot 3 layout: White BG, professional corporate photo, gold details) */}
      <section className="py-20 sm:py-24 bg-white" aria-labelledby="heritage-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 id="heritage-heading" className="text-3xl font-display font-bold text-secondary">
              Heritage
            </h2>
            <div className="w-12 h-1 bg-amber-accent mx-auto mt-2 rounded"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left column: Professional Team Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800"
                  alt="BBM Foundation leadership and coordinators"
                  className="w-full h-80 object-cover"
                />
              </div>
            </div>

            {/* Right column: Description */}
            <div className="lg:col-span-7 space-y-6">
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                We make the dream of development a reality for people across the sub-continent. With decades of collective experience, our team of dedicated professionals stands by core values like integrity, transparency, timely delivery, large-scale support, and excellence.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                By combining these values with modern practices, we make it easy and trustworthy for families to invest in their future. Deserving individuals can find a variety of options that fit their needs—whether it is vocational training, educational scholarships, or local community support systems.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                Our expert leadership team is committed to delivering exceptional service and driving positive change as we work toward our long-term goals. Through constant focus, we help individuals turn their aspirations into reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. OUR WORK / ACTIVE PROGRAMS (Soft mint green BG, dynamic SQLite database query cards) */}
      <section className="py-20 sm:py-24 bg-brand-bg border-y border-border-gray" aria-labelledby="work-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-xl space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-secondary font-display">Active Programs</span>
              <h2 id="work-heading" className="text-2xl sm:text-3xl font-display font-bold text-primary">
                Pillars of Our Action
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-light">
                Explore the programmatic areas where BBM Foundation actively works to create structural opportunities.
              </p>
            </div>
            <Link
              href="/our-work"
              className="inline-flex items-center px-6 py-2.5 rounded-full text-xs font-bold border border-secondary text-secondary hover:bg-secondary hover:text-white transition-all shadow-sm"
            >
              See All Programs
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Link>
          </div>

          {/* Program Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {programs.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-2xl border border-border-gray overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all duration-300"
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
                      No Image Available
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-brand-bg text-secondary border border-secondary/20">
                      {prog.category}
                    </span>
                    <h3 className="text-base font-bold text-primary">{prog.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 font-light">
                      {prog.description}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href={`/our-work?program=${prog.id}`}
                    className="inline-flex items-center text-xs font-bold text-secondary hover:text-primary group transition-colors"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. METHODOLOGY & KEY METRICS (Deep Green bg metric cards, verification compliance badges) */}
      <section className="py-20 sm:py-24 bg-white" aria-labelledby="impact-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Impact Text & Flow */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Methodology</span>
                <h2 id="impact-heading" className="text-2xl sm:text-3xl font-display font-bold text-primary">
                  From Service to Lasting Impact
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light">
                  BBM Foundation seeks to transform help into empowerment, opportunity into progress, and service into lasting social impact.
                </p>
              </div>

              {/* Journey Stepper */}
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Our Operational Steps</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[
                    { num: "01", step: "Identify Need" },
                    { num: "02", step: "Understand" },
                    { num: "03", step: "Act Mode" },
                    { num: "04", step: "Empower" },
                    { num: "05", step: "Measure" },
                    { num: "06", step: "Sustain" },
                  ].map((item) => (
                    <div key={item.num} className="p-4 bg-brand-bg rounded-xl border border-border-gray">
                      <span className="block text-[10px] font-bold text-secondary font-mono">{item.num}</span>
                      <span className="block text-xs font-bold text-primary mt-1">{item.step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics card (Deep green wrapper) */}
            <div className="lg:col-span-5">
              <div className="bg-primary text-white p-8 rounded-2xl shadow-xl space-y-6 border border-primary/20">
                <h3 className="text-base font-bold text-amber-accent">Key Focus Indicators</h3>
                <div className="divide-y divide-white/10">
                  {metrics.map((metric) => (
                    <div key={metric.id} className="py-4 first:pt-0 last:pb-0 space-y-1">
                      <span className="block text-[10px] text-emerald-200/80 font-medium">{metric.label}</span>
                      <div className="flex items-baseline gap-2">
                        <span className="text-xl sm:text-2xl font-extrabold text-white">{metric.value}</span>
                        {!metric.verified && (
                          <span className="text-[8px] uppercase font-bold text-amber-accent/90 tracking-widest border border-amber-accent/30 px-1.5 py-0.5 rounded bg-amber-accent/5">
                            Pending Verification
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-emerald-950/60 p-4 rounded-xl border border-emerald-900/40 text-[10px] text-emerald-200/70 leading-relaxed font-light">
                  <strong>Verification Note:</strong> Core statistical aggregates are currently under formal regulatory/compliance audits. The metrics above represent target milestones and will be updated immediately upon audit finalization.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. STORIES OF CHANGE */}
      <section className="py-20 sm:py-24 bg-brand-bg border-t border-border-gray" aria-labelledby="stories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Stories of Change</span>
            <h2 id="stories-heading" className="text-2xl sm:text-3xl font-display font-bold text-primary">
              Lives Transformed Through Opportunity
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-light">
              Read authentic, verifiable accounts of individuals who have built self-reliance through the support of BBM Foundation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stories.map((story) => (
              <div key={story.id} className="bg-white rounded-2xl border border-border-gray overflow-hidden flex flex-col justify-between shadow-sm p-6 sm:p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    {story.imageUrl ? (
                      <img
                        src={story.imageUrl}
                        alt={story.title}
                        className="w-12 h-12 rounded-full object-cover border-2 border-border-gray"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border border-border-gray">
                        User
                      </div>
                    )}
                    <div>
                      <h3 className="text-sm font-bold text-primary leading-tight">{story.title}</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">Written by {story.author}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3 text-xs leading-relaxed">
                    <div>
                      <strong className="text-slate-700 block text-[10px] uppercase tracking-wider">The Challenge:</strong>
                      <p className="text-slate-500 font-light mt-0.5">{story.challenge}</p>
                    </div>
                    <div>
                      <strong className="text-slate-700 block text-[10px] uppercase tracking-wider">The Intervention:</strong>
                      <p className="text-slate-500 font-light mt-0.5">{story.intervention}</p>
                    </div>
                    <div>
                      <strong className="text-slate-700 block text-[10px] uppercase tracking-wider">The Outcome:</strong>
                      <p className="text-slate-600 font-medium mt-0.5">{story.outcome}</p>
                    </div>
                  </div>
                </div>

                {story.quote && (
                  <div className="border-t border-border-gray pt-4 bg-brand-bg p-4 rounded-xl border border-slate-100">
                    <p className="text-[11px] italic text-slate-500 font-light">“{story.quote}”</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/impact"
              className="inline-flex items-center gap-1 text-xs font-bold text-secondary hover:text-primary transition-colors group"
            >
              Read More Impact Stories
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA SECTION (Deep Forest Green BG, centered amber CTA buttons) */}
      <section className="bg-primary text-white py-16 sm:py-20" aria-label="Final Invitation Call">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight">
            Ready to Support Our Mission?
          </h2>
          <div className="w-12 h-1 bg-amber-accent mx-auto rounded"></div>
          <p className="text-xs sm:text-sm text-emerald-100/70 max-w-2xl mx-auto font-light leading-relaxed">
            Every contribution directly funds community developmental programs, educational tools, and trade workshops. Your participation makes a real difference.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold bg-amber-accent hover:bg-amber-700 text-white transition-all shadow-md"
            >
              Support Our Mission
              <Heart className="w-4 h-4 ml-1.5 fill-current" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-xs font-bold border border-emerald-700/60 hover:bg-emerald-950/40 text-emerald-100 transition-all focus:outline-none"
            >
              Contact Our Office
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
