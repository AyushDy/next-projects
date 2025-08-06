import { User } from "lucide-react";
import { z } from "zod";

export const jobSchema = z
  .object({
    job_title: z.string().trim().min(3, "Job title is required"),
    employer_name: z.string().trim().min(3, "Employer name is required"),
    employer_logo: z.url({ message: "must be a valid url" }),
    job_description: z.string().trim().min(1),
    job_employment_type: z.string().min(1),
    job_is_remote: z.boolean(),
    job_city: z.string().trim().min(1),
    job_location: z.string().trim().min(1),
    job_benefits: z.array(z.string().trim()).optional().default([]),
    job_salary: z.number().nonnegative().nullable().optional(),
    job_min_salary: z
      .number()
      .nonnegative({ message: "Min salary can't be negative" }),
    job_max_salary: z
      .number()
      .nonnegative({ message: "Max salary can't be negative" }),
    job_salary_period: z.string().trim().min(1),
    job_qualifications: z
      .array(z.string().trim())
      .min(1, "At least one qualification"),
    job_responsibilities: z
      .array(z.string().trim())
      .min(1, "At least one responsibility"),
    company_id: z.string().length(24),
  })
  .superRefine((data, ctx) => {
    if (data.job_max_salary < data.job_min_salary) {
      ctx.addIssue({
        path: ["job_max_salary"],
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
  company_id: z.uuid(),
});

export type UserType = z.infer<typeof userSchema>;
export type JobDataType = z.infer<typeof jobSchema>;

export type UserWithIdType = z.infer<typeof userSchemaWithId>;

export const jobSchemaWithId = jobSchema.extend({
  id: z.uuid(),
});

export type JobWithIdType = z.infer<typeof jobSchemaWithId>;

export const updateUserSchema = userSchema.partial();