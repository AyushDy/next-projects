import Kanban from "@/components/Kanban";

export default async function page({ params }: { params: Promise<{ boardId: string }> }) {
  const { boardId } = await params;

  return (
    <main>
        <Kanban boardId={boardId} />
    </main>
  );
}