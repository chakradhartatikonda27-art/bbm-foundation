import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/crypto";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const images = await prisma.galleryImage.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json({ success: true, images });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery images" }, { status: 500 });
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
    const { title, category, imageUrl, order } = body;

    if (!title || !category || !imageUrl) {
      return NextResponse.json({ error: "Title, category, and imageUrl are required." }, { status: 400 });
    }

    const image = await prisma.galleryImage.create({
      data: {
        title,
        category,
        imageUrl,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create gallery image" }, { status: 500 });
  }
}
