import { getCurrentUser, verifyJWT } from "@/lib/jwt";
import db from "@/lib/prisma";
import { formatJobsWithTimestamps } from "@/lib/utils";
import {  UserWithIdType } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";



//get savedjobs list for user
export async function GET(req: NextRequest) {
  try {
    const user = (await getCurrentUser()) as UserWithIdType | null;
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "unauthorized" },
        { status: 401 }
      );
    }
    const foundSavedJobs = await db.savedJobs.findUnique({
      where: { userId: user.id },
    });
    if (!foundSavedJobs) {
      return NextResponse.json(
        { success: false, message: "No saved Jobs found" },
        { status: 404 }
      );
    }
    const savedJobs = await db.job.findMany({
      where: {
        id: {
          in: foundSavedJobs.jobIds,
        },
      },
    });
    const formattedJobs = formatJobsWithTimestamps(savedJobs);
    return NextResponse.json({ success: true, savedJobs:formattedJobs });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Error fetching saved Jobs",
    });
  }
}



//sync saved job ids for user: database + local storage
export async function PATCH(req : NextRequest){
  try{
    const user = await getCurrentUser() as UserWithIdType | null; ;
    if(!user || !user.id){
      return NextResponse.json({success: false,message: "Unauthorized"}, { status: 401 });
    }
    const body = await req.json();
    const { jobIds } = body;
    if(!Array.isArray(jobIds) || jobIds.length === 0){
      return NextResponse.json({success: false, message: "Invalid jobIds"}, { status: 400 });
    }
    const existingSavedJobs = await db.savedJobs.findUnique({
      where: { userId: user.id },
    });
    if(!existingSavedJobs){
      await db.savedJobs.create({
        data: {
          userId : user.id,
          jobIds : jobIds
        }
      });
      return NextResponse.json({ success: true, message: "Jobs saved successfully" });
    }
    const jobIdsSet = Array.from(new Set([...existingSavedJobs.jobIds, ...jobIds]));
    await db.savedJobs.update({
      where: { userId: user.id },
      data: {
        jobIds: jobIdsSet,
      },
    });
    return NextResponse.json({ success: true, message: "Jobs saved successfully" });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error ? error.message : "Error saving job",
    }, { status: 500 });
  }
}
