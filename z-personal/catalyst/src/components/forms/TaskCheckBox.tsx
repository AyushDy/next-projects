import { useEffect, useState } from "react";
import {
  ColumnsContextType,
  useColumnsContext,
} from "../context/ColumnsContextProvider";
import { Input } from "../ui/input";

function TaskCheckbox({
  taskId,
  status,
}: {
  status: "TODO" | "DONE";
  taskId: string;
}) {
  const { updateTask } = useColumnsContext() as ColumnsContextType;
  const [isChecked, setIsChecked] = useState(status === "DONE");

  useEffect(() => {
    const newStatus = isChecked ? "DONE" : "TODO";
    updateTask(taskId, { status: newStatus });
  }, [isChecked, taskId]);

  return (
    <div className="flex-shrink-0">
      <Input
        onClick={(e) => e.stopPropagation()}
        type="checkbox"
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
        className={`w-4 h-4 rounded border-2 border-primary accent-primary transition-all duration-200 cursor-pointer ${
          isChecked ? "opacity-100" : "opacity-60 hover:opacity-100"
        }`}
      />
    </div>
  );
}

export default TaskCheckbox;
