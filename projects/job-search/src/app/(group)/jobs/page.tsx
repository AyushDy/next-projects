export const dynamic = "force-dynamic";

import SearchFilters from "@/components/forms/SearchFilters";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import JobList from "./JobList";
import Loading from "./loading";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    page: string;
    jobType: string;
    pageSize: string;
    employmentType: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}) {
  const {
    q = "",
    page = "1",
    jobType = "",
    pageSize = "10",
    employmentType = "",
    minPrice,
    maxPrice,
  } = await searchParams;

  return (
    <div className="pt-32 bg-background w-full min-h-screen">
      <div className="flex flex-col lg:flex-row justify-start p-4 lg:p-8 gap-4 lg:gap-8 w-full">
        <div className="lg:sticky lg:top-10 lg:self-start min-w-40 flex-shrink-0">
          <SearchFilters />
        </div>
        <Suspense fallback={<Loading />}>
          <JobList
            q={q}
            page={parseInt(page)}
            jobType={jobType}
            pageSize={parseInt(pageSize)}
            employmentType={employmentType}
            minPrice={minPrice ? parseInt(minPrice) : undefined}
            maxPrice={maxPrice ? parseInt(maxPrice) : undefined}
          />
        </Suspense>
      </div>
    </div>
  );
}
