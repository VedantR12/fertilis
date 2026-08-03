import type {
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import type { MorphologyFormData } from "@/lib/schemas/morphology";

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
    register: UseFormRegister<MorphologyFormData>;
    errors: FieldErrors<MorphologyFormData>;
}

export default function MorphologySection({
    register,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>Morphology Examination</FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>
                    <FieldLabel>Normal Forms (%)</FieldLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("normal_forms_percent", {
                            valueAsNumber: true,
                        })}
                    />
                    <FieldError errors={[errors.normal_forms_percent]} />
                </Field>

                <Field>
                    <FieldLabel>Abnormal Head (%)</FieldLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("head_defects_percent", {
                            valueAsNumber: true,
                        })}
                    />
                    <FieldError errors={[errors.head_defects_percent]} />
                </Field>

                <Field>
                    <FieldLabel>Abnormal Midpiece (%)</FieldLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("midpiece_defects_percent", {
                            valueAsNumber: true,
                        })}
                    />
                    <FieldError errors={[errors.midpiece_defects_percent]} />
                </Field>

                <Field>
                    <FieldLabel>Abnormal Tail (%)</FieldLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("tail_defects_percent", {
                            valueAsNumber: true,
                        })}
                    />
                    <FieldError errors={[errors.tail_defects_percent]} />
                </Field>

                <Field>
                    <FieldLabel>Pin Heads (%)</FieldLabel>
                    <Input
                        type="number"
                        step="0.1"
                        {...register("pin_heads_percent", {
                            valueAsNumber: true,
                        })}
                    />
                    <FieldError errors={[errors.pin_heads_percent]} />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}