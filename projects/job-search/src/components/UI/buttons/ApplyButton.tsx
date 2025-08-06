"use client";

import Button from "@/components/UI/Button";
import { useState } from "react";
import ConfirmationModal from "@/components/UI/reusable/ConfirmationModal";
import { useSavedContext } from "@/contexts/SavedJobsContext";
import { useRouter } from "next/navigation";

export default function ApplyButton({ jobId }: { jobId: string }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { isApplied, applyForJobId, applyingJobId } = useSavedContext();
  const router = useRouter();

  const alreadyApplied = isApplied(jobId);
  const isApplying = applyingJobId === jobId;

  async function handleClick() {
    try {
      await applyForJobId(jobId);
      setModalOpen(false);
      router.refresh();
      return { success: true };
    } catch (error) {
      setModalOpen(false);
      console.error("Error applying for job:", error);
      return { success: false };
    }
  }

  return (
    <>
      {modalOpen && (
        <ConfirmationModal
          onCancel={() => setModalOpen(false)}
          onConfirm={handleClick}
        />
      )}
      <Button
        variant="primary"
        size="lg"
        disabled={alreadyApplied || isApplying}
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {isApplying
          ? "Applying..."
          : !alreadyApplied
          ? "Apply Now"
          : "Already Applied"}
      </Button>
    </>
  );
}
