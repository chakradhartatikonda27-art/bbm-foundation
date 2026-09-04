import prisma from "@/lib/db";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function AdminGalleryPage() {
  const images = await prisma.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  return <GalleryAdminClient initialImages={images} />;
}
