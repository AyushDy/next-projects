import { getJobWithPermissions } from "@/actions/server-actions";
import EditJobFormWrapper from "@/components/admin/EditJobFormWrapper";
import AccessDenied from "@/components/UI/reusable/AccessDenied";
import { companyType, JobWithTime } from "@/lib/types";
import { UserWithIdType } from "@/lib/zod";

export default async function page({
  params,
}: {
  params: Promise<{ id: string; jobId: string }>;
}) {
  const { id, jobId } = await params;

  const permissionResult = (await getJobWithPermissions(id, jobId)) as {
    hasPermission?: boolean;
    message?: string;
    job?: JobWithTime;
    company?: companyType;
    user?: UserWithIdType;
  };

  if (!permissionResult?.hasPermission) {
    return <AccessDenied />;
  }

  return (
    <div className="container mx-auto p-4 pt-20 lg:px-30">
      <EditJobFormWrapper jobId={jobId} />
    </div>
  );
}
