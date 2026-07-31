import api from "@/services/api";

export interface DashboardStats {
    total_patients: number;
    total_samples: number;
}

export async function getDashboardStats() {
    const response = await api.get<DashboardStats>(
        "/dashboard/stats"
    );

    return response.data;
}