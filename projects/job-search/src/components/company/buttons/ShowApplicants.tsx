"use client";

import Button from "@/components/UI/Button";
import { useState } from "react";
import ApplicantList from "../ApplicantList";

export default function ShowApplicantsButton({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  const [showApplicants, setShowApplicants] = useState(false);

  return (
    <>
      <Button onClick={() => setShowApplicants(true)}>View Applicants</Button>
      <ApplicantList
        jobId={id}
        jobTitle={title}
        isOpen={showApplicants}
        onClose={() => setShowApplicants(false)}
      />
    </>
  );
}
