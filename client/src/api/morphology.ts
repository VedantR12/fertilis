import api from "@/services/api";

import type {
    Morphology,
    MorphologyFormData,
} from "@/lib/schemas/morphology";

export async function getMorphology(
    sampleCode: string
): Promise<Morphology> {
    const response = await api.get(
        `/morphologies/${sampleCode}`
    );

    return response.data;
}

export async function createMorphology(
    data: MorphologyFormData
): Promise<Morphology> {
    const response = await api.post(
        "/morphologies",
        data
    );

    return response.data;
}

export async function updateMorphology(
    sampleCode: string,
    data: MorphologyFormData
): Promise<Morphology> {
    const response = await api.patch(
        `/morphologies/${sampleCode}`,
        data
    );

    return response.data;
}