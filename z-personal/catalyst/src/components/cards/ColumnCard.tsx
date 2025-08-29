import { Column } from "@/lib/hooks/useBoards";
import { Card } from "../ui/card";
import AddTaskButton from "../buttons/AddTaskButton";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { useMemo, useState } from "react";
import { ChevronsRightLeft, ChevronsLeftRight } from "lucide-react";
import {
  ColumnsContextType,
  useColumnsContext,
} from "../context/ColumnsContextProvider";
import TaskCard from "./TaskCard";

export default function ColumnCard({ column }: { column: Column }) {
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
            className={`h-fit flex-shrink-0 p-2 ${
              isCollapsed ? "w-10 px-0" : "w-70 p-4"
            }`}
          >
            <div
              className={`flex ${
                isCollapsed ? "flex-col-reverse pr-2 gap-5" : ""
              } justify-between items-center`}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {!isCollapsed ? (
                <h2 className="truncate">{column.name}</h2>
              ) : (
                <span
                  className="block text-sm font-semibold whitespace-nowrap rotate-180 writing-vertical-ltr"
                  style={{
                    writingMode: "vertical-rl",
                    textOrientation: "mixed",
                  }}
                >
                  {column.name}
                </span>
              )}
              <button
                className="ml-2 hover:bg-background/80 p-1 rounded-lg"
                title={isCollapsed ? "Expand list" : "Collapse list"}
              >
                {!isCollapsed ? <ChevronsRightLeft /> : <ChevronsLeftRight />}
              </button>
            </div>
            {!isCollapsed && (
              <>
                <div className="max-h-90 overflow-auto thin-scrollbar mt-2 space-y-2">
                  {sortedTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id as string}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="rounded-md"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskCard task={task} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
                <AddTaskButton columnId={column.id} />
              </>
            )}
          </Card>
        </div>
      )}
    </Droppable>
  );
}
