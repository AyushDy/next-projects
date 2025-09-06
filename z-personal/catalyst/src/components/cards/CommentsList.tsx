import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useCommentsByTaskId, useCreateComment } from "@/lib/hooks/useTasks";
import { Spinner } from "../ui/LoadingSpinner";
import ProfileIcon from "../ui/ProfileIcon";

export function formatCommentTime(createdAt: string | number): string {
  try {
    let date: Date;

    if (typeof createdAt === "number") {
      date = new Date(createdAt);
    } else if (typeof createdAt === "string") {
      const numericTimestamp = parseInt(createdAt);
      if (
        !isNaN(numericTimestamp) &&
        createdAt === numericTimestamp.toString()
      ) {
        date = new Date(numericTimestamp);
      } else {
        date = new Date(createdAt);
      }
    } else {
      throw new Error("Invalid date format");
    }

    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) {
      return "Just now";
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes}m ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours}h ago`;
    } else if (diffInMinutes < 10080) {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  } catch (error) {
    return "Unknown time";
  }
}

export default function CommentsList({
  taskId,
}: {
  taskId: string;
}) {
  const [comment, setComment] = useState("");
  const [editing, setEditing] = useState(false);
  const addCommentMutation = useCreateComment(taskId);
  const { isLoading, data: comments } = useCommentsByTaskId(taskId);

  async function handleSave() {
    await addCommentMutation.mutateAsync({ taskId, content: comment });
    setComment("");
    setEditing(false);
  }

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-shrink-0 mb-4">
        <Textarea
          placeholder="Add a comment..."
          value={comment}
          className="w-full resize-none"
          rows={3}
          onFocus={() => setEditing(true)}
          onChange={(e) => setComment(e.target.value)}
        />
        <div
          className={`flex justify-end gap-2 mt-3 ${!editing ? "hidden" : ""}`}
        >
          <Button onClick={() => setEditing(false)} variant="outline" size="sm" className="rounded-xs">
            Cancel
          </Button>
          <Button onClick={handleSave} size="sm" disabled={!comment.trim()} className="rounded-xs">
            {addCommentMutation.isPending ? <Spinner size="sm" /> : "Save"}
          </Button>
        </div>
      </div>
      <div className="space-y-4 w-full">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Spinner />
          </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div className="flex gap-3 w-full" key={comment.id}>
              <div className="flex-shrink-0">
                <ProfileIcon user={comment.createdBy} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex gap-2">
                  <p className="font-medium text-sm mb-1">
                    {comment.createdBy.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatCommentTime(comment.createdAt)}
                  </p>
                </div>
                <div className="bg-muted rounded-xs px-2 py-1">
                  <p className="text-sm text-foreground leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}
