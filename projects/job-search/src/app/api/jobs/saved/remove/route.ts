import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { UserWithIdType } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";


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
    const { job_id } = body;
    if (!job_id) {
      return NextResponse.json(
        { success: false, message: "Bad Request" },
        { status: 400 }
      );
    }
    const foundSavedJobs = await db.savedJobs.findUnique({
      where: {
        userId: user.id,
        jobIds: {
          has: job_id,
        },
      },
    });
    if (!foundSavedJobs) {
      return NextResponse.json(
        { success: false, message: "Job not found in saved jobs" },
        { status: 404 }
      );
    }
    const updatedSavedJobs = await db.savedJobs.update({
      where: { userId: user.id },
      data: {
        jobIds: {
          set: foundSavedJobs.jobIds.filter((id) => id !== job_id),
        },
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Job removed from saved jobs successfully",
        data: updatedSavedJobs,
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
