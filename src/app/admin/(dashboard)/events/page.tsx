import { db } from "@/lib/db";
import EventsAdminClient from "./EventsAdminClient";

export default async function AdminEventsPage() {
  const events = await db.event.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <EventsAdminClient initialEvents={events} />;
}
