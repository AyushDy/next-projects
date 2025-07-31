

import { Job } from "@/data/data";
import JobCard from "./cards/JobCard";
import { useMemo } from "react";

export default function SearchJobsList({
  jobs,
  employmentType,
  jobType,
}: {
  jobs: Job[];
  employmentType: string;
  jobType: string;
}) {
  const filteredJobs = useMemo(() => {
    return jobs.filter((job: Job) => {
      const employmentMatch = employmentType
        ? job.job_employment_type === employmentType
        : true;
      const jobTypeMatch = jobType
        ? jobType === "hybrid"
          ? job.job_is_remote && Boolean(job.job_city)
          : jobType === "remote"
          ? job.job_is_remote
          : !job.job_is_remote
        : true;

      return employmentMatch && jobTypeMatch;
    });
  }, [jobType, employmentType, jobs]);

  return (
    <div className="flex flex-col border-2 border-white/10 rounded w-full space-y-8 p-8">
      {filteredJobs?.map((job: Job) => {
        return <JobCard key={job.job_id} job={job} />;
      })}
    </div>
  );
}
