import { JobWithTime } from "@/lib/types";
import JobCard from "../../cards/JobCard";
import PaginationButtons from "../reusable/PaginationButtons";

export default function SearchJobsList({
  jobs,
  totalPages,
  currentPage = 1
}: {
  jobs: JobWithTime[];
  totalPages: number;
  currentPage?: number;
}) {


  if(!Array.isArray(jobs)|| jobs.length<1){
    return (
      <div className="flex flex-col rounded w-full space-y-8 p-8">
        No Jobs Found...
      </div>
    )
  }

  return (
    <div className="flex flex-col rounded w-full space-y-8 p-8">
      {jobs?.map((job: JobWithTime) => {
        return <JobCard key={job.job_id} job={job} />;
      })}
      <PaginationButtons totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
