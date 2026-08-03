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

    nonFragmentedPercent: string;

    fragmentedPercent: string;
}

export default function FragmentationSection({
    register,
    errors,
    total,
    nonFragmentedPercent,
    fragmentedPercent,
}: Props) {

    return (

        <FieldSet>

            <FieldLegend>
                DNA Fragmentation
            </FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>

                    <FieldLabel>
                        Non Fragmented Count
                    </FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("non_fragmented_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.non_fragmented_count]}
                    />

                </Field>

                <Field>

                    <FieldLabel>
                        Fragmented Count
                    </FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("fragmented_count", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.fragmented_count]}
                    />

                </Field>

            </FieldGroup>
            <div className="mt-6 rounded-lg border p-4 bg-muted/30 space-y-2">

                <div className="flex justify-between">
                    <span>Total Cells Counted</span>
                    <span className="font-semibold">{total}</span>
                </div>

                <div className="flex justify-between">
                    <span>Non Fragmented</span>
                    <span>{nonFragmentedPercent}%</span>
                </div>

                <div className="flex justify-between">
                    <span>Fragmented</span>
                    <span>{fragmentedPercent}%</span>
                </div>

            </div>

        </FieldSet>

    );

}