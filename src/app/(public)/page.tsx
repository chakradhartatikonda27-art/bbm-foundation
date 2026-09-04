export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import HomePageClient from "@/components/HomePageClient";

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
    <HomePageClient
      programs={programs}
      stories={stories}
      metrics={metrics}
    />
  );
}
