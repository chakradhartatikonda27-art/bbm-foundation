export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import StoriesClient from "@/components/StoriesClient";

export const metadata = {
  title: "Stories — BBM Foundation",
  description: "Read inspiring stories of change, community resilience, and child empowerment from across our global and local initiatives.",
};

export default async function StoriesPage() {
  const stories = await prisma.story.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return <StoriesClient stories={stories} />;
}
