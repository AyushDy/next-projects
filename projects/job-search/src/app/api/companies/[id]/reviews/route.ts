export const dynamic = "force-dynamic";


import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reviews = await db.review.findMany({
      where: {
        companyId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const reviewsWithUser = await Promise.all(
      reviews.map(async (review: any) => {
        const user = await db.user.findUnique({
          where: { id: review.userId },
          select: { username: true, logo: true },
        });
        return {
          ...review,
          user,
        };
      })
    );

    return NextResponse.json(
      { success: true, reviews: reviewsWithUser },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { content, rating } = body;
    if (!content || !rating) {
      return NextResponse.json(
        { success: false, message: "Content and rating are required" },
        { status: 400 }
      );
    }
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const response = await db.review.create({
      data: {
        content,
        rating,
        companyId: id,
        userId: user.id as string,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Review created successfully",
        review: response,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: companyId } = await params;
    const url = new URL(req.url);
    const reviewId = url.searchParams.get("reviewId");

    if (!reviewId) {
      return NextResponse.json(
        { success: false, message: "Review ID is required" },
        { status: 400 }
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const existingReview = await db.review.findFirst({
      where: {
        id: reviewId,
        companyId,
        userId: user.id as string,
      },
    });

    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: "Review not found or unauthorized" },
        { status: 404 }
      );
    }

    await db.review.delete({
      where: {
        id: reviewId,
      },
    });

    return NextResponse.json(
      { success: true, message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
