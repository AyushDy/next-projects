import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { signJWT } from "@/lib/jwt";
import { cookies } from "next/headers";




//login route for all users
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    const user = await db.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = await signJWT(userWithoutPassword);

    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24,
    });
    return NextResponse.json(
      { success: true, message: "Login successful", user: userWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "An error occurred",
      },
      { status: 500 }
    );
  }
}
