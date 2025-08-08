"use client";

import { JobWithTime } from "@/lib/types";
import { MapPin, Clock, Star } from "lucide-react";
import JobTitle from "@/components/UI/reusable/JobDetails/JobTitle";
import JobSalary from "@/components/UI/reusable/JobDetails/JobSalary";
import SaveButton from "../../buttons/SaveButton";
import ApplyButton from "../../buttons/ApplyButton";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";

interface JobHeaderSectionProps {
  job: JobWithTime;
}

export default function JobHeaderSection({ job }: JobHeaderSectionProps) {
  const { user, company } = useAuthContext() as AuthContextType;
  const showActions = company?.id !== job?.companyId && user?.role !== "admin";

  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <JobTitle
          title={job.title}
          companyId={job.company?.id}
          employerName={job.company?.name || job.title}
          employerLogo={job.company?.logo || undefined}
        />
        <JobSalary
          minSalary={job.minSalary}
          maxSalary={job.maxSalary}
          salaryPeriod={job.salaryPeriod}
        />
      </div>

      <div className="flex flex-wrap gap-3 text-muted-foreground mb-8">
        <div className="flex items-center gap-2 bg-muted/10 px-3 py-2 rounded-lg">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{job.location}</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/10 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{job.employmentType}</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/10 px-3 py-2 rounded-lg">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{job.postedAt}</span>
        </div>
        {job.isRemote && (
          <span className="bg-green-500/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-medium border border-green-500/20">
            Remote Work
          </span>
        )}
      </div>

      {showActions && (
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-5 w-full justify-end">
            <ApplyButton job={job} />
            <SaveButton size="md" job={job} />
          </div>
        </div>
      )}
    </div>
  );
}
