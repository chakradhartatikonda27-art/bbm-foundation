export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import StoriesClient from "@/components/StoriesClient";

export const metadata = {
  title: "Stories of Impact — BBM Foundation",
  description: "Read inspiring stories of change, family reunification, community resilience, and child empowerment from BBM Foundation initiatives.",
  alternates: {
    canonical: "/stories",
  },
  openGraph: {
    title: "Stories of Impact — BBM Foundation",
    description: "Read inspiring stories of change, family reunification, community resilience, and child empowerment from BBM Foundation initiatives.",
    url: "https://bbmfoundation.online/stories",
  },
};

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return <StoriesClient stories={stories} />;
}
