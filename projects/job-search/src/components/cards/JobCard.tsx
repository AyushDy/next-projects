import Image from "next/image";
import { Job } from "@/data/data";
import ViewDetails from "../UI/buttons/ViewDetails";
import SaveButton from "../UI/buttons/SaveButton";
import Link from "next/link";

export default function JobCard({ job }: { job: Job }) {
  // Helper function to format salary
  const getSalaryDisplay = () => {
    if (job.job_salary) return job.job_salary;
    if (job.job_min_salary && job.job_max_salary) {
      const period = job.job_salary_period || "year";
      return `$${job.job_min_salary.toLocaleString()} - $${job.job_max_salary.toLocaleString()} per ${period}`;
    }
    if (job.job_min_salary) {
      const period = job.job_salary_period || "year";
      return `$${job.job_min_salary.toLocaleString()}+ per ${period}`;
    }
    return "Competitive salary";
  };

  return (
    <div className="flex flex-col bg-white/10 border border-white/10 rounded-2xl min-h-52 p-5">
      <div className="flex justify-between items-center mb-3">
        <div className="text-secondary flex-1 mr-4">
          <h1 className="font-sans font-semibold text-2xl mb-1">
            {job.job_title}
          </h1>
          <Link
            href={job.employer_website || `/`}
            className="hover:underline text-lg text-blue-400"
          >
            {job.employer_name}
          </Link>
          <div className="text-sm text-gray-400 mt-2 space-y-1">
            <div> {job.job_location || "Remote"}</div>
            <div> {job.job_employment_type || "Full-time"}</div>
            <div> {getSalaryDisplay()}</div>
            <div> Posted {job.job_posted_at || "Recently"}</div>
            {job.job_is_remote && (
              <div className="text-green-400"> Remote Available</div>
            )}
          </div>
        </div>
        <Image
          className="rounded-2xl flex-shrink-0 aspect-square"
          src={job.employer_logo || "/vercel.svg"}
          alt={job.employer_name}
          width={80}
          height={80}
        />
      </div>

      {job.job_benefits && job.job_benefits.length > 0 && (
        <div className="mb-3">
          <div className="text-sm text-gray-300 mb-1">Benefits:</div>
          <div className="flex flex-wrap gap-1">
            {job.job_benefits.slice(0, 3).map((benefit) => (
              <span
                key={benefit}
                className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded"
              >
                {benefit}
              </span>
            ))}
            {job.job_benefits.length > 3 && (
              <span className="text-xs text-gray-400">
                +{job.job_benefits.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-end mt-auto">
        <div className="text-xs text-gray-500">
          Published by {job.job_publisher || "Job Board"}
        </div>
        <div className="flex max-h-10 items-stretch gap-3">
          <ViewDetails job_id={job.job_id} />
          <SaveButton />
        </div>
      </div>
    </div>
  );
}
