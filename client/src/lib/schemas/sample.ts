import { z } from "zod";

export const sampleSchema = z.object({
    patient_code: z.string(),

    sample_type: z
        .string()
        .min(1, "Sample type is required")
        .max(50),

    collection_datetime: z.string().min(
        1,
        "Collection date & time is required"
    ),

    abstinence_days: z.preprocess(
        (value) => value === "" ? undefined : Number(value),
        z.number()
            .min(0)
            .max(30)
    ),

    collection_method: z.string().optional(),

    collection_place: z.string().optional(),

    remarks: z.string().optional(),
});

export type SampleFormData = z.infer<typeof sampleSchema>;

export interface Sample {
    id: number;
    sample_code: string;
    patient_code: string;
    sample_type: string;
    collection_datetime: string;
    abstinence_days: number;
    status: string;
    collection_method?: string | null;
    collection_place?: string | null;
    remarks?: string | null;
}