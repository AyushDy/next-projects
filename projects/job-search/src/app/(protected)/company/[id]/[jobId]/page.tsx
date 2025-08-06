import { getJobWithPermissions } from "@/actions/server-actions";
import JobManagementPage from "@/components/management/JobManagementPage";
import AccessDenied from "@/components/UI/reusable/AccessDenied";
import { companyType, JobWithTime } from "@/lib/types";
import { UserWithIdType } from "@/lib/zod";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; jobId: string }>;
}) {
  const { id, jobId } = await params;

  const permissionResult = await getJobWithPermissions(id, jobId) as {
    hasPermission? : boolean;
    message ? :string;
    job ? : JobWithTime;
    company ? : companyType;
    user ? : UserWithIdType;
  };


  if (!permissionResult?.hasPermission) {
    return <AccessDenied />;
  }

  if (!permissionResult.job || !permissionResult.user) {
    return <AccessDenied message={permissionResult.message || "Job not found"} />;
  }

  return (
    <JobManagementPage
      job={permissionResult.job}
      company={permissionResult.company}
      user={permissionResult.user}
      companyId={id}
    />
  );
}
