import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/crypto";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (key) {
      const content = await prisma.siteContent.findUnique({
        where: { key },
      });
      return NextResponse.json({ success: true, data: content ? JSON.parse(content.content) : null });
    }

    const allContent = await prisma.siteContent.findMany();
    const formatted = allContent.reduce((acc: Record<string, any>, curr: { key: string; content: string }) => {
      try {
        acc[curr.key] = JSON.parse(curr.content);
      } catch {
        acc[curr.key] = curr.content;
      }
      return acc;
    }, {} as Record<string, any>);

    return NextResponse.json({ success: true, data: formatted });
  } catch {
    return NextResponse.json({ error: "Failed to fetch site content" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    const session = sessionToken ? decryptSession(sessionToken) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { key, payload } = await request.json();

    if (!key || payload === undefined) {
      return NextResponse.json({ error: "Key and payload are required" }, { status: 400 });
    }

    const contentStr = typeof payload === "string" ? payload : JSON.stringify(payload);

    const updated = await prisma.siteContent.upsert({
      where: { key },
      update: { content: contentStr },
      create: { key, content: contentStr },
    });

    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update site content" }, { status: 500 });
  }
}
