"use client";

import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import { Card } from "./ui/card";
import ColumnCard from "./cards/ColumnCard";
import AddColumnButton from "./buttons/AddColumnButton";
import {
  ColumnsContextType,
  useColumnsContext,
} from "./context/ColumnsContextProvider";
import { useColumns } from "@/lib/hooks/useColumns";
import { Spinner } from "./ui/TriangleLoader";
import { Spinner as CircleSpinner } from "./ui/LoadingSpinner";

export default function Kanban({ boardId }: { boardId: string }) {
  const { columns, moveTask, isSyncing, moveColumn } =
    useColumnsContext() as ColumnsContextType;
  const { isLoading } = useColumns(boardId);

  function handleDragEnd(result: DropResult) {
    const { source, destination, type } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;

    if (type === "COLUMN") {
      moveColumn(source.index, destination.index);
      return;
    }

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
    <div className="h-full w-full p-6 bg-background">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kanban Board</h1>
        <div className="flex items-center gap-3 px-3 py-2 bg-card rounded-xs border shadow-sm">
          {isSyncing ? (
            <>
              <CircleSpinner size="sm" />
              <span className="text-sm text-muted-foreground">
                Syncing tasks...
              </span>
            </>
          ) : (
            <span className="text-sm text-green-600 font-medium">✓ Synced</span>
          )}
        </div>
      </div>
      <div className="w-full overflow-x-auto thin-scrollbar">
        <div className="flex gap-6 min-w-max pb-6">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="columns"
              direction="horizontal"
              type="COLUMN"
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex gap-6"
                >
                  {columns?.map((column, index) => (
                    <Draggable
                      key={column.id}
                      draggableId={column.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <ColumnCard
                            column={column as any}
                            dragHandleProps={provided.dragHandleProps}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>

            <Card className="p-6 kanban-column-width h-fit flex-shrink-0 bg-muted/30 border-dashed border-2 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col items-center justify-center space-y-4">
                <h3 className="text-lg font-medium text-muted-foreground">
                  Add New List
                </h3>
                <AddColumnButton boardId={boardId} />
              </div>
            </Card>
          </DragDropContext>
        </div>
      </div>
    </div>
  );
}
