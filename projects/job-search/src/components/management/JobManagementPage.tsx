import { JobWithTime } from "@/lib/types";
import JobManagementActions from "@/components/management/JobManagementActions";
import JobHeaderSection from "@/components/UI/reusable/JobDetails/JobHeaderSection";
import JobContentSection from "@/components/UI/reusable/JobDetails/JobContentSection";
import JobSidebarSection from "@/components/UI/reusable/JobDetails/JobSidebarSection";
import CompanyInformation from "../UI/reusable/JobDetails/CompanyInformation";

interface JobManagementPageProps {
  job: any;
  company: any;
  user: any;
}

export default function JobManagementPage({
  job,
  user,
  company,
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
                <span className="font-mono text-foreground">{job.id}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <JobHeaderSection job={job} />

            {isAdmin && (
              <CompanyInformation
                employerName={company.name}
                employerLogo={company.logo}
                location={company.location}
              />
            )}

            <JobContentSection job={job} />
          </div>

          <div className="space-y-6">
            <JobManagementActions
              title={job.title}
              jobId={job.id}
              companyId={company.id}
              isAdmin={isAdmin}
            />

            <JobSidebarSection job={job} showQuickActions={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
