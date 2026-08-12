"use server";

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createStory(formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const challenge = formData.get("challenge") as string;
  const intervention = formData.get("intervention") as string;
  const outcome = formData.get("outcome") as string;
  const quote = formData.get("quote") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!title || !author || !challenge || !intervention || !outcome) {
    return { success: false, error: "Title, author, challenge, intervention, and outcome are required." };
  }

  try {
    await prisma.story.create({
      data: {
        title,
        author,
        challenge,
        intervention,
        outcome,
        quote: quote || null,
        imageUrl: imageUrl || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/impact");
    return { success: true };
  } catch (err) {
    console.error("Create story database error:", err);
    return { success: false, error: "Failed to create story of change." };
  }
}

export async function updateStory(id: string, formData: FormData) {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const challenge = formData.get("challenge") as string;
  const intervention = formData.get("intervention") as string;
  const outcome = formData.get("outcome") as string;
  const quote = formData.get("quote") as string;
  const imageUrl = formData.get("imageUrl") as string;

  if (!id || !title || !author || !challenge || !intervention || !outcome) {
    return { success: false, error: "Invalid parameters. All fields are required." };
  }

  try {
    await prisma.story.update({
      where: { id },
      data: {
        title,
        author,
        challenge,
        intervention,
        outcome,
        quote: quote || null,
        imageUrl: imageUrl || null,
      },
    });

    revalidatePath("/");
    revalidatePath("/impact");
    return { success: true };
  } catch (err) {
    console.error("Update story database error:", err);
    return { success: false, error: "Failed to update story of change." };
  }
}

export async function deleteStory(id: string) {
  if (!id) return { success: false, error: "Story ID is required." };

  try {
    await prisma.story.delete({
      where: { id },
    });

    revalidatePath("/");
    revalidatePath("/impact");
    return { success: true };
  } catch (err) {
    console.error("Delete story database error:", err);
    return { success: false, error: "Failed to delete story of change." };
  }
}
