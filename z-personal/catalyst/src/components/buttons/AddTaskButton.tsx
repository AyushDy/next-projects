"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { ColumnsContextType, useColumnsContext } from "../context/ColumnsContextProvider";

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

    const tempTaskId = "_tmp"+nanoid();
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
        <Button variant={"outline"} onClick={() => setAdding(true)}>
          <PlusIcon className="mr-2" /> Add a Card
        </Button>
      ) : (
        <div className="w-full">
          <Input 
            placeholder="Enter card title" 
            value={taskTitle} 
            onChange={(e) => setTaskTitle(e.target.value)} 
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddTask();
              if (e.key === "Escape") setAdding(false);
            }}
          />
          <div className="flex gap-2 py-2">
            <Button onClick={handleAddTask}>Add Card</Button>
            <Button variant={"outline"} onClick={() => setAdding(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
}