import ClientTeamsPage from "@/components/ClientTeamsPage";

export default async function TeamsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ClientTeamsPage slug={slug} />;
}
