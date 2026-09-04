import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/crypto";
import prisma from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    const session = sessionToken ? decryptSession(sessionToken) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();

    const updated = await prisma.resource.update({
      where: { id },
      data: body,
    });

    return NextResponse.json({ success: true, resource: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update resource" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    const session = sessionToken ? decryptSession(sessionToken) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await prisma.resource.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete resource" }, { status: 500 });
  }
}
