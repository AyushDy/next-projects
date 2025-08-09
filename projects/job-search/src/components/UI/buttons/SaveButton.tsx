"use client";

import { useSavedContext } from "@/contexts/SavedJobsContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import Button from "@/components/UI/Button";
import ToastPortal from "../loaders/ToastPortal";
import Toast from "../loaders/Toast";
import DotsLoader from "../loaders/DotsLoaders";
import { JobWithTime } from "@/lib/types";

export default function SaveButton({
  job,
  className,
  size = "sm",
}: {
  job: JobWithTime;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const { saveJob, removeJob, isJobSaved, savingJobId, removingJobId } =
    useSavedContext();
  const [toastVisible, setToastVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const saved = isJobSaved(job.id);
  const isLoading = savingJobId === job.id || removingJobId === job.id;

  async function handleSave() {
    const result = await saveJob(job);
    if (result.success) {
      setStatus("Job saved successfully!");
      setType("success");
    } else {
      setStatus("Failed to save Job!");
      setType("error");
    }
    setToastVisible(true);
  }

  async function handleRemove() {
    const result = await removeJob(job.id);
    if (result.success) {
      setStatus("Job removed from saved list!");
      setType("success");
    } else {
      setStatus("Failed to remove Job!");
      setType("error");
    }
    setToastVisible(true);
  }

  return (
    <>
      {toastVisible && (
        <ToastPortal>
          <Toast
            message={status}
            type={type}
            onClose={() => setToastVisible(false)}
          />
        </ToastPortal>
      )}
      <Button
        onClick={saved ? handleRemove : handleSave}
        variant="primary"
        size={size}
        disabled={isLoading}
        className={`bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg min-h-[36px] sm:min-h-[32px] min-w-[36px] sm:min-w-[32px] ${className}`}
      >
        {!isLoading ? (
          saved ? (
            <BookmarkCheck className="w-4 h-4" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )
        ) : (
          <DotsLoader />
        )}
      </Button>
    </>
  );
}
