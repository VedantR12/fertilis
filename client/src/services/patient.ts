import api from "./api";
import type { Patient, PatientListResponse } from "@/types/patient";

interface GetPatientsParams {
    search?: string;
    doctor?: string;
    page?: number;
    limit?: number;
}

export interface CreatePatientData {
    first_name: string;
    last_name: string;
    age: number;
    phone: string;
    doctor: string;
}

export const getPatients = async (
    params: GetPatientsParams = {}
) => {
    const response = await api.get<PatientListResponse>(
        "/patients",
        {
            params,
        }
    );

    return response.data;
};

export const createPatient = async (
    data: CreatePatientData
) => {
    const response = await api.post<Patient>(
        "/patients",
        data
    );

    return response.data;
};