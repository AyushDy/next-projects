import ClientTeamsPage from "@/components/ClientTeamsPage";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10">
          <div className="">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight">
                  Teams
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
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
