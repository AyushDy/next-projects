export const dynamic = "force-dynamic";

import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { UserWithIdType } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";

//save job
export async function POST(req: NextRequest) {
  try {
    const user = (await getCurrentUser()) as UserWithIdType | null;
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { jobId } = body;
    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Job is required" },
        { status: 400 }
      );
    }
    const foundJob = await db.job.findUnique({
      where: { id: jobId },
    });
    if (!foundJob) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }
    const savedJob = await db.savedJob.create({
      data : {
        userId : user.id,
        jobId : jobId
      }
    })
      return NextResponse.json(
        { success: true, message: "Job saved successfully" },
        { status: 201 }
      );
    }
   catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500 }
    );
  }
}
