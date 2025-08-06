"use client";

import Button from "@/components/UI/Button";
import { useState } from "react";
import ApplicantList from "../ApplicantList";

export default function ShowApplicantsButton({
  job_id,
  job_title,
}: {
  job_id: string;
  job_title: string;
}) {
  const [showApplicants, setShowApplicants] = useState(false);

  return (
    <>
      <Button onClick={() => setShowApplicants(true)}>View Applicants</Button>
      <ApplicantList
        jobId={job_id}
        jobTitle={job_title}
        isOpen={showApplicants}
        onClose={() => setShowApplicants(false)}
      />
    </>
  );
}
