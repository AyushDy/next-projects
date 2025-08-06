import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";






export async function GET(req:NextRequest){
    try{
        const user = await  getCurrentUser();
        if(!user){
            return NextResponse.json({
                success:false,
                message: "unauthorized"
            },{status:401})
        }
        const appliedJobs = await db.appliedJobs.findUnique({
            where : {userId : user.id as string}
        })

        if(!appliedJobs){
            return NextResponse.json({
                success:false,
                message:"No applied jobs found",
                data : null
            },{status:404})
        }
        return NextResponse.json({
            success:true,
            data : appliedJobs.jobIds
        },{status:200});
    }catch{
        return NextResponse.json({
            success:false,
            message: "Error while fetching applied jobs",
            data: null
        },{status:500})
    }
}






// apply for a job, all users
export async function POST(req:NextRequest){
    try{
        const user =await  getCurrentUser();
        if(!user){
            return NextResponse.json({
                success: false,
                message: "Unauthorized access"
            }, { status: 401 });
        }
        const body = await req.json();
        const { jobId } = body;
        const job =  await db.job.findUnique({
            where : {id : jobId}
        })
        if(!job){
            return NextResponse.json({
                success: false,
                message: "Job not found"
            }, { status: 404 });
        }

        const existingApplications = await db.appliedJobs.findUnique({
            where : {userId : user.id as string}
        })

        const alreadyApplied = existingApplications?.jobIds.includes(jobId);

        if(alreadyApplied){
            return NextResponse.json({success:false, message:"already applied"},{status:400})
        }

        if(existingApplications){
            await db.appliedJobs.update({
                where : {userId : user.id as string},
                data : {
                    jobIds : {
                        push : jobId
                    }
                }
            })
        }

        if(!existingApplications){
            await db.appliedJobs.create({
                data : {
                    userId : user.id as string,
                    jobIds : [jobId]
                }
            })
        }

        const alreadyInApplicants = job.applicants?.includes(user.id as string);

        if(!alreadyInApplicants){
            await db.job.update({
                where: { id: jobId },
                data: {
                    applicants: {
                        push: user.id as string
                    }
                }
            })
        }

        return NextResponse.json({
            success: true,
            message: "Applied successfully"
        }, { status: 200 });
    }catch (error) {
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "Internal server error"
        }, { status: 500 });
    }
}