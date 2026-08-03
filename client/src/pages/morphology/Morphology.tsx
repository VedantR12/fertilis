import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
    getMorphology,
    createMorphology,
    updateMorphology,
} from "@/api/morphology";

import {
    morphologySchema,
    type MorphologyFormData,
} from "@/lib/schemas/morphology";

import MorphologySection from "@/components/morphology/MorphologySection";
import VitalitySection from "@/components/morphology/VitalitySection";
import AdditionalSection from "@/components/morphology/AdditionalSection";
import CommentsSection from "@/components/morphology/CommentsSection";

export default function Morphology() {
    const { sampleCode } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [morphologyExists, setMorphologyExists] =
        useState(false);

    const {
        control,
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<MorphologyFormData>({
        resolver: zodResolver(morphologySchema),

        mode: "onSubmit",
        reValidateMode: "onSubmit",

        defaultValues: {
            sample_code: sampleCode ?? "",

            normal_forms_percent: 0,
            head_defects_percent: 0,
            midpiece_defects_percent: 0,
            tail_defects_percent: 0,
            pin_heads_percent: 0,

            live_sperm_percent: 0,
            dead_sperm_percent: 0,

            fructose: "",
            aggregation_agglutination: "",

            comments: "",
        },
    });

    useEffect(() => {
        async function loadMorphology() {
            if (!sampleCode) return;

            try {
                const data =
                    await getMorphology(sampleCode);

                reset(data);

                setMorphologyExists(true);
            } catch (error) {
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {
                    setMorphologyExists(false);

                    reset({
                        sample_code: sampleCode ?? "",

                        normal_forms_percent: 0,
                        head_defects_percent: 0,
                        midpiece_defects_percent: 0,
                        tail_defects_percent: 0,
                        pin_heads_percent: 0,

                        live_sperm_percent: 0,
                        dead_sperm_percent: 0,

                        fructose: "",
                        aggregation_agglutination: "",

                        comments: "",
                    });
                } else {
                    console.error(error);
                }
            } finally {
                setLoading(false);
            }
        }

        loadMorphology();
    }, [sampleCode, reset]);

    async function onSubmit(
        data: MorphologyFormData
    ) {
        try {
            if (morphologyExists) {
                await updateMorphology(
                    data.sample_code,
                    data
                );
            } else {
                await createMorphology(data);
                setMorphologyExists(true);
            }

            toast.success(
                "Morphology report saved successfully.",
                {
                    action: {
                        label: "View Report",
                        onClick: () =>
                            navigate(
                                `/admin/samples/${sampleCode}/morphology/report`
                            ),
                    },
                }
            );
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log(error.response?.data);

                toast.error(
                    "Failed to save morphology report."
                );
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
                Morphology
            </h1>

            <div className="space-y-8">

                <MorphologySection
                    register={register}
                    errors={errors}
                />

                <VitalitySection
                    register={register}
                    errors={errors}
                />

                <AdditionalSection
                    control={control}
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

                {morphologyExists && (
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate(
                                `/admin/samples/${sampleCode}/morphology/report`
                            )
                        }
                    >
                        View Report
                    </Button>
                )}

            </div>
        </form>
    );
}