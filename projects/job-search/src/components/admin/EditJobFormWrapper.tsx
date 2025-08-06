"use client";

import { useEditJobForm } from "./hooks/useEditJobForm";
import JobForm from "./JobForm";

export default function EditJobFormWrapper({jobId}: { jobId?: string }) {
  const { formData, status, isPending, handleInputChange, handleSubmit } =
    useEditJobForm({ jobId });

  return (
    <div className="space-y-6">
      <JobForm
        action="edit"
        formData={formData}
        status={status}
        isPending={isPending}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
