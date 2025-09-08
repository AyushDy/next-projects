"use client";
import { createPortal } from "react-dom";
import { ListIcon } from "lucide-react";
import { Separator } from "../ui/separator";
import TaskDescriptionInput from "../forms/TaskDescriptionInput";
import { useTask } from "@/lib/hooks/useTasks";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/LoadingSpinner";
import TaskNameInput from "../forms/TaskNameInput";
import ProfileIcon from "../ui/ProfileIcon";
import { useState } from "react";
import CommentsList from "./CommentsList";

export default function TaskDetails({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose: () => void;
}) {
  if (typeof window === "undefined") return null;
  const [showComments, setShowComments] = useState(false);

  const { data: task, isLoading } = useTask(taskId);
  const router = useRouter();

  return createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-card border border-border rounded-lg shadow-xl w-full h-[90vh] sm:h-[80vh] lg:h-[70vh] overflow-hidden task-details-modal transition-all duration-300 ${
          showComments ? "max-w-7xl" : "max-w-sm sm:max-w-2xl lg:max-w-4xl"
        }`}
      >
        {isLoading ? (
          <div className="p-8 text-center">
            <Spinner size="sm" />
            <p className="mt-2 text-muted-foreground">
              Loading task details...
            </p>
          </div>
        ) : task ? (
          <div className="flex flex-col h-full">
            <div className="p-3 sm:p-4 lg:p-6 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 sm:gap-3">
                  <ProfileIcon user={task.createdBy} />
                  <div>
                    <p className="text-xs sm:text-sm text-muted-foreground">Created by</p>
                    <p className="font-medium text-sm sm:text-base truncate">{task.createdBy.name}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
              <div className="flex-shrink-0 w-full lg:max-w-4xl p-3 sm:p-4 lg:p-6 overflow-y-auto">
                <div className="mb-4 sm:mb-6">
                  <TaskNameInput taskId={task.id} taskTitle={task.title} />
                </div>

                <div className="mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold flex items-center gap-2 mb-3">
                    <ListIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    Description
                  </h2>
                  <TaskDescriptionInput
                    taskId={task.id}
                    taskDescription={task.description || ""}
                  />
                </div>

                <div className="mt-6 sm:mt-8 lg:ml-auto w-full lg:w-fit">
                  <Button
                    onClick={() => setShowComments(!showComments)}
                    variant="outline"
                    className={`w-full lg:w-auto ${showComments ? "hidden lg:block" : ""}`}
                  >
                    {showComments ? "Hide Comments" : "View Comments"}
                  </Button>
                </div>
              </div>

              {showComments && (
                <div className="flex-1 border-t lg:border-t-0 lg:border-l border-border p-3 sm:p-4 lg:p-6 overflow-y-auto thin-scrollbar bg-muted/20">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base sm:text-lg font-semibold">Comments</h2>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowComments(false)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </Button>
                  </div>
                  <CommentsList taskId={task.id} />
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-muted-foreground mb-4">
              Failed to load task details.
            </p>
            <Button onClick={() => router.refresh()} variant="outline">
              Try Again
            </Button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}
