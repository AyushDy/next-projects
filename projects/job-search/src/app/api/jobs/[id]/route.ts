import db from "@/lib/prisma";
import { formatJobsWithTimestamps } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";



// get job by Id

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Job ID is required" },
        { status: 400 }
      );
    }
    const job = await db.job.findUnique({
      where: { id },
    });
    console.log("Fetched job:", job);
    if (!job) {
      return NextResponse.json(
        { success: false, message: "Job not found" },
        { status: 404 }
      );
    }
    const formattedJob = formatJobsWithTimestamps([job])[0];

    return NextResponse.json({ success: true, data: formattedJob }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Failed to fetch job",
      },
      { status: 500 }
    );
  }
}
