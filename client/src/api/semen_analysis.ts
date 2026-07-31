import api from "@/services/api";
import type {
  SemenAnalysis,
  SemenAnalysisFormData,
} from "@/lib/schemas/semen_analysis";

export async function getSemenAnalysis(
  sampleCode: string
): Promise<SemenAnalysis> {
  const response = await api.get(
    `/semen-analyses/${sampleCode}`
  );

  return response.data;
}

export async function createSemenAnalysis(
  data: SemenAnalysisFormData
): Promise<SemenAnalysis> {
  const response = await api.post(
    "/semen-analyses",
    data
  );

  return response.data;
}

export async function updateSemenAnalysis(
  sampleCode: string,
  data: Partial<SemenAnalysisFormData>
): Promise<SemenAnalysis> {
  const response = await api.patch(
    `/semen-analyses/${sampleCode}`,
    data
  );

  return response.data;
}