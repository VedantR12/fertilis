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

export default function VitalitySection({
    register,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>Vitality</FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>
                    <FieldLabel>Live Sperm (%)</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("live_sperm_percent", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.live_sperm_percent]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Dead Sperm (%)</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("dead_sperm_percent", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.dead_sperm_percent]}
                    />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}