
import { getCompanyById } from "@/lib/company/utils";
import { getCurrentUser } from "@/lib/jwt";
import { getJobById } from "@/lib/utils";

export async function useJobPermissions(companyId: string, jobId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { hasPermission: false, error: "User not authenticated" };
  }

  const [companyResponse, jobResponse] = await Promise.all([
    getCompanyById(companyId),
    getJobById(jobId),
  ]);

  if (!companyResponse?.success || jobResponse?.success) {
    return { hasPermission: false, error: "Company or job not found" };
  }
    const company = companyResponse.data;
    const job = jobResponse.data;

    const hasPermission = company.ownerId === user.id || user.role === "admin";

    return {
        hasPermission,
        user,
        company,
        job,
        isAdmin : user.role === "admin",
    }
}
