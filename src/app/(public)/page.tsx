export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import HomePageClient from "@/components/HomePageClient";

export default async function HomePage() {
  // Fetch dynamic content from DB
  const programs = await prisma.program.findMany({
    where: { status: "ACTIVE" },
    take: 3,
  });

  const stories = await prisma.story.findMany({
    take: 2,
  });

  const metrics = await prisma.metric.findMany();

  const rawSiteContent = await prisma.siteContent.findMany();
  const siteContent = rawSiteContent.reduce((acc, curr) => {
    try {
      acc[curr.key] = JSON.parse(curr.content);
    } catch {
      acc[curr.key] = curr.content;
    }
    return acc;
  }, {} as Record<string, any>);

  return (
    <HomePageClient
      programs={programs}
      stories={stories}
      metrics={metrics}
      siteContent={siteContent}
    />
  );
}
