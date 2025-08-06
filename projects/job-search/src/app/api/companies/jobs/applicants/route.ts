import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const jobId = body?.jobId;

    if (!jobId) {
      return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 });
    }

    const [job, company] = await Promise.all([
      db.job.findUnique({ where: { id: jobId } }),
      db.company.findUnique({ where: { ownerId: user.id as string } }),
    ]);

    if (!job) {
      return NextResponse.json({ success: false, message: "Job not found" }, { status: 404 });
    }

    if (!company) {
      return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
    }

    if (job.company_id !== company.id) {
      return NextResponse.json({ success: false, message: "You are not authorized to view this job" }, { status: 403 });
    }

    const appliedRecords = await db.appliedJobs.findMany({
      where: {
        jobIds: {
          has: jobId, 
        },
      },
    });

    const applicantUserIds = appliedRecords.map((record) => record.userId);

    if (applicantUserIds.length === 0) {
      return NextResponse.json({
        success: true,
        message: "No applicants found for this job",
        applicants: [],
      });
    }

    const applicants = await db.user.findMany({
      where: {
        id: {
          in: applicantUserIds,
        },
      },
      select: {
        id: true,
        username: true,
        email: true,
        logo: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      applicants,
    });
  } catch (error: any) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
