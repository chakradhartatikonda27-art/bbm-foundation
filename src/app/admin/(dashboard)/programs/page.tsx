export const dynamic = "force-dynamic";

import prisma from "@/lib/db";
import ProgramsClient from "./ProgramsClient";

export const metadata = {
  title: "Programs Manager | Admin Dashboard",
};

export default async function AdminProgramsPage() {
  const programs = await prisma.program.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <ProgramsClient programs={programs} />;
}
