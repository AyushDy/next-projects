import { z } from "zod";

// MongoDB ObjectId validation
export const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

// Signup validation schema
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  image: z.string().url("Image must be a valid URL").optional(),
});

export const projectSchema = z.object({
  name: z.string().min(2).max(25),
  slug: z.string().min(2).max(25),
  description: z.string().max(500).optional(),
  visibility: z.enum(["PUBLIC", "PRIVATE"]),
  createBoard: z.boolean().optional(),
  createTeam: z.boolean().optional(),
});

export const boardSchema = z.object({
  name: z.string().min(2).max(25),
  description: z.string().max(500).optional(),
  projectId: objectIdSchema,
});