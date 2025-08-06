import { JobWithTime } from "@/lib/types";
import JobDescription from "@/components/UI/reusable/JobDetails/JobDescription";
import JobListSection from "@/components/UI/reusable/JobDetails/JobListSection";
import PlaceholderSection from "@/components/UI/reusable/PlaceholderSection";
import { Star } from "lucide-react";

interface JobContentSectionProps {
  job: JobWithTime;
  showPlaceholders?: boolean;
}

export default function JobContentSection({
  job,
  showPlaceholders = true,
}: JobContentSectionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-card/15 backdrop-blur-lg border border-border/20 rounded-xl hover:bg-card/20 transition-all duration-300">
        <JobDescription description={job.job_description} />
      </div>

      {job.job_responsibilities && job.job_responsibilities.length > 0 && (
        <div className="bg-card/15 backdrop-blur-lg border border-border/20 rounded-xl hover:bg-card/20 transition-all duration-300">
          <JobListSection
            title="Key Responsibilities"
            items={job.job_responsibilities}
            iconColor="text-primary"
          />
        </div>
      )}

      {job.job_qualifications && job.job_qualifications.length > 0 && (
        <div className="bg-card/15 backdrop-blur-lg border border-border/20 rounded-xl hover:bg-card/20 transition-all duration-300">
          <JobListSection
            title="Required Qualifications"
            items={job.job_qualifications}
            iconColor="text-primary"
          />
        </div>
      )}

      {showPlaceholders && (
        <PlaceholderSection
          icon={Star}
          title="Company Reviews"
          description="Employee reviews and ratings will appear here"
        />
      )}
    </div>
  );
}
