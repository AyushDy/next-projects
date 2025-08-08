import { User } from "lucide-react";
import { z } from "zod";

export const jobSchema = z
  .object({
    title: z.string().trim().min(3, "Job title is required"),
    description: z.string().trim().min(1),
    employmentType: z.enum(
      ["Full-time", "Part-time", "Contract", "Internship", "Freelance"],
      {
        message: "Invalid employment type",
      }
    ),
    employerName: z.string().trim().min(1),
    employerLogo: z.string().trim().min(1),
    isRemote: z.boolean(),
    city: z.string().trim().min(1),
    location: z.string().trim().min(1),
    benefits: z.array(z.string().trim()).optional().default([]),
    minSalary: z
      .number()
      .nonnegative({ message: "Min salary can't be negative" }),
    maxSalary: z
      .number()
      .nonnegative({ message: "Max salary can't be negative" }),
    salaryPeriod: z.string().trim().min(1),
    qualifications: z
      .array(z.string().trim())
      .min(1, "At least one qualification"),
    responsibilities: z
      .array(z.string().trim())
      .min(1, "At least one responsibility"),
    companyId: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.maxSalary < data.minSalary) {
      ctx.addIssue({
        path: ["maxSalary"],
        code: z.ZodIssueCode.custom,
        message: "Max salary must be ≥ min salary",
      });
    }
  });

export const userSchema = z.object({
  email: z.email("Invalid email address"),
  username: z.string().min(2).max(100),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "admin"]),
  logo: z.url({ message: "must be a valid url" }).optional(),
});

export const userSchemaWithId = userSchema.extend({
  id: z.uuid(),
  companyId: z.uuid(),
});

export type UserType = z.infer<typeof userSchema>;
export type JobDataType = z.infer<typeof jobSchema>;

export type UserWithIdType = z.infer<typeof userSchemaWithId>;

export const jobSchemaWithId = jobSchema.extend({
  id: z.uuid(),
});

export type JobWithIdType = z.infer<typeof jobSchemaWithId>;

export const updateUserSchema = userSchema.partial();
