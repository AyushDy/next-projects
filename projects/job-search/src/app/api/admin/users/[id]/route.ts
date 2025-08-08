export const dynamic = "force-dynamic";


import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        if(!id){
            return NextResponse.json({
                success: false,
                message: "User ID is required"
            })
        }

        const user = await getCurrentUser();
        if (!user || user.role !== "admin") {
            return NextResponse.json({
                success: false,
                message: "Unauthorized"
            })
        }

        const deletedUser = await db.user.delete({
            where: { id }
        });
        return NextResponse.json({
            success: true,
            message: "User deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : "Failed to delete user"
        },{status: 500})
    }
}