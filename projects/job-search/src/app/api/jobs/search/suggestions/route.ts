export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const raw = searchParams.get("q");

    if (!raw) {
      return NextResponse.json(
        { success: false, message: "Query parameter 'q' is required" },
        { status: 400 }
      );
    }

    const query = raw.trim();
    if (query.length === 0) {
      return NextResponse.json(
        { success: false, message: "Query cannot be empty or whitespace" },
        { status: 400 }
      );
    }

    const pipeline = [
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                autocomplete: {
                  query,
                  path: "title",
                  tokenOrder: "sequential",
                  fuzzy: { maxEdits: 1 },
                },
              },
              {
                autocomplete: {
                  query,
                  path: "description",
                  tokenOrder: "sequential",
                  fuzzy: { maxEdits: 1 },
                },
              },
            ],
            minimumShouldMatch: 1,
          },
        },
      },
      { $sort: { createdAt: -1 } },
      { $limit: 5 },

      {
        $project: {
          id: { $toString: "$_id" },
          _id: 0,
          title: 1,
          companyId: {
            $cond: [
              { $ifNull: ["$companyId", false] },
              { $toString: "$companyId" },
              null,
            ],
          },
          createdAt: 1,
        },
      },
    ];

    const response = (await db.$runCommandRaw({
      aggregate: "Job",
      pipeline,
      cursor: {},
    })) as any;

    const docs = response?.cursor?.firstBatch || [];

    return NextResponse.json(
      { success: true, data: docs },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Suggestion raw query error:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error ? error.message : "An error occurred while fetching suggestions",
      },
      { status: 500 }
    );
  }
}
