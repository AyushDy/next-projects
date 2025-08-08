import Image from "next/image";
import ViewDetails from "../UI/buttons/ViewDetails";
import SaveButton from "../UI/buttons/SaveButton";
import { JobWithTime } from "@/lib/types";
import { MapPin, Clock, DollarSign } from "lucide-react";

export default function JobCard({ job }: { job: JobWithTime }) {
  const getSalaryDisplay = () => {
      return `$${job.minSalary.toLocaleString()} - $${job.maxSalary.toLocaleString()}/ ${job.salaryPeriod}`;
    }
  

  return (
    <div className="bg-card/20 backdrop-blur-lg border shadow shadow-primary/10 rounded-xl p-6 hover:bg-card/30 transition-all duration-200 group">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {job.title}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <Image
              src={job.employerLogo || "/vercel.svg"}
              alt={job.employerName}
              height={20}
              width={20}
              className="rounded"
            />
            <span className="text-muted-foreground text-sm">
              {job.employerName}
            </span>
          </div>
        </div>
        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
          {"$ "}
          {getSalaryDisplay()}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4" />
          {job.location || "Remote"}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {job.employmentType || "Full-time"}
        </div>
        {job.isRemote && (
          <span className="bg-green-500/10 text-green-600 px-2 py-1 rounded text-xs">
            Remote
          </span>
        )}
      </div>

      {job.benefits && job.benefits.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {job.benefits.slice(0, 2).map((benefit, index) => (
              <span
                key={benefit + index}
                className="bg-accent/20 text-accent-foreground px-2 py-1 rounded text-xs"
              >
                {benefit}
              </span>
            ))}
            {job.benefits.length > 2 && (
              <span className="text-muted-foreground text-xs">
                +{job.benefits.length - 2} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center pt-4 border-t border-border/20">
        <span className="text-xs text-muted-foreground">
          {job.postedAt || "Recently posted"}
        </span>
        <div className="flex gap-2">
          <ViewDetails id={job.id} />
          <SaveButton job={job} />
        </div>
      </div>
    </div>
  );
}
