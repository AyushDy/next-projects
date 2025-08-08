import { useState, useTransition } from "react";
import { JobFormData, JobCreateData } from "@/lib/types";
import axios from "axios";

const initialFormData: JobFormData = {
  title: "",
  description: "",
  employmentType: "Full-time",
  isRemote: false,
  city: "",
  location: "",
  benefits: "",
  minSalary: "",
  maxSalary: "",
  salaryPeriod: "yearly",
  qualifications: "",
  responsibilities: "",
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
    benefits: data.benefits
      .split(",")
      .map((b) => b.trim())
      .filter((b) => b),
    qualifications: data.qualifications
      .split(",")
      .map((q) => q.trim())
      .filter((q) => q),
    responsibilities: data.responsibilities
      .split(",")
      .map((r) => r.trim())
      .filter((r) => r),
    minSalary: parseInt(data.minSalary),
    maxSalary: parseInt(data.maxSalary),
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const response = await axios.post(
          "/api/companies/jobs",
          processData(formData)
        );
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
