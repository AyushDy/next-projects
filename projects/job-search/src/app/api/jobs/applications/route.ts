import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";


//get all applied jobs for the current user
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "unauthorized",
        },
        { status: 401 }
      );
    }

    const appliedJobs = await db.application.findMany({
      where: { userId: user.id as string },
      include: {
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                logo: true,
              },
            },
          },
        },
      },
    });

    if (!appliedJobs) {
      return NextResponse.json(
        {
          success: false,
          message: "No applied jobs found",
          data: null,
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        data: appliedJobs,
      },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching applied jobs",
        data: null,
      },
      { status: 500 }
    );
  }
}

// apply for a job, all users
export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "unauthorized",
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { jobId, content } = body;


    if (!jobId || !content) {
      return NextResponse.json(
        {
          success: false,
          message: "Job ID and content are required",
        },
        { status: 400 }
      );
    }

    const appliedJob = await db.application.create({
      data: {
        jobId,
        userId: user.id as string,
        content,
        status: "pending",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Job application submitted successfully",
        data: appliedJob,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error applying for job:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          JSON.stringify(error) ,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest){
  try{
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const body = await req.json();
    const jobId = body?.jobId;

    if (!jobId) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }

    const application = await db.application.findFirst({
      where: {
        jobId : jobId,
        userId: user.id as string,
      },
    });

    if (!application) {
      return NextResponse.json(
        { success: false, message: "Application not found" },
        { status: 404 }
      );
    }
    await db.application.delete({
      where: {
        id: application.id,
      },
    });
    return NextResponse.json(
      { success: true, message: "Application withdrawn successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error withdrawing application:", error);
    return NextResponse.json(
      { success: false, message: "Error withdrawing application" },
      { status: 500 }
    );
  }
}