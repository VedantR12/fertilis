import { z } from "zod";

export const morphologySchema = z.object({
    sample_code: z.string(),

    normal_forms_percent: z.coerce.number().min(0).max(100),

    head_defects_percent: z.coerce.number().min(0).max(100),

    midpiece_defects_percent: z.coerce.number().min(0).max(100),

    tail_defects_percent: z.coerce.number().min(0).max(100),

    pin_heads_percent: z.coerce.number().min(0).max(100),

    live_sperm_percent: z.coerce.number().min(0).max(100),

    dead_sperm_percent: z.coerce.number().min(0).max(100),

    fructose: z.string().min(1).max(20),

    aggregation_agglutination: z.string().min(1).max(20),

    comments: z.string().optional(),
});

export type MorphologyFormData = z.infer<
    typeof morphologySchema
>;

export interface Morphology extends MorphologyFormData {
    id: number;
}