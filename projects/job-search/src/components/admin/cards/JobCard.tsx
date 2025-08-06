import { JobData, JobWithTime } from "@/lib/types";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import Link from "next/link";
import Button from "@/components/UI/Button";
import ShowApplicantsButton from "@/components/company/buttons/ShowApplicants";

export default function JobCard({ job, handleDelete }: { job: JobWithTime, handleDelete: (jobId:string)=> Promise<void> }) {

  return (
    <div className="background dark:bg-white/10  border mb-5 border-border rounded-lg p-4 hover:bg-card/70 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-foreground truncate">
            {job.job_title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.employer_name}</p>
        </div>


        <div className="flex flex-col space-y-3">
          <div className="flex gap-2 ml-4">
          <Link href={`/company/${job.company_id}/${job.job_id}`}>
            <Button variant="primary" size="sm" className="bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/70 shadow-lg">
              Details
            </Button>
          </Link>
          <Link href={`/company/${job.company_id}/${job.job_id}/edit`}>
            <EditButton jobId={job.job_id} />
          </Link>
          <DeleteButton jobId={job.job_id} handleDelete={handleDelete} />
        </div>
          <ShowApplicantsButton job_id={job.job_id} job_title={job.job_title} />
        </div>
        
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div>
          <span className="text-muted-foreground">Location:</span>
          <p className="text-foreground font-medium">{job.job_city}</p>
        </div>

        <div>
          <span className="text-muted-foreground">Type:</span>
          <p className="text-foreground font-medium">
            {job.job_employment_type}
          </p>
        </div>

        <div>
          <span className="text-muted-foreground">Salary:</span>
          <p className="text-foreground font-medium">
            {job.job_salary
              ? `$${job.job_salary.toLocaleString()}`
              : `$${job.job_min_salary?.toLocaleString() || "N/A"} - $${
                  job.job_max_salary?.toLocaleString() || "N/A"
                }`}
          </p>
        </div>

        <div>
          <span className="text-muted-foreground">Posted:</span>
          <p className="text-foreground font-medium">
            {job.job_posted_at}
          </p>
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border/50">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {job.job_description.length > 120
            ? `${job.job_description.substring(0, 120)}...`
            : job.job_description}
        </p>
      </div>

      <div className="flex items-center gap-2 mt-3">
        {job.job_is_remote && (
          <span className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded">
            Remote
          </span>
        )}
        <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded">
          ID: {job.job_id || "N/A"}
        </span>
      </div>
    </div>
  );
}
