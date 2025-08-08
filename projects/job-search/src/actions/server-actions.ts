"use server";

import { jobEntries } from "@/data/data";
import { getCompanyById } from "@/lib/company/utils";
import { getCurrentUser } from "@/lib/jwt";
import db from "@/lib/prisma";
import { getJobById } from "@/lib/utils";
import axios from "axios";

export async function getJobWithPermissions(companyId: string, jobId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }
  const [companyRes, jobRes] = await Promise.all([
    getCompanyById(companyId),
    getJobById(jobId),
  ]);
  const company = companyRes?.data;
  const job = jobRes?.data?.data;

  const hasPermission =
    company?.ownerId === user.id && job?.companyId === company.id;

  if (user.role === "admin") {
    return { hasPermission: true, user, company, job, isAdmin: true };
  }

  if (!hasPermission) {
    return {
      success: false,
      message: "You do not have permission to access this job",
    };
  }

  return { hasPermission, user, company, job, isAdmin: false };
}

// Old job type (with postedAt)
type OldJobType = {
  title: string;
  employerName: string;
  employerLogo: string;
  publisher: string;
  description: string;
  employmentType: string;
  isRemote: boolean | string;
  postedAt: string;
  city: string;
  location: string;
  benefits: string[];
  salary: number;
  minSalary: number;
  maxSalary: number;
  salaryPeriod: string;
  qualifications: string[];
  responsibilities: string[];
};

// New job type (current schema)
type JobType = {
  title: string;
  employerName: string;
  employerLogo: string;
  publisher: string;
  description: string;
  employmentType: string;
  isRemote: boolean;
  city: string;
  location: string;
  benefits: string[];
  salary: number;
  minSalary: number;
  maxSalary: number;
  salaryPeriod: string;
  qualifications: string[];
  responsibilities: string[];
};

function mapOldJobToNew(oldJob: OldJobType): JobType {
  let isRemote: boolean;

  if (typeof oldJob.isRemote === "boolean") {
    isRemote = oldJob.isRemote;
  } else if (typeof oldJob.isRemote === "string") {
    const remoteStr = oldJob.isRemote.toLowerCase().trim();
    isRemote =
      remoteStr === "remote" ||
      remoteStr === "yes" ||
      remoteStr === "true" ||
      remoteStr === "1";
  } else {
    isRemote = false;
  }

  return {
    title: oldJob.title,
    employerName: oldJob.employerName,
    employerLogo: oldJob.employerLogo,
    publisher: oldJob.publisher,
    description: oldJob.description,
    employmentType: oldJob.employmentType,
    isRemote: isRemote,
    city: oldJob.city,
    location: oldJob.location,
    benefits: oldJob.benefits,
    salary: oldJob.salary,
    minSalary: oldJob.minSalary,
    maxSalary: oldJob.maxSalary,
    salaryPeriod: oldJob.salaryPeriod,
    qualifications: oldJob.qualifications,
    responsibilities: oldJob.responsibilities,
  };
}

