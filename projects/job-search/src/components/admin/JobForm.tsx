"use client";

import DotsLoader from "../UI/loaders/DotsLoaders";
import FormSection from "./reusables/FormSection";
import FormSectionBuilder from "./reusables/FormSectionBuilder";
import { FORM_FIELDS } from "./constants/formFields";

export default function JobForm({formData, status, isPending, handleInputChange, handleSubmit, action="add"}:{
  formData: any;
  status: string;
  isPending: boolean;
  handleInputChange: (e: React.ChangeEvent<any>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  action: "add" | "edit";
}) {
  
  return (
    <div className="space-y-6 ">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {action === "add" ? "Add New Job" : "Edit Your Job Details"}
        </h2>
        <p className="text-muted-foreground">
          {action === "add" ? "Fill out the form below to add a new job listing" : "Edit out the form below to edit your job listing"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormSection title="Basic Information">
          <FormSectionBuilder
            fields={FORM_FIELDS.basic}
            formData={formData}
            onChange={handleInputChange}
            gridCols="grid-cols-1 md:grid-cols-2"
          />
        </FormSection>

        <FormSection title="Job Details">
          <div className="space-y-4">
            <FormSectionBuilder
              fields={[FORM_FIELDS.details[0]]}
              formData={formData}
              onChange={handleInputChange}
            />
            <FormSectionBuilder
              fields={FORM_FIELDS.details.slice(1, 4)}
              formData={formData}
              onChange={handleInputChange}
              gridCols="grid-cols-1 md:grid-cols-3"
            />
            <FormSectionBuilder
              fields={[FORM_FIELDS.details[4]]}
              formData={formData}
              onChange={handleInputChange}
            />
          </div>
        </FormSection>

        <FormSection title="Salary Information">
          <FormSectionBuilder
            fields={FORM_FIELDS.salary}
            formData={formData}
            onChange={handleInputChange}
            gridCols="grid-cols-1 md:grid-cols-4"
          />
        </FormSection>

        <FormSection title="Additional Details">
          <FormSectionBuilder
            fields={FORM_FIELDS.additional}
            formData={formData}
            onChange={handleInputChange}
          />
        </FormSection>

        <div className="py-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full md:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-md transition-all duration-300 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? <DotsLoader /> : action === "add" ? "Add Job" : "Update Job"}
          </button>
        </div>

        {status && <div className="text-sm text-foreground mt-4">{status}</div>}
      </form>
    </div>
  );
}
