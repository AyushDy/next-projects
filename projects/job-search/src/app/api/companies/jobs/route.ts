import { getCurrentUser, verifyJWT } from "@/lib/jwt";
import db from "@/lib/prisma";
import { JobData } from "@/lib/types";
import { formatJobsWithTimestamps } from "@/lib/utils";
import { jobSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";






//find jobs for that company
export async function GET(req: NextRequest) {
  try {
    const decoded = await getCurrentUser();
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const company = await db.company.findUnique({
      where: { ownerId: decoded.id as string },
      select: {
        id: true,
        name: true,
        logo: true,
      },
    });
    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }
    const jobs = await db.job.findMany({
      where: {
        companyId: company?.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: { applications: true, savedBy: true },
        },
        applications : {
          select: {
            id : true,
            createdAt : true
          }
        }
      },
    });
    const formattedJobs = formatJobsWithTimestamps(jobs.map(job=>({
      ...job,
      applicationCount : job._count.applications,
      saveCount : job._count.savedBy,
      applications : job.applications
    })));

    return NextResponse.json(
      { success: true, jobs: formattedJobs },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}




//upload jobs for companies
export async function POST(req: NextRequest) {
  try {
    const decoded = await getCurrentUser();
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const isAdmin = decoded.role === "admin";

    const body = await req.json();

    const userWithCompany = await db.user.findUnique({
      where: { id: decoded.id as string },
      include: {
        ownedCompany: true,
      },
    });


    if (!userWithCompany || !userWithCompany.ownedCompany) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }
    const fullData = {
      ...body,
      companyId: userWithCompany?.ownedCompany?.id,
      employerLogo: userWithCompany?.ownedCompany?.logo,  
      employerName: userWithCompany?.ownedCompany?.name,   
    }

    const validated = jobSchema.safeParse(fullData);
    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: validated.error.message,
        },
        { status: 400 }
      );
    }

    if (!userWithCompany || !userWithCompany.ownedCompany) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    const uploaded = await db.job.create({
      data: {
        ...validated.data,
      },
    });
    return NextResponse.json({
      success: true,
      message: "job uploaded sucessfully",
      job: uploaded,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to upload job",
      },
      { status: 500 }
    );
  }
}
