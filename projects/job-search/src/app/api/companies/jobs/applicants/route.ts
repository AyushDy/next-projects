import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get all applicants for a specific job
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const jobId = body?.jobId;

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }


    const job = await db.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }

    if (!job.company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }
    const applications = await db.application.findMany({
      where: {
        jobId: job.id,
      },
      include: {
        user: true,
      },
    });


    return NextResponse.json({
      success: true,
      applications,
    });
  } catch (error: any) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
