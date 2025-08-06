import SearchFilters from "@/components/forms/SearchFilters";
import SearchJobsList from "@/components/UI/lists/SearchJobsList";
import { searchJobs } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function JobList({
  q,
  page,
  employmentType,
  jobType,
  pageSize,
  minPrice,
  maxPrice
}:{
  q: string;
  page: number;
  employmentType: string;
  jobType: string;
  pageSize: number;
  minPrice?: number;
  maxPrice?: number;
}) {

  console.log("page",page)
  console.log("pageSize",pageSize)
  
  const result = await searchJobs(q, employmentType, jobType, page, pageSize, minPrice, maxPrice);
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
