export const dynamic = "force-dynamic";


import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { formatJobsWithTimestamps } from "@/lib/utils";
import { NextRequest } from "next/dist/server/web/spec-extension/request";
import { NextResponse } from "next/server";



//accessible by admin users
//get all jobs for admins

export async function GET(req: NextRequest) {
    try {
        const user = await getCurrentUser();
        if (!user || !user.role || user.role !== "admin") {
            return NextResponse.json(
                { success: false, message: "Unauthorized" }, { status: 401 });
        }
        const pageParams = req.nextUrl.searchParams.get("page") || '1';
        const page = parseInt(pageParams, 10);
        const jobs = await db.job.findMany({
            skip: (page - 1) * 10,
            take: 10,
            orderBy: {
                createdAt: "desc",
            },
        });
        const formattedJobs = formatJobsWithTimestamps(jobs)
        const totalJobsCount = await db.job.count();

        return NextResponse.json({
            success: true,
            data: {
                jobs: formattedJobs,
                totalPages: Math.ceil(totalJobsCount / 10)
            }
        }, { status: 200 });
        
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}