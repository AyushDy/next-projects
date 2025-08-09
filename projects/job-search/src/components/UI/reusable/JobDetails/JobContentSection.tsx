import { JobWithTime } from "@/lib/types";
import JobDescription from "@/components/UI/reusable/JobDetails/JobDescription";
import JobListSection from "@/components/UI/reusable/JobDetails/JobListSection";
import PlaceholderSection from "@/components/UI/reusable/PlaceholderSection";
import { Star } from "lucide-react";
import { ReviewsList } from "@/components/company";
import ReviewsSection from "@/components/company/ReviewsSection";

interface JobContentSectionProps {
  job: JobWithTime;
  showPlaceholders?: boolean;
}

export default function JobContentSection({
  job,
}: JobContentSectionProps) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-card/15 backdrop-blur-lg border border-border/20 rounded-xl hover:bg-card/20 transition-all duration-300">
        <JobDescription description={job.description} />
      </div>

      {job.responsibilities && job.responsibilities.length > 0 && (
        <div className="bg-card/15 backdrop-blur-lg border border-border/20 rounded-xl hover:bg-card/20 transition-all duration-300">
          <JobListSection
            title="Key Responsibilities"
            items={job.responsibilities}
            iconColor="text-primary"
          />
        </div>
      )}

      {job.qualifications && job.qualifications.length > 0 && (
        <div className="bg-card/15 backdrop-blur-lg border border-border/20 rounded-xl hover:bg-card/20 transition-all duration-300">
          <JobListSection
            title="Required Qualifications"
            items={job.qualifications}
            iconColor="text-primary"
          />
        </div>
      )}

     <ReviewsSection company={job.company} />
    </div>
  );
}
