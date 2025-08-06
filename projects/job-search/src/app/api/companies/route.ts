import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//find company of the logged user
export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || !user.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }
    const company = await db.company.findUnique({
      where: { ownerId: user.id as string},
    });
    if (!company) {
      return NextResponse.json(
        { success: false, message: "Company not found" },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(
      { success: true, company },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error fetching company:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}


export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        {
          status: 401,
        }
      );
    }

    const { name, description, location, logo } = await req.json();
    const company = await db.company.create({
      data: {
        name,
        description,
        location,
        logo,
        ownerId: user.id as string,
      },
    });

    return NextResponse.json(
      { success: true, company },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Error creating company:", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      {
        status: 500,
      }
    );
  }
}

