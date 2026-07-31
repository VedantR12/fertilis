import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    getSemenAnalysis,
    createSemenAnalysis,
    updateSemenAnalysis,
} from "@/api/semen_analysis";

import {
    semenAnalysisSchema,
    type SemenAnalysisFormData,
} from "@/lib/schemas/semen_analysis";
import { toast } from "sonner";

import GeneralSection from "@/components/semen_analysis/GeneralSection";
import MacroscopicSection from "@/components/semen_analysis/MacroscopicSection";
import MicroscopicSection from "@/components/semen_analysis/MicroscopicSection";
import MotilityMorphologySection from "@/components/semen_analysis/MotilityMorphologySection";
import CommentsSection from "@/components/semen_analysis/CommentsSection";


export default function SemenAnalysis() {
    const { sampleCode } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [analysisExists, setAnalysisExists] =
        useState(false);

    const {
        control,
        register,
        handleSubmit,
        reset,
        watch,
        formState: {
            errors,
        },
    } = useForm<SemenAnalysisFormData>({
        resolver: zodResolver(semenAnalysisSchema),

        mode: "onSubmit",
        reValidateMode: "onSubmit",

        defaultValues: {
            sample_code: sampleCode ?? "",

            criteria: "",

            volume_ml: 0,
            appearance: "",
            ph: 0.0,
            viscosity: "",
            liquefaction_minutes: 0,

            sperm_concentration_million_ml: 0,
            wbc_concentration_million_ml: 0,
            pus_cells: "",
            debris: "",
            agglutination: "",

            total_motility_percent: 0,
            progressive_motility_percent: 0,
            rapid_progressive_percent: 0,
            slow_progressive_percent: 0,
            non_progressive_percent: 0,
            immotile_percent: 100,

            morphology_normal_percent: 0,
            morphology_abnormal_percent: 100,

            comments: "",
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
                console.log("Error:", error);

                if (axios.isAxiosError(error)) {
                    console.log("Status:", error.response?.status);
                }

                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {
                    setAnalysisExists(false);

                    reset({
                        sample_code: sampleCode ?? "",

                        criteria: "",

                        volume_ml: 0,
                        appearance: "",
                        ph: 7.2,
                        viscosity: "",
                        liquefaction_minutes: 0,

                        sperm_concentration_million_ml: 0,
                        wbc_concentration_million_ml: 0,
                        pus_cells: "",
                        debris: "",
                        agglutination: "",

                        total_motility_percent: 0,
                        progressive_motility_percent: 0,
                        rapid_progressive_percent: 0,
                        slow_progressive_percent: 0,
                        non_progressive_percent: 0,
                        immotile_percent: 100,

                        morphology_normal_percent: 0,
                        morphology_abnormal_percent: 100,

                        comments: "",
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

    async function onSubmit(data: SemenAnalysisFormData) {

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

            toast.success("Report saved successfully.", {
                action: {
                    label: "View Report",
                    onClick: () =>
                        navigate(`/admin/samples/${sampleCode}/report`),
                },
            });

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA:", error.response?.data);

                toast.error("Failed to save report.");
            } else {
                console.error(error);
            }
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



            <div className="space-y-8">

                <GeneralSection
                    control={control}
                    errors={errors}
                />

                <MacroscopicSection
                    control={control}
                    register={register}
                    errors={errors}
                />

                <MicroscopicSection
                    control={control}
                    register={register}
                    errors={errors}
                />

                <MotilityMorphologySection
                    register={register}
                    errors={errors}
                />

                <CommentsSection
                    register={register}
                    errors={errors}
                />

            </div>

            <div className="flex gap-3">
                <Button type="submit">
                    Save Report
                </Button>

                {analysisExists && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate(`/admin/samples/${sampleCode}/report`)
                        }
                    >
                        View Report
                    </Button>
                )}
            </div>
        </form>
    );
}