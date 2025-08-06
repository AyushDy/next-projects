import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { UserWithIdType } from "@/lib/zod";
import { NextResponse } from "next/server";



//get saved job ids for the current user
export async function GET(){
    try{
        console.log("Fetching saved job ids for the current user");
        const user = await getCurrentUser() as UserWithIdType | null;
        if(!user || !user.id){
            return NextResponse.json({success: false, message: "Unauthorized"}, { status: 401 });
        }
        const foundSavedJobIds = await db.savedJobs.findUnique({
            where: { userId: user.id },
        });
        if(!foundSavedJobIds){
            return NextResponse.json({success: false, message: "No saved job ids found"}, { status: 404 });
        }
        return NextResponse.json({success: true, savedJobIds: foundSavedJobIds.jobIds}, { status: 200 });
    } catch (error) {
        return NextResponse.json({success: false, message: error instanceof Error ? error.message : "Internal Server Error"}, { status: 500 });
    }
}
