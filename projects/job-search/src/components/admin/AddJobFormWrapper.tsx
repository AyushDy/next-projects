"use client";

import { useAddJobForm } from "./hooks/useJobForm";
import JobForm from "./JobForm";

export default function AddJobFormWrapper() {
  const { formData, status, isPending, handleInputChange, handleSubmit } =
    useAddJobForm();

  return (
    <div className="space-y-6">
      <JobForm
        action="add"
        formData={formData}
        status={status}
        isPending={isPending}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
