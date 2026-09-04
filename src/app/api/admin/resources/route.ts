import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/crypto";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const resources = await db.resource.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, resources });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resources" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("session")?.value;
    const session = sessionToken ? decryptSession(sessionToken) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await request.json();
    const { title, category, description, linkUrl, format, featured } = body;

    if (!title || !category || !description) {
      return NextResponse.json({ error: "Title, category, and description are required." }, { status: 400 });
    }

    const resource = await db.resource.create({
      data: {
        title,
        category,
        description,
        linkUrl: linkUrl || null,
        format: format || "PDF",
        featured: Boolean(featured),
      },
    });

    return NextResponse.json({ success: true, resource }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create resource" }, { status: 500 });
  }
}
