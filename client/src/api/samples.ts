import api from "@/services/api";
import type {
  Sample,
  SampleFormData,
} from "@/lib/schemas/sample";

export async function createSample(data: SampleFormData) {
  const response = await api.post("/samples", data);
  return response.data;
}

export async function getSample(
  sampleCode: string
): Promise<Sample> {
  const response = await api.get(
    `/samples/${sampleCode}`
  );

  return response.data;
}

export async function updateSample(
  sampleCode: string,
  data: Partial<SampleFormData>
) {
  const response = await api.patch(
    `/samples/${sampleCode}`,
    data
  );

  return response.data;
}

export async function getPatientSamples(
  patientCode: string
) {
  const response = await api.get(
    `/patients/${patientCode}/samples`
  );

  return response.data;
}