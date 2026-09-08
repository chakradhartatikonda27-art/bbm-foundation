export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import StoriesClient from "@/components/StoriesClient";

export const metadata = {
  title: "Impact & Social Metrics — BBM Foundation",
  description: "Explore empirical social impact metrics, transformed lives, family reunifications, and community developments by BBM Foundation.",
  alternates: {
    canonical: "/impact",
  },
  openGraph: {
    title: "Impact & Social Metrics — BBM Foundation",
    description: "Explore empirical social impact metrics, transformed lives, family reunifications, and community developments by BBM Foundation.",
    url: "https://bbmfoundation.online/impact",
  },
};

export default async function ImpactPage() {
  const stories = await prisma.story.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return <StoriesClient stories={stories} />;
}
