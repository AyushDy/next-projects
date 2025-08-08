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

export const employmentTypeS = [
  { value: "Full-time", label: "Full Time" },
  { value: "Part-time", label: "Part Time" },
  { value: "Contract", label: "Contract" },
  { value: "Internship", label: "Internship" },
  { value: "Freelance", label: "Freelance" },
];

export const salaryPeriodS = [
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
      name: "title" as keyof JobFormData,
      label: "Job Title",
      required: true,
      placeholder: "e.g. Senior Software Engineer",
    },
  ],
  details: [
    {
      name: "description" as keyof JobFormData,
      label: "Job Description",
      type: "textarea",
      required: true,
      rows: 6,
      placeholder:
        "Describe the job role, requirements, and what the candidate will be doing...",
    },
    {
      name: "employmentType" as keyof JobFormData,
      label: "Employment Type",
      type: "select",
      required: true,
      options: employmentTypeS,
    },
    {
      name: "city" as keyof JobFormData,
      label: "City",
      required: true,
      placeholder: "e.g. San Francisco",
    },
    {
      name: "location" as keyof JobFormData,
      label: "Full Location",
      required: true,
      placeholder: "e.g. San Francisco, CA, USA",
    },
    {
      name: "isRemote" as keyof JobFormData,
      label: "Remote Work Available",
      type: "checkbox",
    },
  ],
  salary: [
    {
      name: "minSalary" as keyof JobFormData,
      label: "Min Salary",
      type: "number",
      required: true,
      placeholder: "80000",
    },
    {
      name: "maxSalary" as keyof JobFormData,
      label: "Max Salary",
      type: "number",
      required: true,
      placeholder: "150000",
    },
    {
      name: "salaryPeriod" as keyof JobFormData,
      label: "Salary Period",
      type: "select",
      required: true,
      options: salaryPeriodS,
    },
  ],
  additional: [
    {
      name: "benefits" as keyof JobFormData,
      label: "Benefits (comma-separated)",
      type: "textarea",
      rows: 3,
      placeholder: "Health Insurance, 401k, Flexible Hours, Remote Work",
    },
    {
      name: "qualifications" as keyof JobFormData,
      label: "Required Qualifications (comma-separated)",
      type: "textarea",
      required: true,
      rows: 3,
      placeholder: "Bachelor's degree, 5+ years experience, JavaScript, React",
    },
    {
      name: "responsibilities" as keyof JobFormData,
      label: "Key Responsibilities (comma-separated)",
      type: "textarea",
      required: true,
      rows: 3,
      placeholder: "Develop web applications, Lead team projects, Code reviews",
    },
  ],
};
