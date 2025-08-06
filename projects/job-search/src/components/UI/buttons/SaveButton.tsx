"use client";

import { useSavedContext } from "@/contexts/SavedJobsContext";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { useState } from "react";
import Button from "@/components/UI/Button";
import ToastPortal from "../loaders/ToastPortal";
import Toast from "../loaders/Toast";
import DotsLoader from "../loaders/DotsLoaders";

export default function SaveButton({ job_id, className, size="sm" }: { job_id: string, className?: string, size?: "sm" | "md" | "lg" }) {
  const { saveJobId, removeJobId, isJobSaved, savingJobId, removingJobId } =
    useSavedContext();
  const [toastVisible, setToastVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [type, setType] = useState<"success" | "error">("success");

  const saved = isJobSaved(job_id);
  const isLoading = savingJobId === job_id || removingJobId === job_id;

  async function handleSave() {
    const result = await saveJobId(job_id);
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
    const result = await removeJobId(job_id);
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
        icon={saved ? BookmarkCheck : Bookmark}
        className={`w-[100px] bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg ${className}`}
      >
        {!isLoading ? saved ? "Remove" : "Save" : <DotsLoader />}
      </Button>
    </>
  );
}
