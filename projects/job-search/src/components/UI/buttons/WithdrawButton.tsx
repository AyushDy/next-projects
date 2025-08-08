"use client";

import Button from "@/components/UI/Button";
import { useState } from "react";

import { JobWithTime } from "@/lib/types";
import { useAppliedContext } from "@/contexts/AppliedJobsContext";
import ConfirmationModal from "../modals/ConfirmationModal";
import { withdrawApplicationFromDB } from "@/lib/job-actions/appy-actions/utils";

export default function WithdrawButton({ job }: { job: JobWithTime }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { withdrawApplication } = useAppliedContext();


  return (
    <>
      {modalOpen && (
        <ConfirmationModal
          text="Are you sure you want to withdraw for this job?"
          onCancel={() => setModalOpen(false)}
          onConfirm={() => withdrawApplication(job.id)}
        />
      )}
      <Button
        variant="primary"
        size="lg"
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {"Withdraw"}
      </Button> 
    </>
  );
}
