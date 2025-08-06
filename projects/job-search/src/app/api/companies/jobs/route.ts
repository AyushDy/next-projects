import { getCurrentUser, verifyJWT } from "@/lib/jwt";
import db from "@/lib/prisma";
import { JobData } from "@/lib/types";
import { formatJobsWithTimestamps } from "@/lib/utils";
import { jobSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";



//find jobs for that company
export async function GET(req:NextRequest) {
    try{
        const token = req.cookies.get("token")?.value;
        if(!token){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const decoded = await verifyJWT(token) as { id: string, username: string, role: string } | null;
        if (!decoded) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const company = await db.company.findUnique({
            where: { ownerId: decoded.id },
        });
        if (!company) {
            return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
        }
        const jobs = await db.job.findMany({
            where: {
                company_id: company?.id || "",
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        const formattedJobs = formatJobsWithTimestamps(jobs);
        return NextResponse.json({ success: true, jobs: formattedJobs }, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}



//upload jobs for companies
export async function POST(req: NextRequest) {
  try {
    const decoded = await getCurrentUser() as {
      id: string;
      username: string;
      role: string;
    } | null;
    if (!decoded) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = (await req.json()) as JobData;
    const company = await db.company.findUnique({
      where: { ownerId: decoded.id },
    });

    if (!company || !company.id) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    const { company_id, ...jobData } = body;

    const job = {
      ...jobData,
      employer_name: decoded.username,
      employer_logo: company.logo || "",
      company_id: company.id,
    };
    const parsed = jobSchema.safeParse(job);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: parsed.error.message },
        { status: 400 }
      );
    }
    const uploaded = await db.job.create({
      data: {
        ...parsed.data,
      },
    });
    return NextResponse.json({
      success: true,
      message: "job uploaded sucessfully",
      job: uploaded,
    });
  } catch (error) {
    return NextResponse.json({
      success:false,
      message : error instanceof Error ? error.message : "Failed to upload job"
    },{status : 500})
  }
}