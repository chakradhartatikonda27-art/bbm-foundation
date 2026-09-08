export const dynamic = "force-dynamic";

import EventsClient from "@/components/EventsClient";
import prisma from "@/lib/db";

export const metadata = {
  title: "Events & Gatherings — BBM Foundation",
  description: "Join BBM Foundation global community gatherings, regional workshops, and leadership summits.",
};

async function getSiteContent() {
  try {
    const records = await prisma.siteContent.findMany();
    return records.reduce((acc: any, curr: { key: string; content: string }) => {
      try {
        acc[curr.key] = JSON.parse(curr.content);
      } catch {
        acc[curr.key] = curr.content;
      }
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export default async function EventsPage() {
  const siteContent = await getSiteContent();
  return <EventsClient siteContent={siteContent} />;
}
