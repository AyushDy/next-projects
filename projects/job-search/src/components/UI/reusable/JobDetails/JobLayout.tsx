import { JobWithTime } from "@/lib/types";
import JobPageHeader from "@/components/UI/reusable/JobDetails/JobPageHeader";
import JobHeaderSection from "@/components/UI/reusable/JobDetails/JobHeaderSection";
import JobContentSection from "@/components/UI/reusable/JobDetails/JobContentSection";
import JobSidebarSection from "@/components/UI/reusable/JobDetails/JobSidebarSection";
import CompanyInfoSection from "@/components/UI/reusable/JobDetails/CompanyInfoSection";

interface JobLayoutProps {
  job: JobWithTime;
  onBack?: () => void;
  backButtonText?: string;
  showApplyButton?: boolean;
  showQuickActions?: boolean;
  showPlaceholders?: boolean;
  showCompanyInfo?: boolean;
  children?: React.ReactNode;
}

export default function JobLayout({
  job,
  backButtonText,
  showPlaceholders = true,
  showCompanyInfo = true,
  children,
}: JobLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 dark:from-background dark:via-background dark:to-primary/10">

      <JobPageHeader backButtonText={backButtonText} />

      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">

          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <JobHeaderSection
              job={job}
            />

            <JobContentSection job={job} showPlaceholders={showPlaceholders} />


          {children}
          </div>


          <div className="order-2 lg:order-none">
            <JobSidebarSection
              job={job}
              showPlaceholders={showPlaceholders}
            />
          </div>
        </div>


        <CompanyInfoSection showPlaceholder={showCompanyInfo} />
      </div>
    </div>
  );
}
