"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createProgram(formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const status = formData.get("status") as string;
  const verifiedVal = formData.get("verified") === "true";

  if (!title || !category || !description) {
    return { success: false, error: "Title, category, and description are required." };
  }

  try {
    await prisma.program.create({
      data: {
        title,
        category,
        description,
        imageUrl: imageUrl || null,
        status: status || "ACTIVE",
        verified: verifiedVal,
      },
    });

    revalidatePath("/");
    revalidatePath("/our-work");
    return { success: true };
  } catch (err) {
    console.error("Create program database error:", err);
    return { success: false, error: "Failed to create program." };
  }
}

export async function updateProgram(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const category = formData.get("category") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string;
  const status = formData.get("status") as string;
  const verifiedVal = formData.get("verified") === "true";

  if (!id || !title || !category || !description) {
    return { success: false, error: "Invalid parameters. All fields are required." };
  }

  try {
    await prisma.program.update({
      where: { id },
      data: {
        title,
        category,
        description,
        imageUrl: imageUrl || null,
        status: status || "ACTIVE",
        verified: verifiedVal,
      },
    });

    revalidatePath("/");
    revalidatePath("/our-work");
    return { success: true };
  } catch (err) {
    console.error("Update program database error:", err);
    return { success: false, error: "Failed to update program." };
  }
}

export async function deleteProgram(id: string) {
  if (!id) return { success: false, error: "Program ID is required." };

  try {
    await prisma.program.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/our-work");
    return { success: true };
  } catch (err) {
    console.error("Delete program database error:", err);
    return { success: false, error: "Failed to delete program." };
  }
}
