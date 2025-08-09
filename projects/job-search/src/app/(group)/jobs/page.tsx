export const dynamic = "force-dynamic";

import SearchFilters from "@/components/forms/SearchFilters";
import { Suspense } from "react";
import JobList from "./JobList";
import Loading from "./loading";
import MobileFiltersWrapper from "@/components/forms/MobileFiltersWrapper";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    q: string;
    page: string;
    jobType: string;
    pageSize: string;
    employmentType: string;
    minSalary?: string;
    maxSalary?: string;
  }>;
}) {
  const {
    q = "",
    page = "1",
    jobType = "",
    pageSize = "10",
    employmentType = "",
    minSalary,
    maxSalary,
  } = await searchParams;

  return (
    <div className="pt-10 md:pt-32 bg-background w-full min-h-screen">
      <div className="flex flex-col lg:flex-row justify-start p-4 lg:p-8 gap-4 lg:gap-8 w-full">
        <div className="hidden lg:block lg:sticky lg:top-10 lg:self-start min-w-40 flex-shrink-0">
          <SearchFilters />
        </div>

        <MobileFiltersWrapper>
          <SearchFilters />
        </MobileFiltersWrapper>

        <Suspense fallback={<Loading />}>
          <JobList
            q={q}
            page={parseInt(page)}
            jobType={jobType}
            pageSize={parseInt(pageSize)}
            employmentType={employmentType}
            minSalary={minSalary ? parseInt(minSalary) : undefined}
            maxSalary={maxSalary ? parseInt(maxSalary) : undefined}
          />
        </Suspense>
      </div>
    </div>
  );
}
