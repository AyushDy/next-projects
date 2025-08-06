

import { JobWithTime } from "@/lib/types";
import JobLayout from "@/components/UI/reusable/JobDetails/JobLayout";
import AccessDenied from "@/components/UI/reusable/AccessDenied";

export default function JobDetailsPage({ job }: { job: JobWithTime }) {

  if (!job) {
    return (
      <AccessDenied
        title="Job Not Found"
        message="The job you're looking for doesn't exist or has been removed."
        backHref="/jobs"
      />
    );
  }

  return (
    <JobLayout
      job={job}
      backButtonText="Back to Jobs"
      showApplyButton={true}
      showQuickActions={true}
      showPlaceholders={true}
      showCompanyInfo={true}
    />
  );
}
