import { JobData, JobWithTime } from "@/lib/types";
import EditButton from "../buttons/EditButton";
import DeleteButton from "../buttons/DeleteButton";
import Link from "next/link";
import Button from "@/components/UI/Button";
import ShowApplicantsButton from "@/components/company/buttons/ShowApplicants";

export default function JobCard({
  job,
  handleDelete,
}: {
  job: JobWithTime;
  handleDelete: (jobId: string) => Promise<void>;
}) {
  return (
    <div className="background dark:bg-white/10 border mb-5 border-border rounded-lg p-4 sm:p-6 hover:bg-card/70 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg sm:text-xl font-semibold text-foreground truncate">
            {job.title}
          </h3>
          <p className="text-sm text-muted-foreground">{job.employerName}</p>
        </div>

        <div className="flex flex-col space-y-3 sm:ml-4">
          <div className="flex flex-wrap gap-2">
            <Link href={`/company/${job.companyId}/${job.id}`}>
              <Button
                variant="primary"
                size="sm"
                className="bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/70 shadow-lg text-xs sm:text-sm"
              >
                Details
              </Button>
            </Link>
            <Link href={`/company/${job.companyId}/${job.id}/edit`}>
              <EditButton jobId={job.id} />
            </Link>
            <DeleteButton jobId={job.id} handleDelete={handleDelete} />
          </div>
          <ShowApplicantsButton id={job.id} title={job.title} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
        <div className="flex flex-col sm:block">
          <span className="text-muted-foreground text-xs sm:text-sm">
            Location:
          </span>
          <p className="text-foreground font-medium">{job.city}</p>
        </div>

        <div className="flex flex-col sm:block">
          <span className="text-muted-foreground text-xs sm:text-sm">
            Type:
          </span>
          <p className="text-foreground font-medium">{job.employmentType}</p>
        </div>

        <div className="flex flex-col sm:block">
          <span className="text-muted-foreground text-xs sm:text-sm">
            Salary:
          </span>
          <p className="text-foreground font-medium text-sm sm:text-base">
            {job.minSalary
              ? `$${job.minSalary.toLocaleString()} - $${
                  job.maxSalary?.toLocaleString() || "N/A"
                }/ ${job.salaryPeriod}`
              : "N/A"}
          </p>
        </div>

        <div className="flex flex-col sm:block">
          <span className="text-muted-foreground text-xs sm:text-sm">
            Posted:
          </span>
          <p className="text-foreground font-medium">{job.postedAt}</p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border/50">
        <p className="text-sm sm:text-base text-muted-foreground line-clamp-2 sm:line-clamp-3">
          {job.description.length > 120
            ? `${job.description.substring(0, 120)}...`
            : job.description}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-4">
        {job.isRemote && (
          <span className="px-2 py-1 text-xs bg-green-500/10 text-green-600 rounded-md">
            Remote
          </span>
        )}
        <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-600 rounded-md">
          ID: {job.id || "N/A"}
        </span>
      </div>
    </div>
  );
}
