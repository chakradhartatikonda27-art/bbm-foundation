import { db } from "@/lib/db";
import ResourcesAdminClient from "./ResourcesAdminClient";

export default async function AdminResourcesPage() {
  const resources = await db.resource.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ResourcesAdminClient initialResources={resources} />;
}
