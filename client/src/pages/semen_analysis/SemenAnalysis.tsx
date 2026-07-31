import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    getSemenAnalysis,
    createSemenAnalysis,
    updateSemenAnalysis,
} from "@/api/semen_analysis";

import {
    semenAnalysisSchema,
    type SemenAnalysis,
    type SemenAnalysisFormData,
} from "@/lib/schemas/semen_analysis";

import { Button } from "@/components/ui/button";

export default function SemenAnalysis() {
    const { sampleCode } = useParams();

    const [loading, setLoading] = useState(true);
    const [analysisExists, setAnalysisExists] =
        useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<SemenAnalysisFormData>({
        resolver: zodResolver(semenAnalysisSchema),
        defaultValues: {
            sample_code: sampleCode ?? "",
            volume_ml: 0,
            ph: 7.2,
            concentration_million_ml: 0,
            total_motility_percent: 0,
            progressive_motility_percent: 0,
            morphology_percent: 0,
            vitality_percent: 0,
            wbc_million_ml: 0,
            liquefaction_minutes: 0,
            viscosity: "",
            appearance: "",
        },
    });

    useEffect(() => {
        async function loadAnalysis() {
            if (!sampleCode) return;

            try {
                const data = await getSemenAnalysis(sampleCode);

                reset(data);

                setAnalysisExists(true);
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {
                    setAnalysisExists(false);

                    reset({
                        sample_code: sampleCode,
                        volume_ml: 0,
                        ph: 7.2,
                        concentration_million_ml: 0,
                        total_motility_percent: 0,
                        progressive_motility_percent: 0,
                        morphology_percent: 0,
                        vitality_percent: 0,
                        wbc_million_ml: 0,
                        liquefaction_minutes: 0,
                        viscosity: "",
                        appearance: "",
                    });
                } else {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        }

        loadAnalysis();
    }, [sampleCode, reset]);

    async function onSubmit(
        data: SemenAnalysisFormData
    ) {
        try {
            if (analysisExists) {
                await updateSemenAnalysis(
                    data.sample_code,
                    data
                );
            } else {
                await createSemenAnalysis(data);
                setAnalysisExists(true);
            }

            alert("Saved successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to save.");
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <h1 className="text-3xl font-bold">
                Semen Analysis
            </h1>

            <p>
                Form will go here.
            </p>

            <Button
                type="submit"
                disabled={isSubmitting}
            >
                {analysisExists ? "Update" : "Save"}
            </Button>
        </form>
    );
}