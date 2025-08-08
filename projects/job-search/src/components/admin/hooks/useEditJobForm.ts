import { useEffect, useState, useTransition } from "react";
import { JobFormData, JobCreateData } from "@/lib/types";
import { AuthContextType, useAuthContext } from "@/contexts/AuthContext";
import { getJobById } from "@/lib/utils";
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

export function useEditJobForm({ jobId }: { jobId?: string }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<JobFormData>(initialFormData);
  const [status, setStatus] = useState("");

  useEffect(() => {
    async function fetchJobData() {
      if (!jobId?.trim()) return;
      try {
        const response = await getJobById(jobId);
        if (response.success && response.data) {
          setFormData({
            title: response.data.data.title,
            description: response.data.data.description,
            employmentType: response.data.data.employmentType,
            isRemote: response.data.data.isRemote === "true",
            city: response.data.data.city,
            location: response.data.data.location,
            benefits: response.data.data.benefits.join(","),
            minSalary: response.data.data.minSalary.toString(),
            maxSalary: response.data.data.maxSalary.toString(),
            salaryPeriod: response.data.data.salaryPeriod,
            qualifications: response.data.data.qualifications.join(","),
            responsibilities: response.data.data.responsibilities.join(","),
          });
          setStatus("Job data loaded successfully");
        } else {
          setStatus("Failed to load job data");
        }
      } catch (error) {
        setFormData(initialFormData);
      }
    }
    fetchJobData();
  }, [jobId]);

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
