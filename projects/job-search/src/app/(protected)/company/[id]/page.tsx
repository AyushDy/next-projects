import CompanyJobManager from "@/components/company/CompanyJobManager";
import CompanyGuestView from "@/components/company/CompanyGuestView";
import { getCompanyById } from "@/lib/company/utils";
import { getCurrentUser } from "@/lib/jwt";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  const response = await getCompanyById(id);
  const company = response?.data;

  if (!response || !response.success) {
    return <NotOwner />;
  }

  const isOwner = user && company && company.ownerId === user.id;
  const isAdmin = user && user.role === "admin";

  if (isOwner || isAdmin) {
    return <CompanyJobManager company={company} user={user} />;
  }

  return <CompanyGuestView company={company} user={user} />;
}

function NotOwner() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-card/20 backdrop-blur-lg border border-border/20 rounded-xl p-8 text-center">
        <h1 className="text-xl font-bold text-foreground mb-2">
          Access Denied
        </h1>
        <p className="text-muted-foreground">
          You do not have permission to manage this company.
        </p>
      </div>
    </div>
  );
}
