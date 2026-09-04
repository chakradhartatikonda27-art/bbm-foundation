import prisma from "@/lib/db";

export async function getSiteContent<T>(key: string, defaultData: T): Promise<T> {
  try {
    const record = await prisma.siteContent.findUnique({
      where: { key },
    });
    if (!record || !record.content) {
      return defaultData;
    }
    const parsed = JSON.parse(record.content);
    return { ...defaultData, ...parsed };
  } catch (error) {
    console.error(`Error loading site content for key "${key}":`, error);
    return defaultData;
  }
}

export async function getAllSiteContent(): Promise<Record<string, any>> {
  try {
    const records = await prisma.siteContent.findMany();
    return records.reduce((acc, curr) => {
      try {
        acc[curr.key] = JSON.parse(curr.content);
      } catch {
        acc[curr.key] = curr.content;
      }
      return acc;
    }, {} as Record<string, any>);
  } catch (error) {
    console.error("Error loading all site content:", error);
    return {};
  }
}
