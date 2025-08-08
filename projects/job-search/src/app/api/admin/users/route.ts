export const dynamic = "force-dynamic";


import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

//fetch all users with pagination, search, and filtering
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";

    const skip = (page - 1) * limit;

    // Build where clause for filtering
    const whereClause: any = {};

    if (search) {
      whereClause.OR = [
        { username: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role && role !== "all") {
      whereClause.role = role;
    }

    // Get total count for pagination
    const totalUsers = await db.user.count({
      where: whereClause,
    });

    // Fetch users with pagination and additional data
    const users = await db.user.findMany({
      where: whereClause,
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        logo: true,
        createdAt: true,
        updatedAt: true,
        _count: {
          select: {
            applications: true,
            Review: true,
            savedJobs: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    // Transform data to include additional info
    const usersWithStats = users.map((user) => ({
      ...user,
      name: user.username, // Map username to name for consistency
      applicationsCount: user._count.applications,
      reviewsCount: user._count.Review,
      savedJobsCount: user._count.savedJobs,
      joinedAt: user.createdAt.toISOString().split("T")[0],
    }));

    return NextResponse.json(
      {
        success: true,
        data: {
          users: usersWithStats,
          pagination: {
            page,
            limit,
            total: totalUsers,
            totalPages: Math.ceil(totalUsers / limit),
            hasNext: page < Math.ceil(totalUsers / limit),
            hasPrev: page > 1,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}

