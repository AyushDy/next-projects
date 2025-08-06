"use client"



import { JobWithTime } from "@/lib/types";
import {  Clock, MapPin } from "lucide-react";
import JobBenefits from "@/components/UI/reusable/JobDetails/JobBenefits";
import JobSummary from "@/components/UI/reusable/JobDetails/JobSummary";
import PlaceholderSection from "@/components/UI/reusable/PlaceholderSection";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { useSavedContext } from "@/contexts/SavedJobsContext";

interface JobSidebarSectionProps {
  job: JobWithTime;
  showQuickActions?: boolean;
  showPlaceholders?: boolean;
}

export default function JobSidebarSection({
  job,
  showPlaceholders = true,
}: JobSidebarSectionProps) {

  const { isApplied } = useSavedContext();
  const { user } = useAuthContext() as AuthContextType;

  const isJobApplied = isApplied(job.job_id);

  return (
    <div className="space-y-6">

      {job.job_benefits && job.job_benefits.length > 0 && (
        <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <JobBenefits benefits={job.job_benefits} />
        </div>
      )}

      <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <JobSummary
          employmentType={job.job_employment_type}
          location={job.job_location}
          city={job.job_city}
          isRemote={job.job_is_remote}
          postedAt={job.job_posted_at}
          salary={job.job_salary || undefined}
          minSalary={job.job_min_salary}
          maxSalary={job.job_max_salary}
        />
      </div>

      {showPlaceholders && (
        <>
          <PlaceholderSection
            icon={Clock}
            title="Application Status"
            variant="small"
            description={isJobApplied ? "Your Application is pending" : "Your application status appears here"}
          />

          <PlaceholderSection
            icon={MapPin}
            title="Similar Jobs"
            description="Related job recommendations"
            variant="small"
          />
        </>
      )}
    </div>
  );
}
