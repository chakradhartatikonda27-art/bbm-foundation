"use server";

import prisma from "@/lib/db";

export async function submitContactForm(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const purpose = formData.get("purpose") as string; // DONATION, VOLUNTEER, PARTNERSHIP, OTHER
  const message = formData.get("message") as string;

  // Basic validation
  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  // Email format regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        purpose: purpose || "OTHER",
        message,
      },
    });
    return { success: true, error: null };
  } catch (err) {
    console.error("Server Action Database Error:", err);
    return { success: false, error: "An internal server error occurred. Please try again later." };
  }
}
