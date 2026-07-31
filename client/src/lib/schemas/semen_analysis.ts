import { z } from "zod";

export const semenAnalysisSchema = z.object({
    sample_code: z.string(),

    // -------------------------
    // General
    // -------------------------

    criteria: z.string().min(1).max(30),

    // -------------------------
    // Macroscopic Examination
    // -------------------------

    volume_ml: z.coerce.number().min(0),

    appearance: z.string().min(1).max(30),

    ph: z.coerce.number().min(0).max(14),

    viscosity: z.string().min(1).max(30),

    liquefaction_minutes: z.coerce.number().min(0),

    // -------------------------
    // Microscopic Examination
    // -------------------------

    sperm_concentration_million_ml: z.coerce.number().min(0),

    wbc_concentration_million_ml: z.coerce.number().min(0),

    pus_cells: z.string().min(1).max(20),

    debris: z.string().min(1).max(20),

    agglutination: z.string().min(1).max(20),

    // -------------------------
    // Motility
    // -------------------------

    total_motility_percent: z.coerce.number().min(0).max(100),

    progressive_motility_percent: z.coerce.number().min(0).max(100),

    rapid_progressive_percent: z.coerce.number().min(0).max(100),

    slow_progressive_percent: z.coerce.number().min(0).max(100),

    non_progressive_percent: z.coerce.number().min(0).max(100),

    immotile_percent: z.coerce.number().min(0).max(100),

    // -------------------------
    // Morphology
    // -------------------------

    morphology_normal_percent: z.coerce.number().min(0).max(100),

    morphology_abnormal_percent: z.coerce.number().min(0).max(100),

    // -------------------------
    // Comments
    // -------------------------

    comments: z.string().optional(),
  })


export type SemenAnalysisFormData = z.infer<
  typeof semenAnalysisSchema
>;

export interface SemenAnalysis
  extends SemenAnalysisFormData {
  id: number;
  created_at: string;
  total_sperm_million: number;
  total_motile_sperm_million: number;
  progressive_motile_sperm_million: number;
  morphologically_normal_sperm_million: number;
}