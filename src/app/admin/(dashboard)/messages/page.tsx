export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import MessagesClient from "./MessagesClient";

export const metadata = {
  title: "Contact Messages | Admin Dashboard",
};

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <MessagesClient messages={messages} />;
}
