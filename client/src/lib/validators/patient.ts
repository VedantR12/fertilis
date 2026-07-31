import { z } from "zod";

export const patientSchema = z.object({
    first_name: z.string().min(1, "First name is required").max(100),

    last_name: z.string().max(100).optional().or(z.literal("")),

    age: z.coerce.number().min(0).max(120),

    phone: z.string().max(15).optional().or(z.literal("")),

    doctor: z.string().max(150).optional().or(z.literal("")),
});

export type PatientFormValues = z.infer<typeof patientSchema>;