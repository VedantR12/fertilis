import api from "@/services/api";

import type {
    DFI,
    DFIFormData,
} from "@/lib/schemas/dfi";

export async function getDFI(
    sampleCode: string
): Promise<DFI> {

    const response = await api.get(
        `/dfis/${sampleCode}`
    );

    return response.data;
}

export async function createDFI(
    data: DFIFormData
): Promise<DFI> {

    const response = await api.post(
        "/dfis",
        data
    );

    return response.data;
}

export async function updateDFI(
    sampleCode: string,
    data: DFIFormData
): Promise<DFI> {

    const response = await api.patch(
        `/dfis/${sampleCode}`,
        data
    );

    return response.data;
}