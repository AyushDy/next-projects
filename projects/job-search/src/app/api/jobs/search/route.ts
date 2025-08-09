export const dynamic = "force-dynamic";

import db from "@/lib/prisma";
import { JobWithTime } from "@/lib/types";
import { formatJobsWithTimestamps } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") || "";
    const employmentType = req.nextUrl.searchParams.get("employmentType");
    let isRemote = req.nextUrl.searchParams.get("jobType");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(
      req.nextUrl.searchParams.get("pageSize") || "10",
      10
    );
    const minSalary = parseInt(
      req.nextUrl.searchParams.get("minSalary") || "0",
      10
    );
    const maxSalary = parseInt(
      req.nextUrl.searchParams.get("maxSalary") || "1000000",
      10
    );

    const shouldFilterRemote = isRemote && isRemote !== "hybrid";
    const isRemoteValue = isRemote === "remote";

    if (query.trim().length > 3) {
      const pipeline: any[] = [
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
                    fuzzy: { maxEdits: 2 },
                  },
                },
                {
                  autocomplete: {
                    query,
                    path: "description",
                    tokenOrder: "sequential",
                    fuzzy: { maxEdits: 2 },
                  },
                },
                {
                  text: {
                    query,
                    path: "title",
                    fuzzy: { maxEdits: 2 },
                  },
                },
                {
                  text: {
                    query,
                    path: "description",
                    fuzzy: { maxEdits: 2 },
                  },
                },
              ],
              minimumShouldMatch: 1,
            },
          },
        },
        {
          $match: {
            ...(employmentType && { employmentType }),
            ...(shouldFilterRemote && { isRemote: isRemoteValue }),
            minSalary: { $gte: minSalary },
            maxSalary: { $lte: maxSalary },
          },
        },
        {
          $facet: {
            data: [
              { $sort: { createdAt: -1 } },
              { $skip: (page - 1) * pageSize },
              { $limit: pageSize },
              {
                $lookup: {
                  from: "Company",
                  localField: "companyId",
                  foreignField: "_id",
                  as: "company",
                },
              },
              {
                $addFields: {
                  company: { $arrayElemAt: ["$company", 0] },
                },
              },
              {
                $project: {
                  id: "$_id",
                  _id: 0,
                  title: 1,
                  description: 1,
                  employmentType: 1,
                  isRemote: 1,
                  city: 1,
                  location: 1,
                  minSalary: 1,
                  maxSalary: 1,
                  salaryPeriod: 1,
                  benefits: 1,
                  qualifications: 1,
                  responsibilities: 1,
                  createdAt: 1,
                  updatedAt: 1,
                  employerName: "$company.name",
                  employerLogo: "$company.logo",
                },
              },
            ],
            totalCount: [{ $count: "count" }],
          },
        },
      ];

      const response = (await db.$runCommandRaw({
        aggregate: "Job",
        pipeline,
        cursor: {},
      })) as any;

      const [{ data = [], totalCount = [] }] =
        response?.cursor?.firstBatch || [];
      const formatted = formatJobsWithTimestampsLocal(data);

      return NextResponse.json({
        success: true,
        data: formatted,
        totalCount: totalCount?.[0]?.count || 0,
        totalPages: Math.ceil((totalCount?.[0]?.count || 0) / pageSize),
      });
    }

    const where: any = {
      AND: [
        query
          ? {
              OR: [
                { title: { contains: query, mode: "insensitive" } },
                { description: { contains: query, mode: "insensitive" } },
              ],
            }
          : {},
        employmentType
          ? { employmentType: { equals: employmentType, mode: "insensitive" } }
          : {},
        shouldFilterRemote ? { isRemote: isRemoteValue } : {},
        {
          AND: [
            { minSalary: { gte: minSalary } },
            { maxSalary: { lte: maxSalary } },
          ],
        },
      ].filter((condition) => Object.keys(condition).length > 0),
    };

    const [jobs, totalCount] = await Promise.all([
      db.job.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: {
          company: {
            select: {
              name: true,
              logo: true,
            },
          },
          _count: {
            select: {
              applications: true,
              savedBy: true,
            },
          },
        },
      }),
      db.job.count({ where }),
    ]);

    const formattedJobs = formatJobsWithTimestamps(
      jobs.map((job) => ({
        ...job,
        applicationCount: job._count.applications,
        saveCount: job._count.savedBy,
        employerName: job.company?.name,
        employerLogo: job.company?.logo,
      }))
    );

    return NextResponse.json({
      success: true,
      data: formattedJobs,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error searching jobs",
        data: error,
      },
      { status: 500 }
    );
  }
}

function formatJobsWithTimestampsLocal(jobs: any[]): JobWithTime[] {
  function timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: [number, string][] = [
      [60, "second"],
      [60, "minute"],
      [24, "hour"],
      [7, "day"],
      [4.34524, "week"],
      [12, "month"],
      [Number.POSITIVE_INFINITY, "year"],
    ];

    let i = 0;
    let count = seconds;
    while (i < intervals.length - 1 && count >= intervals[i][0]) {
      count = count / intervals[i][0];
      i++;
    }
    count = Math.floor(count);
    const label = intervals[i][1];
    return `${count} ${label}${count !== 1 ? "s" : ""} ago`;
  }

  const mapped = jobs.map((job): JobWithTime => {
    let createdAtDate: Date;
    if (job.createdAt?.$date) {
      createdAtDate = new Date(job.createdAt.$date);
    } else {
      createdAtDate = new Date(job.createdAt);
    }
    return {
      ...job,
      id: job.id?.$oid || job.id,
      postedAt: timeAgo(createdAtDate),
      companyId: job.companyId,
    };
  });
  return mapped;
}
