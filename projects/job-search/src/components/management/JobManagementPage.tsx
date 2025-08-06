import { JobWithTime } from "@/lib/types";
import JobManagementActions from "@/components/management/JobManagementActions";
import JobHeaderSection from "@/components/UI/reusable/JobDetails/JobHeaderSection";
import JobContentSection from "@/components/UI/reusable/JobDetails/JobContentSection";
import JobSidebarSection from "@/components/UI/reusable/JobDetails/JobSidebarSection";
import CompanyInformation from "../UI/reusable/JobDetails/CompanyInformation";

interface JobManagementPageProps {
  job: JobWithTime;
  company: any;
  user: any;
  companyId: string;
}

export default function JobManagementPage({
  job,
  user,
  companyId,
}: JobManagementPageProps) {
  const isAdmin = user?.role === "admin";
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <div className="mb-8">
          <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  Job Management
                </h1>
                <p className="text-muted-foreground">
                  {isAdmin ? "Admin view" : "Company management"} for job
                  posting
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                Job ID:{" "}
                <span className="font-mono text-foreground">{job.job_id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <JobHeaderSection job={job}  />

            {isAdmin && (
              <CompanyInformation
                employer_name={job.employer_name}
                employer_logo={job.employer_logo}
                job_location={job.job_location}
              />
            )}

            <JobContentSection job={job} />
          </div>

          <div className="space-y-6">
            <JobManagementActions
              job_title={job.job_title}
              jobId={job.job_id}
              companyId={companyId}
              isAdmin={isAdmin}
            />

            <JobSidebarSection job={job} showQuickActions={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
