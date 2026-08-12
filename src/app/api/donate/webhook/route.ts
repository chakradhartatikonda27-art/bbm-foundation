import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { donationId, paymentId, status } = body;

    if (!donationId || !paymentId) {
      return NextResponse.json(
        { error: "Invalid webhook payload. Missing donationId or paymentId." },
        { status: 400 }
      );
    }

    // Verify order exists
    const order = await prisma.donation.findUnique({
      where: { id: donationId },
    });

    if (!order) {
      return NextResponse.json({ error: "Transaction record not found." }, { status: 404 });
    }

    // Verify client state transition is only allowed from INITIATED
    if (order.status !== "INITIATED" && order.status !== "SUCCESS") {
      return NextResponse.json({ error: "Invalid transaction state transition." }, { status: 400 });
    }

    // Update transaction state in database
    const updatedDonation = await prisma.donation.update({
      where: { id: donationId },
      data: {
        status: status === "SUCCESS" ? "SUCCESS" : "FAILED",
        paymentId: paymentId,
      },
    });

    return NextResponse.json({
      success: true,
      status: updatedDonation.status,
      receipt: {
        id: updatedDonation.id,
        name: updatedDonation.donorName,
        email: updatedDonation.donorEmail,
        amount: updatedDonation.amount,
        purpose: updatedDonation.purpose,
        paymentId: updatedDonation.paymentId,
        date: updatedDonation.createdAt,
      },
    });
  } catch (err) {
    console.error("Webhook processing error:", err);
    return NextResponse.json({ error: "Internal server error occurred." }, { status: 500 });
  }
}
