import type {
    Control,
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import type { SemenAnalysisFormData } from "@/lib/schemas/semen_analysis";

import { Input } from "@/components/ui/input";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";

interface Props {
    control: Control<SemenAnalysisFormData>;
    register: UseFormRegister<SemenAnalysisFormData>;
    errors: FieldErrors<SemenAnalysisFormData>;
}

export default function MotilityMorphologySection({
    register,
    errors,
}: Props) {
    return (
        <>
            <FieldSet>
                <FieldLegend>Motility</FieldLegend>

                <FieldGroup className="grid gap-4 md:grid-cols-2">

                    <Field>
                        <FieldLabel>Total Motility (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("total_motility_percent", {
                                valueAsNumber: true,
                            })}
                        />
                        <FieldError errors={[errors.total_motility_percent]} />
                    </Field>

                    <Field>
                        <FieldLabel>Progressive Motility (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("progressive_motility_percent", {
                                valueAsNumber: true,
                            })}
                        />
                        <FieldError errors={[errors.progressive_motility_percent]} />
                    </Field>

                    <Field>
                        <FieldLabel>Rapid Progressive (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("rapid_progressive_percent", {
                                valueAsNumber: true,
                            })}
                        />
                        <FieldError errors={[errors.rapid_progressive_percent]} />
                    </Field>

                    <Field>
                        <FieldLabel>Slow Progressive (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("slow_progressive_percent", {
                                valueAsNumber: true,
                            })}
                        />
                        <FieldError errors={[errors.slow_progressive_percent]} />
                    </Field>

                    <Field>
                        <FieldLabel>Non Progressive (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("non_progressive_percent", {
                                valueAsNumber: true,
                            })}
                        />
                        <FieldError errors={[errors.non_progressive_percent]} />
                    </Field>

                    <Field>
                        <FieldLabel>Immotile (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("immotile_percent", {
                                valueAsNumber: true,
                            })}
                        />
                        <FieldError errors={[errors.immotile_percent]} />
                    </Field>

                </FieldGroup>
            </FieldSet>

            <FieldSet className="mt-8">
                <FieldLegend>Morphology</FieldLegend>

                <FieldGroup className="grid gap-4 md:grid-cols-2">

                    <Field>
                        <FieldLabel>Normal Forms (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("morphology_normal_percent", {
                                setValueAs: (value) =>
                                    value === ""
                                        ? undefined
                                        : Number(value),
                            })}
                        />
                        <FieldError errors={[errors.morphology_normal_percent]} />
                    </Field>

                    <Field>
                        <FieldLabel>Abnormal Forms (%)</FieldLabel>
                        <Input
                            type="number"
                            step="0.1"
                            {...register("morphology_abnormal_percent", {
                                setValueAs: (value) =>
                                    value === ""
                                        ? undefined
                                        : Number(value),
                            })}
                        />
                        <FieldError errors={[errors.morphology_abnormal_percent]} />
                    </Field>

                </FieldGroup>
            </FieldSet>
        </>
    );
}