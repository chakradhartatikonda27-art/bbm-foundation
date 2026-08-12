import crypto from "crypto";

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(":");
  if (!salt || !hash) return false;
  const verifyHash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  return hash === verifyHash;
}

// Use a session secret key derived from environment or fallback
const SESSION_SECRET = process.env.SESSION_SECRET || "bbm-foundation-secure-secret-cookie-key-32-chars";

function getSecretBuffer(): Buffer {
  // Pad or truncate to exactly 32 bytes for aes-256-gcm
  return Buffer.concat([Buffer.from(SESSION_SECRET), Buffer.alloc(32)], 32);
}

export function encryptSession(data: any): string {
  const iv = crypto.randomBytes(12);
  const key = getSecretBuffer();
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  const tag = cipher.getAuthTag();
  return `${iv.toString("hex")}:${encrypted}:${tag.toString("hex")}`;
}

export function decryptSession(token: string): any {
  try {
    const [ivHex, encrypted, tagHex] = token.split(":");
    if (!ivHex || !encrypted || !tagHex) return null;
    const iv = Buffer.from(ivHex, "hex");
    const tag = Buffer.from(tagHex, "hex");
    const key = getSecretBuffer();
    const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
    decipher.setAuthTag(tag);
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return JSON.parse(decrypted);
  } catch (e) {
    return null;
  }
}
