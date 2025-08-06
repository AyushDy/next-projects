import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



//search for company by company_id
export async function GET(req: NextRequest, { params }: { params:Promise<{ id: string }>}){
    try{
        const {id} = await params;
        if (!id) {
            return NextResponse.json({
                success: false,
                message: "Company ID is required"
            }, { status: 400 });
        }
        const company = await db.company.findFirst({
            where: {
                id: id,
            }
        });

        if(!company){
            return NextResponse.json({
                success: false,
                message: "Company not found or unauthorized access"
            }, { status: 404 });
        }
        
        return NextResponse.json({
            success: true,
            data: company
        }, { status: 200 });
    }catch(error){
        return NextResponse.json({
            success: false,
            message: "Error fetching company"
        }, { status: 500 });
    }
}