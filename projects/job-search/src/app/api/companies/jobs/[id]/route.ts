import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { jobSchema } from "@/lib/zod";
import { NextRequest, NextResponse } from "next/server";



//update job for companies
export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
){
    try{
        const user = await getCurrentUser();
        if(!user ){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const {id} = await params;
        if(!id){
            return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 });
        }
        const body = await req.json();
        const parsed = jobSchema.partial().safeParse(body);
        if(!parsed.success){
            return NextResponse.json({ success: false, message: parsed.error.message }, { status: 400 });
        }
        const company = await db.company.findUnique({
            where: { ownerId: user.id as string}
        });
        if(!company){
            return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
        }

        if(company.ownerId !== user.id){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const updatedJob = await db.job.update({
            where: { id },
            data: parsed.data,
        });
        return NextResponse.json({ success: true, message: "Job updated successfully", job: updatedJob }, { status: 200 });
    }catch(error){
        return NextResponse.json(
            { success: false, message: error instanceof Error ? error.message : "Failed to update job" },
            { status: 500 }
        );
    }
}


// delete job for companies

export async function DELETE(req: NextRequest, {params}: {params: Promise<{id : string}>}){
    try{
        const {id}= await params;
        if(!id){
            return NextResponse.json({ success: false, message: "Job ID is required" }, { status: 400 });
        }
        const user = await getCurrentUser();
        if(user?.role === "admin"){
            const deletedJob = await db.job.delete({
                where: { id }
            });
            return NextResponse.json({ success: true, message: "Job deleted successfully", job: deletedJob }, { status: 200 });
        }
        
        const job = await db.job.findUnique({
            where : {
                id,
                company: {
                    ownerId: user?.id as string
                }
            }
        })
        if(!job){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }
        const company = await db.company.findUnique({
            where: { ownerId: job.company_id as string}
        });

        if(!company){
            return NextResponse.json({ success: false, message: "Company not found" }, { status: 404 });
        }

        if(company.ownerId !== user?.id){
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const deletedJob = await db.job.delete({
            where: { id }
        });
        return NextResponse.json({ success: true, message: "Job deleted successfully", job: deletedJob }, { status: 200 });
    }catch{
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}