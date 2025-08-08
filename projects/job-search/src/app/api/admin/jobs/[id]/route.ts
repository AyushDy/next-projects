//to implement, get, update and delete jobs by admin users

import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";



//delete job for admins

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Job ID is required" },
        { status: 400 }
      );
    }
    const user = await getCurrentUser();
    if (!user || !user.role || user.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const deletedJob = await db.job.delete({
      where: { id },
    });
    return NextResponse.json(
      { message: "Job deleted successfully", job: deletedJob },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
