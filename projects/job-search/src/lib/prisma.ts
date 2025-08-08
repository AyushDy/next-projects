import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

if (process.env.NODE_ENV === "production") {
  db = new PrismaClient();
} else {
  // In dev, prevent multiple instances due to hot-reloading
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  db = (global as any).prisma;
}

export default db;
