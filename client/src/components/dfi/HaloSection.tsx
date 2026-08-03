import type {
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import type { DFIFormData } from "@/lib/schemas/dfi";

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
    register: UseFormRegister<DFIFormData>;
    errors: FieldErrors<DFIFormData>;

    total: number;

    largeHaloPercent: string;
    mediumHaloPercent: string;
    smallHaloPercent: string;
    noHaloPercent: string;
    degradedPercent: string;
}

export default function HaloSection({
    register,
    errors,
    total,
    largeHaloPercent,
    mediumHaloPercent,
    smallHaloPercent,
    noHaloPercent,
    degradedPercent,
}: Props) {

    return (

        <FieldSet>

            <FieldLegend>
                Halo Classification
            </FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>
                    <FieldLabel>Large Halo Count</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("large_halo_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.large_halo_count]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Medium Halo Count</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("medium_halo_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.medium_halo_count]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Small Halo Count</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("small_halo_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.small_halo_count]}
                    />
                </Field>

                <Field>
                    <FieldLabel>No Halo Count</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("no_halo_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.no_halo_count]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Degraded Count</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("degraded_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.degraded_count]}
                    />
                </Field>

            </FieldGroup>

            <div className="mt-6 rounded-lg border p-4 bg-muted/30 space-y-2">

                <div className="flex justify-between">
                    <span>Total Cells Counted</span>
                    <span className="font-semibold">{total}</span>
                </div>

                <div className="flex justify-between">
                    <span>Large Halo</span>
                    <span>{largeHaloPercent}%</span>
                </div>

                <div className="flex justify-between">
                    <span>Medium Halo</span>
                    <span>{mediumHaloPercent}%</span>
                </div>

                <div className="flex justify-between">
                    <span>Small Halo</span>
                    <span>{smallHaloPercent}%</span>
                </div>

                <div className="flex justify-between">
                    <span>No Halo</span>
                    <span>{noHaloPercent}%</span>
                </div>

                <div className="flex justify-between">
                    <span>Degraded</span>
                    <span>{degradedPercent}%</span>
                </div>

            </div>

        </FieldSet>

    );

}