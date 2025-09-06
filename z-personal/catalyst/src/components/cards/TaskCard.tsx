import { useState } from "react";
import {
  ColumnsContextType,
  Task,
  useColumnsContext,
} from "../context/ColumnsContextProvider";
import { Card } from "../ui/card";
import TaskDetails from "./TaskDetailsCard";
import TaskCheckbox from "../forms/TaskCheckBox";
import { Trash } from "lucide-react";

export default function TaskCard({ task }: { task: Task }) {
  const [open, setOpen] = useState(false);
  const { deleteTask } = useColumnsContext() as ColumnsContextType;

  return (
    <div>
      {open && <TaskDetails taskId={task.id} onClose={() => setOpen(false)} />}
      <Card
        className="group relative cursor-pointer task-card-hover bg-card border border-border p-3 rounded-lg"
        onClick={() => setOpen(true)}
      >
        <div className="flex items-start gap-3">
          <TaskCheckbox
            taskId={task.id}
            status={task.status as "TODO" | "DONE"}
          />
          <div className="flex-1 min-w-0">
            <h3
              className={`font-medium break-words text-sm leading-relaxed transition-all duration-200 ${
                task.status === "DONE"
                  ? "line-through text-muted-foreground"
                  : "text-foreground"
              }`}
            >
              {task.title}
            </h3>
          </div>
          {task.status === "DONE" && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                console.log("Deleting task:", task.id);
                deleteTask(task.id);
              }}
              className="opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-900/30 bg-background/95 p-1.5 rounded-md shadow-sm border border-border hover:border-red-300 dark:hover:border-red-600 hover:scale-105"
              title="Delete completed task"
            >
              <Trash className="w-3 h-3 text-red-600 dark:text-red-400" />
            </button>
          )}
        </div>
      </Card>
    </div>
  );
}
