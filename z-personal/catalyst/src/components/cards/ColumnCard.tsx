import { Column } from "@/lib/hooks/useBoards";
import { Card } from "../ui/card";
import AddTaskButton from "../buttons/AddTaskButton";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
import { ChevronsRightLeft, ChevronsLeftRight } from "lucide-react";
import { GripVertical } from "lucide-react";
import {
  ColumnsContextType,
  useColumnsContext,
} from "../context/ColumnsContextProvider";
import TaskCard from "./TaskCard";
import { ColumnsMenuButton } from "../buttons/ColumnsMenuButton";

export default function ColumnCard({
  column,
  dragHandleProps,
  isDragging,
}: {
  column: Column;
  dragHandleProps?: any;
  isDragging?: boolean;
}) {
  const { tasksMap } = useColumnsContext() as ColumnsContextType;
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sortedTasks = useMemo(() => {
    return column.taskIds
      .map((id) => tasksMap.get(id))
      .filter((t): t is NonNullable<typeof t> => t !== undefined);
  }, [column.taskIds.join(","), tasksMap]);

  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <Card
            className={`flex-shrink-0 kanban-drag-transition h-fit max-h-[calc(100vh-200px)] flex flex-col ${
              isCollapsed ? "kanban-column-collapsed" : "kanban-column-width"
            } ${
              isDragging ? "kanban-drag-active" : "shadow-md hover:shadow-lg"
            } bg-card border border-border`}
          >
            <div
              className={`flex flex-col h-full ${isCollapsed ? "p-2" : "p-4"}`}
            >
              <div
                className={`flex items-center ${
                  isCollapsed ? "flex-col gap-2" : "justify-between"
                } mb-3 flex-shrink-0`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {!isCollapsed && (
                    <div
                      {...dragHandleProps}
                      className="cursor-grab active:cursor-grabbing p-1 hover:bg-muted rounded transition-colors"
                    >
                      <GripVertical
                        size={16}
                        className="text-muted-foreground"
                      />
                    </div>
                  )}
                  {!isCollapsed ? (
                    <h2 className="text-lg font-semibold truncate text-foreground">
                      {column.name}
                    </h2>
                  ) : (
                    <span
                      className="text-sm font-semibold text-foreground writing-mode-vertical"
                      title={column.name}
                    >
                      {column.name}
                    </span>
                  )}
                </div>

                {!isCollapsed && (
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                      {sortedTasks.length}
                    </span>
                    <button
                      className="p-1 hover:bg-muted rounded transition-colors"
                      title="Collapse list"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsCollapsed(true);
                      }}
                    >
                      <ChevronsRightLeft
                        size={16}
                        className="text-muted-foreground"
                      />
                    </button>
                    <ColumnsMenuButton columnId={column.id} />
                  </div>
                )}

                {isCollapsed && (
                  <button
                    className="p-1 hover:bg-muted rounded transition-colors"
                    title="Expand list"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsCollapsed(false);
                    }}
                  >
                    <ChevronsLeftRight
                      size={16}
                      className="text-muted-foreground"
                    />
                  </button>
                )}
              </div>

              {!isCollapsed && (
                <>
                  <div className="flex-1 min-h-[120px] max-h-[calc(100vh-400px)] overflow-y-auto thin-scrollbar space-y-2 mb-3">
                    {sortedTasks.length > 0 ? (
                      sortedTasks.map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id as string}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground text-sm">
                        No tasks yet
                      </div>
                    )}
                    {provided.placeholder}
                  </div>
                  <div className="flex-shrink-0">
                    <AddTaskButton columnId={column.id} />
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      )}
    </Droppable>
  );
}
