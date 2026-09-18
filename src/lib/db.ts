import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import path from "path";
import fs from "fs";
import os from "os";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Ensure SQLite database file is writable in serverless / production environments (Vercel, Docker, AWS)
const getDatabaseUrl = () => {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const rootDbPath = path.join(process.cwd(), "dev.db");
  const tmpDbPath = path.join(os.tmpdir(), "bbm-foundation-dev.db");

  try {
    // Copy bundled dev.db to writable /tmp directory if not present
    if (!fs.existsSync(tmpDbPath) && fs.existsSync(rootDbPath)) {
      fs.copyFileSync(rootDbPath, tmpDbPath);
    }
    if (fs.existsSync(tmpDbPath)) {
      try {
        fs.chmodSync(tmpDbPath, 0o666);
      } catch {}
      return `file:${tmpDbPath}`;
    }
  } catch (e) {
    console.warn("Could not copy database to temp directory, falling back to root dev.db", e);
  }

  return `file:${rootDbPath}`;
};

const databaseUrl = getDatabaseUrl();

const adapter = new PrismaBetterSqlite3({
  url: databaseUrl,
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
export default prisma;
