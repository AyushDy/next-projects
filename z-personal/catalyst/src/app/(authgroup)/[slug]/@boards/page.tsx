import ClientBoardsPage from "@/components/ClientBoardsPage";

export default async function BoardsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <ClientBoardsPage slug={slug} />;
}
