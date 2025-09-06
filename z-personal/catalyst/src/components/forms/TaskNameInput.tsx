import React, { useEffect, useState, useRef } from "react";
import { useUpdateTask } from "@/lib/hooks/useTasks";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Spinner } from "../ui/LoadingSpinner";
import { Input } from "../ui/input";
import {
  Column,
  ColumnsContextType,
  useColumnsContext,
} from "../context/ColumnsContextProvider";

const TaskNameInput = ({
  taskId,
  taskTitle,
}: {
  taskId: string;
  taskTitle: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(taskTitle);
  const { updateTask } = useColumnsContext() as ColumnsContextType;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  useEffect(() => {
    autoResize();
  }, [title]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (title !== taskTitle) {
        updateTask(taskId, { title });
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [taskId, title, taskTitle]);

  return (
    <div className="space-y-5">
      <textarea
        ref={textareaRef}
        className={`border-2 ${
          isEditing ? "border-primary" : "border-transparent"
        } rounded-md p-2 text-3xl outline-none break-words resize-none overflow-hidden bg-transparent font-semibold w-full min-h-[3rem]`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onFocus={() => setIsEditing(true)}
        onBlur={() => {
          setIsEditing(false);
        }}
        onInput={autoResize}
        placeholder="Add a title..."
        rows={1}
      />
    </div>
  );
};

export default TaskNameInput;
