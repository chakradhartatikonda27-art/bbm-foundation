export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import WorkClient from "./WorkClient";

export const metadata = {
  title: "Our Work",
  description: "Explore the programmatic sectors and community development initiatives coordinated by BBM Foundation.",
};

export default async function OurWorkPage() {
  // Fetch active programs from SQLite
  const programs = await prisma.program.findMany({
    where: { status: "ACTIVE" },
  });

  return (
    <div className="bg-brand-bg py-16 sm:py-24 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Initiatives</span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-primary">
            Sectors of Service & Livelihood
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            We coordinates efforts across education, trade skill building, community development, and healthcare to empower individuals to live with self-reliance and dignity.
          </p>
        </div>

        {/* Client filter shell */}
        <WorkClient initialPrograms={programs} />
      </div>
    </div>
  );
}
