/**
 * Zod validation schemas for all API inputs.
 * All user input is validated server-side before processing.
 */
import { z } from "zod";

// ─── Auth Schemas ─────────────────────────────────────────────────────────────

export const EmailPasswordLoginSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
  password: z.string().min(1, "Password is required"),
});

export const OtpRequestSchema = z.object({
  phone: z
    .string()
    .regex(/^\+[1-9]\d{6,14}$/, "Phone must be in E.164 format (e.g., +919876543210)")
    .trim(),
});

export const OtpVerifySchema = z.object({
  phone: z
    .string()
    .regex(/^\+[1-9]\d{6,14}$/, "Invalid phone number format")
    .trim(),
  otp: z
    .string()
    .length(6, "OTP must be exactly 6 digits")
    .regex(/^\d{6}$/, "OTP must contain only digits"),
});

export const TotpVerifySchema = z.object({
  code: z
    .string()
    .length(6, "TOTP code must be 6 digits")
    .regex(/^\d{6}$/, "TOTP code must contain only digits"),
});

export const RecoveryCodeSchema = z.object({
  code: z
    .string()
    .length(10, "Recovery code must be 10 characters")
    .regex(/^[A-Z2-9]{10}$/, "Invalid recovery code format")
    .toUpperCase(),
});

export const PasswordResetRequestSchema = z.object({
  email: z.string().email("Invalid email address").toLowerCase().trim(),
});

export const PasswordResetSchema = z
  .object({
    token: z.string().min(1),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// ─── User Management Schemas ──────────────────────────────────────────────────

export const CreateUserSchema = z.object({
  email: z.string().email().toLowerCase().trim().optional(),
  phone: z
    .string()
    .regex(/^\+[1-9]\d{6,14}$/)
    .trim()
    .optional(),
  role: z.enum(["ADMIN", "TEACHER", "STUDENT"]),
  firstName: z.string().min(1).max(50).trim(),
  lastName: z.string().min(1).max(50).trim(),
  password: z
    .string()
    .min(8)
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/)
    .optional(),
}).refine((data) => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email"],
});

export const UpdateStudentProfileSchema = z.object({
  firstName: z.string().min(1).max(50).trim().optional(),
  lastName: z.string().min(1).max(50).trim().optional(),
  dateOfBirth: z.string().datetime().optional().nullable(),
  address: z.string().max(500).trim().optional().nullable(),
  parentName: z.string().max(100).trim().optional().nullable(),
  parentPhone: z
    .string()
    .regex(/^\+[1-9]\d{6,14}$/)
    .optional()
    .nullable(),
});

// ─── Course Schemas ───────────────────────────────────────────────────────────

export const CreateCourseSchema = z.object({
  title: z.string().min(1).max(200).trim(),
  slug: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")
    .trim(),
  description: z.string().max(5000).trim().optional(),
  shortDesc: z.string().max(300).trim().optional(),
  duration: z.string().max(100).trim().optional(),
  fees: z.number().nonnegative().optional(),
  isPublished: z.boolean().default(false),
});

// ─── Admission Enquiry Schema ─────────────────────────────────────────────────

export const AdmissionEnquirySchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase().trim().optional().or(z.literal("")),
  phone: z
    .string()
    .regex(/^\+?[0-9]{7,15}$/, "Invalid phone number")
    .trim(),
  courseInterest: z.string().max(200).trim().optional(),
  message: z.string().max(1000).trim().optional(),
});

// ─── Contact Schema ───────────────────────────────────────────────────────────

export const ContactSchema = z.object({
  name: z.string().min(1).max(100).trim(),
  email: z.string().email().toLowerCase().trim(),
  subject: z.string().min(1).max(200).trim(),
  message: z.string().min(10).max(2000).trim(),
});
