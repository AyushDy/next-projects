import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { success } from "zod";



export async function GET(req:NextRequest){
    try{
        const response = await db.company.findMany({});
        return NextResponse.json({success : true, companies: response}, {status: 200});
    }catch(error){
        return NextResponse.json({error: "Failed to fetch companies"}, {status: 500});
    }
}