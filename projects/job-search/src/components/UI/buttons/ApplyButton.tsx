"use client";

import Button from "@/components/UI/Button";
import { useState } from "react";
import ApplyJobModal from "../modals/ApplyJobModal";
import { JobWithTime } from "@/lib/types";
import { useAppliedContext } from "@/contexts/AppliedJobsContext";
import WithdrawButton from "./WithdrawButton";

export default function ApplyButton({ job }: { job: JobWithTime }) {
  const [modalOpen, setModalOpen] = useState(false);
  const { isJobApplied } = useAppliedContext();

  if( isJobApplied(job.id)) {
    return <WithdrawButton job={job} />
  }


  return (
    <>
      {modalOpen && (
        <ApplyJobModal
          job={job}
          onCancel={() => setModalOpen(false)}
        />
      )}
      <Button
        variant="primary"
        size="lg"
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {!isJobApplied(job.id)
          ? "Apply Now"
          : "Applied"}
      </Button>
    </>
  );
}
