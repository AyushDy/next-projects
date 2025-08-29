"use client";

import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Card } from "./ui/card";
import AddTaskButton from "./buttons/AddTaskButton";
import ColumnCard from "./cards/ColumnCard";
import AddColumnButton from "./buttons/AddColumnButton";
import {
  ColumnsContextType,
  useColumnsContext,
} from "./context/ColumnsContextProvider";
import { useColumns, useSyncBoardColumns } from "@/lib/hooks/useColumns";
import { Spinner } from "./ui/TriangleLoader";

export default function Kanban({ boardId }: { boardId: string }) {
  const { columns, moveTask, tasksMap } =
    useColumnsContext() as ColumnsContextType;
  const { isLoading } = useColumns(boardId);

  function handleDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    moveTask(
      result.draggableId,
      destination.droppableId,
      source.droppableId,
      destination.index
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <DragDropContext onDragEnd={handleDragEnd}>
        <h1 className="mb-4">Kanban Board: {boardId}</h1>
        <div className="w-full overflow-x-auto thin-scrollbar">
          <div className="flex space-x-4 min-w-max pb-4">

            {columns?.map((column) => (
              <ColumnCard key={column.id} column={column as any} />
            ))}

            <Card className="p-4 w-60 h-96 flex-shrink-0">
              <h2>Add Column</h2>
              <AddColumnButton boardId={boardId} />
            </Card>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}
