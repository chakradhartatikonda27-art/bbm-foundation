import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/crypto";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const metrics = await db.metric.findMany({
      orderBy: { createdAt: "asc" },
    });
    return NextResponse.json({ success: true, metrics });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metrics" }, { status: 500 });
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
    const { label, value, description, verified } = body;

    if (!label || !value) {
      return NextResponse.json({ error: "Label and value are required." }, { status: 400 });
    }

    const metric = await db.metric.create({
      data: {
        label,
        value,
        description: description || null,
        verified: Boolean(verified),
      },
    });

    return NextResponse.json({ success: true, metric }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create metric" }, { status: 500 });
  }
}
