"use client";

import { JobWithTime } from "@/lib/types";
import { Clock, MapPin } from "lucide-react";
import JobBenefits from "@/components/UI/reusable/JobDetails/JobBenefits";
import JobSummary from "@/components/UI/reusable/JobDetails/JobSummary";
import PlaceholderSection from "@/components/UI/reusable/PlaceholderSection";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { useSavedContext } from "@/contexts/SavedJobsContext";
import { useAppliedContext } from "@/contexts/AppliedJobsContext";

interface JobSidebarSectionProps {
  job: JobWithTime;
  showQuickActions?: boolean;
  showPlaceholders?: boolean;
}

export default function JobSidebarSection({
  job,
  showPlaceholders = true,
}: JobSidebarSectionProps) {
  const { isJobApplied } = useAppliedContext();

  return (
    <div className="space-y-6">
      {job.benefits && job.benefits.length > 0 && (
        <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
          <JobBenefits benefits={job.benefits} />
        </div>
      )}

      <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
        <JobSummary
          employmentType={job.employmentType}
          location={job.location}
          city={job.city}
          isRemote={job.isRemote}
          postedAt={job.postedAt}
          minSalary={job.minSalary}
          maxSalary={job.maxSalary}
        />
      </div>
    </div>
  );
}
