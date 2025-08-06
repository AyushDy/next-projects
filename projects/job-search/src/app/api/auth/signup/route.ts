import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { username, email, password, role } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await db.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "Account with this email already exists" },
        { status: 400 }
      );
    }
    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role,
      },
    });
    const { password: _, ...userWithoutPassword } = user;
    const token = await signJWT(userWithoutPassword);
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
    return NextResponse.json(
      { success: true, message: "Signup successful", user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
