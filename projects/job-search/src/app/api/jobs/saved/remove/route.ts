export const dynamic = "force-dynamic";


import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { UserWithIdType } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

//remove job from saved jobs
export async function DELETE(req: NextRequest) {
  try {
    const user = (await getCurrentUser()) as UserWithIdType;
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await req.json();
    const { id: jobId }: { id: string } = body;
    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Bad Request" },
        { status: 400 }
      );
    }
    await db.savedJob.delete({
      where: {
        userId_jobId : {
          userId: user.id,
          jobId: jobId,
        }
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Job removed from saved jobs successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
