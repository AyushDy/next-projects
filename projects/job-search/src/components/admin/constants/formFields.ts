import { JobFormData } from "@/lib/types";

interface FieldConfig {
  name: keyof JobFormData;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
  options?: { value: string; label: string }[];
}

export const EMPLOYMENT_TYPES = [
  { value: "Full-time", label: "Full Time" },
  { value: "Part-time", label: "Part Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Freelance", label: "Freelance" },
];

export const SALARY_PERIODS = [
  { value: "Yearly", label: "Yearly" },
  { value: "Monthly", label: "Monthly" },
  { value: "Hourly", label: "Hourly" },
];

export const FORM_FIELDS: {
  basic: FieldConfig[];
  details: FieldConfig[];
  salary: FieldConfig[];
  additional: FieldConfig[];
} = {
  basic: [
    {
      name: "job_title" as keyof JobFormData,
      label: "Job Title",
      required: true,
      placeholder: "e.g. Senior Software Engineer",
    },
  ],
  details: [
    {
      name: "job_description" as keyof JobFormData,
      label: "Job Description",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder:
        "Describe the job role, requirements, and what the candidate will be doing...",
    },
    {
      name: "job_employment_type" as keyof JobFormData,
      label: "Employment Type",
      type: "select",
      required: true,
      options: EMPLOYMENT_TYPES,
    },
    {
      name: "job_city" as keyof JobFormData,
      label: "City",
      required: true,
      placeholder: "e.g. San Francisco",
    },
    {
      name: "job_location" as keyof JobFormData,
      label: "Full Location",
      required: true,
      placeholder: "e.g. San Francisco, CA, USA",
    },
    {
      name: "job_is_remote" as keyof JobFormData,
      label: "Remote Work Available",
      type: "checkbox",
    },
  ],
  salary: [
    {
      name: "job_salary" as keyof JobFormData,
      label: "Salary (Optional)",
      type: "number",
      placeholder: "120000",
    },
    {
      name: "job_min_salary" as keyof JobFormData,
      label: "Min Salary",
      type: "number",
      required: true,
      placeholder: "80000",
    },
    {
      name: "job_max_salary" as keyof JobFormData,
      label: "Max Salary",
      type: "number",
      required: true,
      placeholder: "150000",
    },
    {
      name: "job_salary_period" as keyof JobFormData,
      label: "Salary Period",
      type: "select",
      required: true,
      options: SALARY_PERIODS,
    },
  ],
  additional: [
    {
      name: "job_benefits" as keyof JobFormData,
      label: "Benefits (comma-separated)",
      type: "textarea",
      rows: 3,
      placeholder: "Health Insurance, 401k, Flexible Hours, Remote Work",
    },
    {
      name: "job_qualifications" as keyof JobFormData,
      label: "Required Qualifications (comma-separated)",
      type: "textarea",
      required: true,
      rows: 3,
      placeholder: "Bachelor's degree, 5+ years experience, JavaScript, React",
    },
    {
      name: "job_responsibilities" as keyof JobFormData,
      label: "Key Responsibilities (comma-separated)",
      type: "textarea",
      required: true,
      rows: 3,
      placeholder: "Develop web applications, Lead team projects, Code reviews",
    },
  ],
};
