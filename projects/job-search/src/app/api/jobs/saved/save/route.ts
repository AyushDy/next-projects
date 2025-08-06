import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { UserType, UserWithIdType } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";

//save job
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser() as UserWithIdType | null;
    if (!user || !user.id) {
      return NextResponse.json({ success: false, message: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { job_id } = body;
    if (!job_id) {
      return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 });
    }
    const job = await db.job.findUnique({
      where: { id: job_id },
    });
    if (!job) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }
    const foundSavedJobs = await db.savedJobs.findUnique({
        where : {userId: user.id}
    });
    if (!foundSavedJobs) {
      await db.savedJobs.create({
        data: {
          userId: user.id,
          jobIds: [job.id],
        },
      });
      return NextResponse.json({ success: true, message: "Job saved successfully" }, { status: 201 });
    }
    const jobsToSave = Array.from(new Set([...foundSavedJobs.jobIds, job.id]));

    const updatedSavedJobs = await db.savedJobs.update({
      where: { userId: user.id },
      data: {
        jobIds: jobsToSave,
      },
    });

    return NextResponse.json(
      { success: true, message: "Job saved successfully", data: updatedSavedJobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving job:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
