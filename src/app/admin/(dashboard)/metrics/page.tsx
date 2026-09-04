import prisma from "@/lib/db";
import MetricsAdminClient from "./MetricsAdminClient";

export default async function AdminMetricsPage() {
  const metrics = await prisma.metric.findMany({
    orderBy: { createdAt: "asc" },
  });

  return <MetricsAdminClient initialMetrics={metrics} />;
}
