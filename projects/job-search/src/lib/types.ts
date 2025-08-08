export type employmentType =
  | "Full-time"
  | "Part-time"
  | "Contract"
  | "Internship";

export type JobData = {
  id: string;
  title: string;
  employerName: string;
  employerLogo: string | null;
  description: string;
  employmentType: employmentType;
  isRemote: boolean;
  city: string;
  location: string;
  benefits: string[];
  salary: number | null;
  minSalary: number;
  maxSalary: number;
  salaryPeriod: string;
  qualifications: string[];
  responsibilities: string[];
  companyId: string;
};

export type UserWithpassword = {
  id: string;
  logo?: string | undefined;
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
  companyId: string;
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
  title: string;
  employerName: string;
  employerLogo: string | null;
  description: string;
  employmentType: string;
  isRemote: boolean;
  city: string;
  location: string;
  benefits: string[];
  salary: number | null;
  minSalary: number;
  maxSalary: number;
  salaryPeriod: string;
  qualifications: string[];
  responsibilities: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type JobWithTime = {
  id: string;
  title: string;
  description: string;
  employerName: string;
  employerLogo: string;
  employmentType: string;
  isRemote: boolean;
  city: string;
  location: string;
  benefits: string[];
  minSalary: number;
  maxSalary: number;
  salaryPeriod: string;
  qualifications: string[];
  responsibilities: string[];
  postedAt: string;
  companyId: string;
  company?: any;
};

export type JobFormData = {
  title: string;
  description: string;
  employmentType: string;
  isRemote: boolean;
  city: string;
  benefits: string;
  location: string;
  minSalary: string;
  maxSalary: string;
  salaryPeriod: string;
  qualifications: string;
  responsibilities: string;
};

export type JobCreateData = {
  title: string;
  description: string;
  employmentType: string;
  isRemote: boolean;
  city: string;
  location: string;
  benefits: string[];
  minSalary: number;
  maxSalary: number;
  salaryPeriod: string;
  qualifications: string[];
  responsibilities: string[];
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
  jobs: any[];
  ownerId: string;
};
