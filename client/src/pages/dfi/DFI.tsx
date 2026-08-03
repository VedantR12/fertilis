import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import {
    getDFI,
    createDFI,
    updateDFI,
} from "@/api/dfi";

import {
    dfiSchema,
    type DFIFormData,
} from "@/lib/schemas/dfi";

import { toast } from "sonner";

import GeneralSection from "@/components/dfi/GeneralSection";
import FragmentationSection from "@/components/dfi/FragmentationSection";
import HaloSection from "@/components/dfi/HaloSection";
import CommentsSection from "@/components/dfi/CommentsSection";

export default function DFI() {

    const { sampleCode } = useParams();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [dfiExists, setDFIExists] =
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
    } = useForm<DFIFormData>({
        resolver: zodResolver(dfiSchema),

        mode: "onSubmit",

        reValidateMode: "onSubmit",

        defaultValues: {

            sample_code: sampleCode ?? "",

            volume_ml: 0,

            liquefaction_minutes: 0,

            viscosity: "",

            ph: 7.2,

            sperm_concentration_raw: 0,

            non_fragmented_count: 0,

            fragmented_count: 0,

            large_halo_count: 0,

            medium_halo_count: 0,

            small_halo_count: 0,

            no_halo_count: 0,

            degraded_count: 0,

            remarks: "",
        },
    });

    const nonFragmented =
        watch("non_fragmented_count") || 0;

    const fragmented =
        watch("fragmented_count") || 0;

    const fragmentationTotal =
        nonFragmented + fragmented;

    const nonFragmentedPercent =
        fragmentationTotal
            ? (
                (nonFragmented /
                    fragmentationTotal) *
                100
            ).toFixed(1)
            : "0.0";

    const fragmentedPercent =
        fragmentationTotal
            ? (
                (fragmented /
                    fragmentationTotal) *
                100
            ).toFixed(1)
            : "0.0";

    const largeHalo =
        watch("large_halo_count") || 0;

    const mediumHalo =
        watch("medium_halo_count") || 0;

    const smallHalo =
        watch("small_halo_count") || 0;

    const noHalo =
        watch("no_halo_count") || 0;

    const degraded =
        watch("degraded_count") || 0;

    const haloTotal =
        largeHalo +
        mediumHalo +
        smallHalo +
        noHalo +
        degraded;

    const largeHaloPercent =
        haloTotal
            ? (
                (largeHalo / haloTotal) *
                100
            ).toFixed(1)
            : "0.0";

    const mediumHaloPercent =
        haloTotal
            ? (
                (mediumHalo / haloTotal) *
                100
            ).toFixed(1)
            : "0.0";

    const smallHaloPercent =
        haloTotal
            ? (
                (smallHalo / haloTotal) *
                100
            ).toFixed(1)
            : "0.0";

    const noHaloPercent =
        haloTotal
            ? (
                (noHalo / haloTotal) *
                100
            ).toFixed(1)
            : "0.0";

    const degradedPercent =
        haloTotal
            ? (
                (degraded / haloTotal) *
                100
            ).toFixed(1)
            : "0.0";

    useEffect(() => {

        async function loadDFI() {

            if (!sampleCode) return;

            try {

                const data =
                    await getDFI(sampleCode);

                reset(data);

                setDFIExists(true);

            }

            catch (error) {

                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 404
                ) {

                    setDFIExists(false);

                    reset({
                        sample_code: sampleCode ?? "",

                        volume_ml: 0,
                        liquefaction_minutes: 0,
                        viscosity: "",
                        ph: 7.2,

                        sperm_concentration_raw: 0,

                        non_fragmented_count: 0,
                        fragmented_count: 0,

                        large_halo_count: 0,
                        medium_halo_count: 0,
                        small_halo_count: 0,
                        no_halo_count: 0,
                        degraded_count: 0,

                        remarks: "",
                    });

                }

                else {

                    console.error(error);

                }

            }

            finally {

                setLoading(false);

            }

        }

        loadDFI();

    }, [sampleCode, reset]);

    async function onSubmit(data: DFIFormData) {
        try {

            if (dfiExists) {

                await updateDFI(
                    data.sample_code,
                    data
                );

            } else {

                console.log("Submitting DFI:", data);
                await createDFI(data);

                setDFIExists(true);

            }

            toast.success("DFI report saved successfully.", {
                action: {
                    label: "View Report",
                    onClick: () =>
                        navigate(
                            `/admin/samples/${sampleCode}/dfi/report`
                        ),
                },
            });

        } catch (error) {

            if (axios.isAxiosError(error)) {

                const detail = error.response?.data?.detail;

                if (Array.isArray(detail)) {

                    toast.error(
                        detail
                            .map(
                                (e: {
                                    loc: (string | number)[];
                                    msg: string;
                                }) =>
                                    `${e.loc[e.loc.length - 1]}: ${e.msg}`
                            )
                            .join("\n")
                    );

                } else {

                    toast.error(detail ?? "Failed to save report.");

                }

            } else {

                console.error(error);

                toast.error("Failed to save report.");

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
                DNA Fragmentation Index (DFI)
            </h1>

            <GeneralSection
                control={control}
                register={register}
                errors={errors}
            />

            <FragmentationSection
                register={register}
                errors={errors}
                total={fragmentationTotal}
                nonFragmentedPercent={nonFragmentedPercent}
                fragmentedPercent={fragmentedPercent}
            />

            <HaloSection
                register={register}
                errors={errors}
                total={haloTotal}
                largeHaloPercent={largeHaloPercent}
                mediumHaloPercent={mediumHaloPercent}
                smallHaloPercent={smallHaloPercent}
                noHaloPercent={noHaloPercent}
                degradedPercent={degradedPercent}
            />

            <CommentsSection
                register={register}
                errors={errors}
            />

            <div className="flex gap-3">

                <Button type="submit">
                    Save Report
                </Button>

                {dfiExists && (

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={() =>
                            navigate(
                                `/admin/samples/${sampleCode}/dfi/report`
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