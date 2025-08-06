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

export default function JobHeaderSection({
  job,
}: JobHeaderSectionProps) {
  const {user, company} =  useAuthContext() as AuthContextType;
  const showActions = (company?.id !== job?.company_id) && (user?.role !== "admin");


  return (
    <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between mb-6">
        <JobTitle
          title={job.job_title}
          employerName={job.employer_name}
          employerLogo={job.employer_logo || undefined}
        />
        <JobSalary
          salary={job.job_salary || undefined}
          minSalary={job.job_min_salary}
          maxSalary={job.job_max_salary}
          salaryPeriod={job.job_salary_period}
        />
      </div>

      <div className="flex flex-wrap gap-3 text-muted-foreground mb-8">
        <div className="flex items-center gap-2 bg-muted/10 px-3 py-2 rounded-lg">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{job.job_location}</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/10 px-3 py-2 rounded-lg">
          <Clock className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{job.job_employment_type}</span>
        </div>
        <div className="flex items-center gap-2 bg-muted/10 px-3 py-2 rounded-lg">
          <Star className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">{job.job_posted_at}</span>
        </div>
        {job.job_is_remote && (
          <span className="bg-green-500/20 text-green-600 dark:text-green-400 px-4 py-2 rounded-lg text-sm font-medium border border-green-500/20">
            Remote Work
          </span>
        )}
      </div>

      {showActions && (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex gap-5 w-full justify-end">
              <ApplyButton jobId={job.job_id} />
              <SaveButton size="md" job_id={job.job_id} />
            </div>
        </div>
      )}
    </div>
  );
}
