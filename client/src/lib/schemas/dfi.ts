import { z } from "zod";

export const dfiSchema = z.object({

    sample_code: z.string(),

    volume_ml: z.number().min(0),

    liquefaction_minutes: z.number().min(0),

    viscosity: z.string().min(1),

    ph: z.number().min(0).max(14),

    sperm_concentration_raw: z.number().min(0),

    non_fragmented_count: z.number().min(0),

    fragmented_count: z.number().min(0),

    large_halo_count: z.number().min(0),

    medium_halo_count: z.number().min(0),

    small_halo_count: z.number().min(0),

    no_halo_count: z.number().min(0),

    degraded_count: z.number().min(0),

    remarks: z.string().optional(),

});

export type DFIFormData =
    z.infer<typeof dfiSchema>;

export type DFI = DFIFormData & {
    id: number;
};