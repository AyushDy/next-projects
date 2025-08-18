import { verifyToken } from "@/lib/services/jwt";
import prisma from "@/lib/services/prisma";
import { cookies } from "next/headers";

export async function getUserFromCookies() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) return null;
    const data = verifyToken(token) as { id: string };
    if (!data?.id) return null;

    const user = await prisma.user.findUnique({
      where: { id: data.id },
    });
    return user ? user : null;
  } catch (error) {
    return null;
  }
}
