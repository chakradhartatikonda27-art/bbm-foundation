import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donorName, donorEmail, donorPhone, amount, purpose } = body;

    if (!donorName || !donorEmail || !amount || !purpose) {
      return NextResponse.json(
        { error: "Required details (Name, Email, Amount, Purpose) are missing." },
        { status: 400 }
      );
    }

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return NextResponse.json({ error: "Invalid donation amount." }, { status: 400 });
    }

    // Save transaction in database with INITIATED status
    const donation = await prisma.donation.create({
      data: {
        donorName,
        donorEmail,
        donorPhone: donorPhone || null,
        amount: parsedAmount,
        purpose,
        status: "INITIATED",
      },
    });

    return NextResponse.json({ success: true, donationId: donation.id });
  } catch (err) {
    console.error("Database initiation error:", err);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
