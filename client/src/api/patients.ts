import api from "@/services/api";
import type { PatientFormData } from "@/lib/schemas/patient";

export async function createPatient(data: PatientFormData) {
  const response = await api.post("/patients", data);
  return response.data;
}

export async function getPatient(patientCode: string) {
  const response = await api.get(`/patients/${patientCode}`);
  return response.data;
}

export async function updatePatient(
  patientCode: string,
  data: PatientFormData
) {
  const response = await api.put(`/patients/${patientCode}`, data);
  return response.data;
}