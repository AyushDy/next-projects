import Image from "next/image";
import ViewDetails from "../UI/buttons/ViewDetails";
import SaveButton from "../UI/buttons/SaveButton";
import { JobWithTime } from "@/lib/types";
import { MapPin, Clock, DollarSign } from "lucide-react";

export default function JobCard({ job }: { job: JobWithTime }) {
  const getSalaryDisplay = () => {
    return `$${job.minSalary.toLocaleString()} - $${job.maxSalary.toLocaleString()}/ ${
      job.salaryPeriod
    }`;
  };

  return (
    <div className="bg-card/20 backdrop-blur-lg border shadow shadow-primary/10 rounded-xl p-4 sm:p-6 hover:bg-card/30 transition-all duration-200 group">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src={job.employerLogo || "/vercel.svg"}
              alt={job.employerName}
              height={20}
              width={20}
              className="rounded flex-shrink-0"
            />
            <span className="text-muted-foreground text-sm truncate">
              {job.employerName}
            </span>
          </div>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-center sm:text-left self-start sm:self-auto whitespace-nowrap">
          {getSalaryDisplay()}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-4 mb-4 text-xs sm:text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{job.location || "Remote"}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{job.employmentType || "Full-time"}</span>
        </div>
        {job.isRemote && (
          <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-xs self-start">
            Remote
          </span>
        )}
      </div>

      {job.benefits && job.benefits.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {job.benefits.slice(0, 2).map((benefit, index) => (
              <span
                key={benefit + index}
                className="bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs leading-tight"
              >
                {benefit}
              </span>
            ))}
            {job.benefits.length > 2 && (
              <span className="text-muted-foreground text-xs self-center">
                +{job.benefits.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0 pt-3 sm:pt-4 border-t border-border/20">
        <span className="text-xs text-muted-foreground order-2 sm:order-1">
          {job.postedAt || "Recently posted"}
        </span>
        <div className="flex items-center gap-2 order-1 sm:order-2 self-end sm:self-auto">
          <div className="flex-1 sm:flex-none">
            <ViewDetails id={job.id} />
          </div>
          <SaveButton job={job} />
        </div>
      </div>
    </div>
  );
}
