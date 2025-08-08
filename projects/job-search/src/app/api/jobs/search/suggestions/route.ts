import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { id } from "zod/locales";

//search suggestions
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const query = searchParams.get("q");
    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query parameter 'q' is required",
        },
        { status: 400 }
      );
    }
    const response = await db.job.findMany({
      take: 5,
      where: {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "An error occurred while fetching job suggestions",
      },
      { status: 500 }
    );
  }
}
