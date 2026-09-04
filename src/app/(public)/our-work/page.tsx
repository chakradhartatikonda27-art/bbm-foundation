export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import WorkClient from "./WorkClient";
import { getSiteContent } from "@/lib/siteContent";

export const metadata = {
  title: "Our Work",
  description: "Explore the programmatic sectors and community development initiatives coordinated by BBM Foundation.",
};

export default async function OurWorkPage() {
  const programs = await prisma.program.findMany({
    where: { status: "ACTIVE" },
  });

  const defaultWork = {
    title: "Our Initiatives & Programs",
    subtitle: "Comprehensive social programs focusing on child care, education, youth skills, and emergency relief.",
    overview: "From grass-roots education drives to strategic family reunification, explore our core initiatives across South India.",
  };

  const workContent = await getSiteContent("our_work_page", defaultWork);

  return (
    <div className="bg-brand-bg py-16 sm:py-24 animate-fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-secondary">Our Initiatives</span>
          <h1 className="text-4xl sm:text-5xl font-display font-extrabold tracking-tight text-primary">
            {workContent.title}
          </h1>
          <p className="text-lg text-slate-500 font-light leading-relaxed">
            {workContent.subtitle || workContent.overview}
          </p>
        </div>

        {/* Client filter shell */}
        <WorkClient initialPrograms={programs} />
      </div>
    </div>
  );
}
