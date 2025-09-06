import React, { useState } from "react";
import { useUpdateTask } from "@/lib/hooks/useTasks";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/LoadingSpinner";
import { set } from "zod";

const TaskDescriptionInput = ({
  taskId,
  taskDescription,
}: {
  taskId: string;
  taskDescription: string;
}) => {
  const updateTask = useUpdateTask(taskId);
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(taskDescription);

  async function saveDescription() {
    try {
      await updateTask.mutateAsync({ taskId, description });
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating task description");
    }
  }

  return (
    <div className="space-y-5 mt-4 ">
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setIsEditing(true)}
          placeholder="Add a description..."
          rows={4}
        />
      <div className={`flex gap-2 ${!isEditing ? "hidden" : ""}`}>
        <Button onClick={saveDescription}>{updateTask.isPending ? <Spinner size="sm" /> : "Save"}</Button>
        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
      </div>
    </div>
  );
};


export default TaskDescriptionInput;