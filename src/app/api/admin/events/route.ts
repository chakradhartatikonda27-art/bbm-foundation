import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/crypto";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const events = await db.event.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ success: true, events });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
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
    const { title, category, date, location, description, speakerName, speakerRole, speakerBio, imageUrl, registrationLink, status } = body;

    if (!title || !category || !date || !location || !description) {
      return NextResponse.json({ error: "Title, category, date, location, and description are required." }, { status: 400 });
    }

    const event = await db.event.create({
      data: {
        title,
        category,
        date,
        location,
        description,
        speakerName: speakerName || null,
        speakerRole: speakerRole || null,
        speakerBio: speakerBio || null,
        imageUrl: imageUrl || null,
        registrationLink: registrationLink || null,
        status: status || "UPCOMING",
      },
    });

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
  }
}
