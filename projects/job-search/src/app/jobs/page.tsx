export const dynamic = "force-dynamic";

import JobCard from "@/components/cards/JobCard";
import SearchFilters from "@/components/forms/SearchFilters";
import SearchJobsList from "@/components/SearchJobsList";
import { Job } from "@/data/data";
import { searchJobs } from "@/lib/utils";
import { notFound } from "next/navigation";
import { useMemo } from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    page: number;
    jobType: string;
    employmentType: string;
  }>;
}) {
  const { q } = await searchParams;
  const { jobType } = await searchParams;
  const { employmentType } = await searchParams;
  const { page = 1 } = await searchParams;
  if (!q) {
    notFound();
  }

  const result = await searchJobs(q, page);
  if (!result.success) {
    notFound();
  }
  const jobs = result.result.data;



  return (
    <div className="flex pt-32 bg-primary justify-start p-8 gap-8 w-full min-h-screen">
      <div className="sticky top-20 self-start min-w-40 flex-shrink-0">
        <SearchFilters />
      </div>
      <SearchJobsList employmentType={employmentType} jobType={jobType} jobs={jobs} />
    </div>
  );
}
