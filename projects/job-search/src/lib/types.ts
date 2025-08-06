export type employmentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";

export type JobData = {
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  job_description: string;
  job_employment_type: employmentType;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number | null;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
  company_id: string;
};

export type UserWithpassword = {
  id: string;
  logo?: string | undefined;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  company_id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type companyType = {
  id: string;
  name: string;
  logo: string | null;
  description: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
};

export type JobPrisma = {
  id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number | null;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type JobWithTime = {
  id: string;
  job_id: string;
  job_title: string;
  employer_name: string;
  employer_logo: string | null;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number | null;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
  job_posted_at: string;
  company_id: string;
};

export type JobFormData = {
  job_title: string;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_benefits: string;
  job_salary: string;
  job_min_salary: string;
  job_max_salary: string;
  job_salary_period: string;
  job_qualifications: string;
  job_responsibilities: string;
};

export type JobCreateData = {
  job_title: string;
  job_description: string;
  job_employment_type: string;
  job_is_remote: boolean;
  job_city: string;
  job_location: string;
  job_benefits: string[];
  job_salary: number | null;
  job_min_salary: number;
  job_max_salary: number;
  job_salary_period: string;
  job_qualifications: string[];
  job_responsibilities: string[];
};

export type ApiResponse<T = any> = {
  success: boolean;
  message?: string;
  data?: T;
};

export type Company = {
  id: string;
  name: string;
  description: string;
  location: string;
  logo: string;
  job: any[];
  ownerId: string;
};
