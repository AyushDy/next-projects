"use server";
import db from "@/services/Prisma";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { signJWT, verifyJWT } from "@/lib/auth";

export async function createUser({ username, email, password, role }:{username:string, email:string, password:string,role: "admin"|"user"}) {
  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) return `User Already exists.`;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role,
      },
    });
    const token = await signJWT({ username, email, role, id:user.id });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
    return { username, email, role };
  } catch (err) {
    return (err instanceof Error ? err.message : "An error occurred");
  }
}

export async function LoginUser({ email, password }: { email: string; password: string }) {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) throw new Error("incorrect email");

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("invalid credentials");
    }
    const { username, role } = user;
    const token = await signJWT({id:user.id, username, email, role });

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
    return { username, email, role };
  } catch (err: any) {
    return err.message;
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.set("token", "", {
    httpOnly: true,
    secure: true,
    maxAge: 0,
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value as string;
  const decoded = verifyJWT(token);
  if (!decoded) return null;
  return decoded;
}

export async function updateUserProfile(updateData: {
  username?: string;
  email?: string;
}) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return "Unauthorized - Please login again";
    }

    if (!updateData.username && !updateData.email) {
      return "No data provided to update";
    }

    if (updateData.username) {
      if (updateData.username.trim().length < 3) {
        return "Username must be at least 3 characters long";
      }

      const existingUser = await db.user.findFirst({
        where: {
          username: updateData.username.trim(),
          email: { not: currentUser.email as string}, 
        },
      });

      if (existingUser) {
        return "Username already taken";
      }
    }

    if (updateData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(updateData.email)) {
        return "Invalid email format";
      }

      const existingUser = await db.user.findFirst({
        where: {
          AND: [
            { email: updateData.email },
            { email: { not: currentUser.email as string } }
          ]
        },
      });

      if (existingUser) {
        return "Email already registered";
      }
    }
    const updatedUser = await db.user.update({
      where: { email: currentUser.email as string},
      data: {
        ...(updateData.username && { username: updateData.username.trim() }),
        ...(updateData.email && { email: updateData.email }),
      },
      select: {
        username: true,
        email: true,
        role: true,
      },
    });

    if (updateData.email) {
      const newToken = await signJWT({
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      const cookieStore = await cookies();
      cookieStore.set("token", newToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      });
    } else if (updateData.username) {
      const newToken = await signJWT({
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      const cookieStore = await cookies();
      cookieStore.set("token", newToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      });
    }

    return updatedUser;
  } catch (error: any) {
    console.error("Update profile error:", error);
    return "Failed to update profile. Please try again.";
  }
}
