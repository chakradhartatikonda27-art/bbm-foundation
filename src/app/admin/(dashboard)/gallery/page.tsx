import { db } from "@/lib/db";
import GalleryAdminClient from "./GalleryAdminClient";

export default async function AdminGalleryPage() {
  const images = await db.galleryImage.findMany({
    orderBy: { order: "asc" },
  });

  return <GalleryAdminClient initialImages={images} />;
}
