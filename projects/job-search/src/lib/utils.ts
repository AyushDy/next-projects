import axios from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { JobWithTime } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatJobsWithTimestamps(jobs: any[]): JobWithTime[] {
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
      ...job,
      postedAt: timeAgo(new Date(job.createdAt)),
    })
  );
  return mapped;
}

export async function searchJobs(
  query: string,
  employmentType: string = "",
  jobType: string = "",
  page: number = 1,
  pageSize: number = 10,
  minPrice?: number,
  maxPrice?: number
) {
  try {
    if (!query && !query.trim()) return { success: false, message: "Bad request" };

    const url = `http://localhost:3000/api/jobs/search?page=${page}&pageSize=${pageSize}`;

    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (query) {
      params.append("q", query);
    }

    if (minPrice) {
      params.append("minPrice", minPrice.toString());
    }

    if (maxPrice) {
      params.append("maxPrice", maxPrice.toString());
    }

    if (employmentType) {
      params.append("employmentType", employmentType);
    }

    if (jobType) {
      params.append("jobType", jobType);
    }

    const response = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs/search?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error searching jobs:", error);
    throw error;
  }
}

export async function getJobById(jobId: string) {
  try {
    if (!jobId.trim()) return { success: false, message: "Bad Request" };
    const result = await axios.get(`${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs/${jobId}`
    );
    return { success: true, data: result.data };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Error occured while fetching job with job-id",
    };
  }
}

export async function getJobSuggestions(query: string) {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/jobs/search/suggestions`
    );
    url.searchParams.append("q", query);
    const response = await axios.get(url.toString());
    return response.data;
  } catch (error) {
    console.error("Error fetching job suggestions:", error);
    throw error;
  }
}

export function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

export const debouncedSearch = debounce(searchJobs, 300);
