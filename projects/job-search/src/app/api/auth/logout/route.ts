import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";



// logout for all users
export async function GET(req: NextRequest){
    const cookieStore = await cookies();

    cookieStore.set("token", "");
    return NextResponse.json({ success: true, message: "Logged out successfully" }, { status: 200 });
}