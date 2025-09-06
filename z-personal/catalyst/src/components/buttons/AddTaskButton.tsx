"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import {
  ColumnsContextType,
  useColumnsContext,
} from "../context/ColumnsContextProvider";

export default function AddTaskButton({ columnId }: { columnId?: string }) {
  const [adding, setAdding] = useState(false);
  const [taskTitle, setTaskTitle] = useState<string>("");
  const { addTask } = useColumnsContext() as ColumnsContextType;

  const handleAddTask = () => {
    if (!columnId) return;
    if (taskTitle.trim() === "") {
      toast.error("Task title cannot be empty");
      return;
    }

    const tempTaskId = "_tmp" + nanoid();
    const newTask = {
      id: tempTaskId,
      title: taskTitle,
      description: "",
      status: "TODO" as const,
      priority: 0,
      columnId: columnId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: {
        id: "temp-user",
        name: "You",
      },
      assignees: [],
    };
    addTask(newTask, columnId);
    setTaskTitle("");
  };

  return (
    <>
      {!adding ? (
        <Button
          variant="ghost"
          onClick={() => setAdding(true)}
          className="w-full justify-start text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add a Card
        </Button>
      ) : (
        <div className="space-y-3">
          <Input
            placeholder="Enter card title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            autoFocus
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTask();
                setAdding(false);
              }
              if (e.key === "Escape") {
                setAdding(false);
                setTaskTitle("");
              }
            }}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => {
                handleAddTask();
                setAdding(false);
              }}
              size="sm"
              className="flex-1"
            >
              Add Card
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setAdding(false);
                setTaskTitle("");
              }}
              size="sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
