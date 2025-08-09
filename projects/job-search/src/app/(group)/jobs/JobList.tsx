import SearchJobsList from "@/components/UI/lists/SearchJobsList";
import { searchJobs } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function JobList({
  q,
  page,
  employmentType,
  jobType,
  pageSize,
  minSalary,
  maxSalary,
}: {
  q: string;
  page: number;
  employmentType: string;
  jobType: string;
  pageSize: number;
  minSalary?: number;
  maxSalary?: number;
}) {
  const result = await searchJobs(
    q,
    employmentType,
    jobType,
    page,
    pageSize,
    minSalary,
    maxSalary
  );
  if (!result.success) {
    notFound();
  }
  const jobs = result.data;
  const totalPages = result.totalPages;

  return (
    <>
      <div className="w-full">
        <SearchJobsList
          currentPage={page}
          jobs={jobs}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
