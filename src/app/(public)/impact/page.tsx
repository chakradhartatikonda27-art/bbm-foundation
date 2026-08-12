export const dynamic = "force-dynamic";

import { CheckCircle, AlertTriangle, MessageSquare, ShieldAlert } from "lucide-react";
import prisma from "@/lib/db";

export const metadata = {
  title: "Our Impact",
  description: "Read stories of change and check verified metrics illustrating how BBM Foundation empowers communities.",
};

export default async function ImpactPage() {
  const metrics = await prisma.metric.findMany();
  const stories = await prisma.story.findMany();

  return (
    <div className="bg-brand-bg py-16 sm:py-24 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Impact</span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-primary">
            Service into Progress, Help into Self-Reliance
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            Our goal is not short-term dependencies; we focus on measuring lasting developmental milestones in education, trade-employment capacity, and community safety nets.
          </p>
        </div>

        {/* 1. Metrics Dashboard Panel */}
        <section className="space-y-8" aria-labelledby="metrics-heading">
          <div className="border-b border-border-gray pb-4">
            <h2 id="metrics-heading" className="text-2xl font-bold text-primary font-display">Target Milestones</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.id} className="bg-white p-6 rounded-2xl border border-border-gray shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">{m.label}</span>
                  <p className="text-2xl sm:text-3xl font-extrabold text-primary font-display">{m.value}</p>
                  {m.description && (
                    <p className="text-xs text-slate-500 leading-relaxed font-light pt-1">{m.description}</p>
                  )}
                </div>
                
                {/* Verification Badge */}
                <div>
                  {m.verified ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      <AlertTriangle className="w-3 h-3" />
                      Pending Audit
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl border border-border-gray text-xs text-slate-500 max-w-3xl leading-relaxed flex gap-3">
            <ShieldAlert className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <strong>Data Verification Protocol:</strong> All impact counts and beneficiary aggregates are marked as <code>[VERIFIED DATA REQUIRED]</code> or <code>Pending Audit</code> until verified by our independent legal auditors. BBM Foundation is committed to reporting only truth-based, compliant metrics to donors and partners.
            </div>
          </div>
        </section>

        {/* 2. Operational Journey */}
        <section className="bg-primary text-white p-8 sm:p-12 rounded-2xl border border-primary/25 space-y-8" aria-labelledby="journey-heading">
          <div className="max-w-xl space-y-2">
            <h2 id="journey-heading" className="text-2xl font-bold font-display text-amber-accent">The Impact Journey</h2>
            <p className="text-sm text-emerald-100/70 font-light">
              How we approach community assistance systematically to transition from short-term relief to long-term community resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 pt-4">
            {[
              { step: "01", title: "Identify Need", desc: "Carry out field surveys to list local structural deficits." },
              { step: "02", title: "Understand", desc: "Consult community leaders to understand systemic blockers." },
              { step: "03", title: "Act Mode", desc: "Design practical programs (schools, trade training)." },
              { step: "04", title: "Empower", desc: "Transfer direct tools and vocational skills to learners." },
              { step: "05", title: "Measure", desc: "Perform periodic performance and outcome audits." },
              { step: "06", title: "Sustain", desc: "Enable self-managed committees to take over local leadership." },
            ].map((j) => (
              <div key={j.step} className="space-y-2 bg-emerald-950/60 p-5 rounded-xl border border-emerald-900/40">
                <span className="text-xs font-bold text-amber-accent font-mono block">{j.step}</span>
                <h3 className="font-bold text-sm text-white">{j.title}</h3>
                <p className="text-[11px] text-emerald-200/80 leading-normal font-light">{j.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. Stories of Change Listing */}
        <section className="space-y-12" aria-labelledby="stories-title">
          <div className="border-b border-border-gray pb-4">
            <h2 id="stories-title" className="text-2xl font-bold text-primary font-display">Stories of Change</h2>
          </div>

          <div className="space-y-12">
            {stories.map((story) => (
              <article key={story.id} className="bg-white rounded-2xl border border-border-gray p-6 sm:p-10 shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
                  
                  {story.imageUrl && (
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full md:w-48 h-48 object-cover rounded-xl border border-border-gray flex-shrink-0"
                      loading="lazy"
                    />
                  )}

                  <div className="space-y-4 flex-grow">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary font-display">{story.title}</h3>
                      <span className="text-xs text-slate-400 block mt-1">Impact Record • Published by {story.author}</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                      <div className="space-y-1">
                        <strong className="text-xs font-bold uppercase tracking-wider text-slate-500 block">The Challenge</strong>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">{story.challenge}</p>
                      </div>
                      <div className="space-y-1">
                        <strong className="text-xs font-bold uppercase tracking-wider text-slate-500 block">The Intervention</strong>
                        <p className="text-sm text-slate-600 leading-relaxed font-light">{story.intervention}</p>
                      </div>
                      <div className="space-y-1">
                        <strong className="text-xs font-bold uppercase tracking-wider text-slate-500 block">The Outcome</strong>
                        <p className="text-sm text-slate-700 leading-relaxed font-semibold">{story.outcome}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {story.quote && (
                  <blockquote className="border-l-4 border-secondary/50 pl-4 py-1 text-slate-600 italic text-sm bg-slate-50 p-4 rounded-r-xl flex gap-2">
                    <MessageSquare className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" />
                    <span>“{story.quote}”</span>
                  </blockquote>
                )}
              </article>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
