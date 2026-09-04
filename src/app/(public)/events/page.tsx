export const dynamic = "force-dynamic";

import EventsClient from "@/components/EventsClient";

export const metadata = {
  title: "Events & Gatherings — BBM Foundation",
  description: "Join BBM Foundation global community gatherings, regional workshops, and leadership summits.",
};

export default function EventsPage() {
  return <EventsClient />;
}
