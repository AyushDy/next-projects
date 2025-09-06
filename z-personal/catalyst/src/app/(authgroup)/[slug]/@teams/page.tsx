import ClientTeamsPage from "@/components/ClientTeamsPage";
import { useTeams } from "@/lib/hooks/useTeams";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-10">
          <div className="">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Teams</h1>
                <p className="text-muted-foreground">
                  Manage and organize the teams affiliated with your project.
                </p>
              </div>
            </div>
          </div>
          <div>
            <ClientTeamsPage slug={slug} />
          </div>
        </div>
      </div>
    </>
  );
}
