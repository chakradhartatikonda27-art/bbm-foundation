import { db } from "@/lib/db";
import MetricsAdminClient from "./MetricsAdminClient";

export default async function AdminMetricsPage() {
  const metrics = await db.metric.findMany({
    orderBy: { createdAt: "asc" },
  });

  return <MetricsAdminClient initialMetrics={metrics} />;
}
