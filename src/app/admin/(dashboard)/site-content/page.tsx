import { db } from "@/lib/db";
import SiteContentClient from "./SiteContentClient";

export default async function SiteContentPage() {
  const content = await db.siteContent.findMany();

  const formatted = content.reduce((acc, curr) => {
    try {
      acc[curr.key] = JSON.parse(curr.content);
    } catch {
      acc[curr.key] = curr.content;
    }
    return acc;
  }, {} as Record<string, any>);

  return <SiteContentClient initialContent={formatted} />;
}
