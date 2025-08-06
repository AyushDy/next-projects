import { useEffect, useState, useTransition } from "react";
import { JobFormData, JobCreateData } from "@/lib/types";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { getJobById } from "@/lib/utils";
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

export function useEditJobForm({ jobId }: { jobId?: string }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchJobData() {
      if (!jobId?.trim()) return;
      try {
        const response = await getJobById(jobId);
        console.log("Fetched job data:", response);
        if (response.success && response.data) {
          setFormData({
            job_title: response.data.data.job_title,
            job_description: response.data.data.job_description,
            job_employment_type: response.data.data.job_employment_type,
            job_is_remote: response.data.data.job_is_remote === "true",
            job_city: response.data.data.job_city,
            job_location: response.data.data.job_location,
            job_benefits: response.data.data.job_benefits.join(", "),
            job_salary: response.data.data.job_salary?.toString() || "",
            job_min_salary: response.data.data.job_min_salary.toString(),
            job_max_salary: response.data.data.job_max_salary.toString(),
            job_salary_period: response.data.data.job_salary_period,
            job_qualifications: response.data.data.job_qualifications.join(", "),
            job_responsibilities: response.data.data.job_responsibilities.join(", "),
          });
        } else {
          setStatus("Failed to load job data");
        }
      } catch(error) {
        setFormData(initialFormData)
      }
    }
    fetchJobData();
  },[jobId]);

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
        const response = await axios.patch(
          `/api/companies/jobs/${jobId}`,
          processData(formData)
        );
        const data = await response.data;

        if (data.success) {
          resetForm();
          setStatus("Job updated successfully!");
        } else {
          setStatus(data.message || "Failed to update job");
        }
      } catch (error) {
        console.error("Error updating job:", error);
        alert(
          `Error updating job: ${
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
