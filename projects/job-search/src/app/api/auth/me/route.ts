import { getCurrentUser, verifyJWT } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { updateUserSchema } from "@/lib/zod";

//get user and its company
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const company = await db.company.findUnique({
      where: {
        ownerId: user.id as string,
      },
    });

    return NextResponse.json({
      success: true,
      user: user,
      company: company || null,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}

// update user
export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
    const decoded = await verifyJWT(token);
    if (!decoded) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsedData = updateUserSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { success: false, message: "Invalid data" },
        { status: 400 }
      );
    }
    const { username, email, logo } = parsedData.data;

    const updatedUser = await db.user.update({
      where: {
        id: decoded.id as string,
      },
      data: {
        username,
        email,
        logo,
      },
    });
    return NextResponse.json({ success: true, user: updatedUser }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "An error occurred" }, { status: 500 });
  }
}
