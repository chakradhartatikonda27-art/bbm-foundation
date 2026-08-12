import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifyPassword, encryptSession } from "@/lib/crypto";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    // Find admin user in database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Verify hashed password
    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    // Create encrypted session token
    const sessionToken = encryptSession({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 2, // 2 hours session duration
      path: "/",
    });

    return NextResponse.json({ success: true, role: user.role });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
