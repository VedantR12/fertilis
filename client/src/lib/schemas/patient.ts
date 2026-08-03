import { z } from "zod";

export const patientSchema = z.object({
  first_name: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(100),

  last_name: z
    .string()
    .trim()
    .max(100)
    .optional()
    .or(z.literal("")),

  age: z.preprocess(
  (value) => value === "" ? undefined : Number(value),
  z.number()
    .int()
    .min(0)
    .max(120)
),

  phone: z
    .string()
    .trim()
    .max(15)
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(120)
    .optional()
    .or(z.literal("")),

  doctor: z
    .string()
    .trim()
    .max(150)
    .optional()
    .or(z.literal("")),
});

export type PatientFormData = z.infer<typeof patientSchema>;

export interface Patient {
    id: number;
    patient_code: string;
    first_name: string;
    last_name?: string;
    age: number;
    phone?: string | null;
    address?: string | null;
    doctor?: string | null;
}