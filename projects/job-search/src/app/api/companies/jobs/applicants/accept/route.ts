export const dynamic = "force-dynamic";


import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(req:NextRequest,) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const applicationId = body?.applicationId;

    if (!applicationId) {
      return NextResponse.json(
        { success: false, message: "Application ID is required" },
        { status: 400 }
      );
    }

    const application = await db.application.findUnique({
      where: { id: applicationId },
      include: { user: true, job: true },
    });


    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }

    const job  = await db.job.findUnique({
        where: { id: application.jobId },
        include: { company: true },
    });

    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    if(!job.company || job.company.ownerId !== user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await db.application.update({
      where: { id: applicationId },
      data: { status: "accepted" },
    });

    return NextResponse.json(
      { success: true, message: "Application accepted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error accepting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to accept application" },
      { status: 500 }
    );
  }
}