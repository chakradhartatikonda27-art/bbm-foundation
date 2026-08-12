export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import StoriesClient from "./StoriesClient";

export const metadata = {
  title: "Stories of Change Manager | Admin Dashboard",
};

export default async function AdminStoriesPage() {
  const stories = await prisma.story.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return <StoriesClient stories={stories} />;
}
