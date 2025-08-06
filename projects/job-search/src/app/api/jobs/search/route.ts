import db from "@/lib/prisma";
import { JobWithTime } from "@/lib/types";
import { formatJobsWithTimestamps } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

//search for jobs for all users
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q");
    const employmentType = req.nextUrl.searchParams.get("employmentType");
    let jobType = req.nextUrl.searchParams.get("jobType");
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(
      req.nextUrl.searchParams.get("pageSize") || "10",
      10
    );
    const minPrice = parseInt(
      req.nextUrl.searchParams.get("minPrice") || "0",
      10
    );
    const maxPrice = parseInt(
      req.nextUrl.searchParams.get("maxPrice") || "1000000",
      10
    );

    console.log("Employment type:", employmentType, "Job type:", jobType);

    if (jobType === "hybrid") {
      jobType = "";
    }

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          message: "Query parameter 'q' is required",
        },
        { status: 400 }
      );
    }

    if (query.trim().length <= 3) {
      const whereFilter: Prisma.JobWhereInput = {
        AND: [
          {
            OR: [
              { job_title: { contains: query, mode: "insensitive" } },
              { job_description: { contains: query, mode: "insensitive" } },
              { employer_name: { contains: query, mode: "insensitive" } },
            ],
          },
          employmentType
            ? {
                job_employment_type: {
                  contains: employmentType,
                  mode: "insensitive",
                },
              }
            : {},
          jobType ? { job_is_remote: jobType === "remote" } : {},
          {
            OR: [
              {
                AND: [
                  { job_min_salary: { lte: maxPrice } }, 
                  { job_max_salary: { gte: minPrice } }, 
                ],
              },
              {
                AND: [
                  { job_salary: { not: null } },
                  { job_salary: { gte: minPrice, lte: maxPrice } },
                ],
              },
            ],
          },
        ],
      };

      const [jobs, totalCount] = await Promise.all([
        db.job.findMany({
          where: whereFilter,
          orderBy: { createdAt: "desc" },
          skip: (page - 1) * pageSize,
          take: pageSize,
        }),
        db.job.count({
          where: whereFilter,
        }),
      ]);

      const totalPages = Math.ceil(totalCount / pageSize);
      const formattedJobs = formatJobsWithTimestamps(jobs);

      return NextResponse.json(
        { success: true, data: formattedJobs, totalPages },
        { status: 200 }
      );
    }

    const facetPipeline: any[] = [
      {
        $search: {
          index: "jobs-fuzzy-search",
          text: {
            query,
            path: ["job_title", "job_description"],
            fuzzy: { maxEdits: 2, prefixLength: 3 },
          },
        },
      },
      {
        $match: {
          ...(employmentType && {
            job_employment_type: { $regex: new RegExp(employmentType, "i") },
          }),
          ...(jobType && { job_is_remote: jobType === "remote" }),
          $or: [
            {
              $and: [
                { job_min_salary: { $lte: maxPrice } }, 
                { job_max_salary: { $gte: minPrice } }, 
              ],
            },
          
            {
              job_salary: { $gte: minPrice, $lte: maxPrice },
            },
          ],
        },
      },
      {
        $facet: {
          data: [
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * pageSize },
            { $limit: pageSize },
            {
              $project: {
                id: "$_id",
                _id: 0,
                job_title: 1,
                employer_name: 1,
                employer_logo: 1,
                job_publisher: 1,
                job_description: 1,
                job_employment_type: 1,
                job_is_remote: 1,
                job_city: 1,
                job_location: 1,
                job_benefits: 1,
                job_salary: 1,
                job_min_salary: 1,
                job_max_salary: 1,
                job_salary_period: 1,
                job_qualifications: 1,
                job_responsibilities: 1,
                createdAt: 1,
                updatedAt: 1,
              },
            },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ];

    const response = (await db.$runCommandRaw({
      aggregate: "Job",
      pipeline: facetPipeline,
      cursor: {},
    })) as any;

    const [{ data, totalCount }] = response?.cursor?.firstBatch || [];
    const jobs = formatJobsWithTimestampsLocal(data || []);
    const count = totalCount?.[0]?.count || 0;
    const totalPages = Math.ceil(count / pageSize);

    return NextResponse.json({
      success: true,
      data: jobs,
      totalCount: count,
      totalPages: totalPages,
    });
  } catch (error: any) {
    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error searching jobs",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
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

  const mapped = jobs.map(
    (job): JobWithTime => ({
      id: job.id["$oid"],
      job_id: job.id["$oid"],
      job_title: job.job_title,
      employer_name: job.employer_name,
      employer_logo: job.employer_logo,
      job_description: job.job_description,
      job_employment_type: job.job_employment_type,
      job_is_remote: job.job_is_remote,
      job_city: job.job_city,
      job_location: job.job_location,
      job_benefits: job.job_benefits,
      job_salary: job.job_salary,
      job_min_salary: job.job_min_salary,
      job_max_salary: job.job_max_salary,
      job_salary_period: job.job_salary_period,
      job_qualifications: job.job_qualifications,
      job_responsibilities: job.job_responsibilities,
      job_posted_at: timeAgo(new Date(job.createdAt)),
      company_id: job.company_id,
    })
  );
  return mapped;
}
