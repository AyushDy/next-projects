import { useState, useTransition } from "react";
import { JobFormData, JobCreateData } from "@/lib/types";
import axios from "axios";

const initialFormData: JobFormData = {
  job_title: "",
  job_description: "",
  job_employment_type: "Full-time",
  job_is_remote: false,
  job_city: "",
  job_location: "",
  job_benefits: "",
  job_salary: "",
  job_min_salary: "",
  job_max_salary: "",
  job_salary_period: "yearly",
  job_qualifications: "",
  job_responsibilities: "",
};

export function useAddJobForm() {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [status, setStatus] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const resetForm = () => setFormData(initialFormData);

  const processData = (data: JobFormData): JobCreateData => ({
    ...data,
    job_benefits: data.job_benefits
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b),
    job_qualifications: data.job_qualifications
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q),
    job_responsibilities: data.job_responsibilities
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r),
    job_salary: data.job_salary ? parseInt(data.job_salary) : null,
    job_min_salary: parseInt(data.job_min_salary),
    job_max_salary: parseInt(data.job_max_salary),    
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await axios.post("/api/companies/jobs", processData(formData));
        const data = response.data;
        if (data.success) {
          resetForm();
          setStatus("Job added successfully!");
        } else {
          setStatus(data.message || "Failed to add job");
        }
      } catch (error) {
        console.error("Error adding job:", error);
        alert(
          `Error adding job: ${
            error instanceof Error ? error.message : "Unknown error"
          }`
        );
      }
    });
  };

  return {
    formData,
    status,
    isPending,
    handleInputChange,
    handleSubmit,
  };
}
