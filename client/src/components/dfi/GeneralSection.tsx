import {
    Controller,
    type Control,
    type FieldErrors,
    type UseFormRegister,
} from "react-hook-form";

import type { DFIFormData } from "@/lib/schemas/dfi";

import { VISCOSITIES } from "@/lib/constants/dfi";

import { Input } from "@/components/ui/input";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    control: Control<DFIFormData>;
    register: UseFormRegister<DFIFormData>;
    errors: FieldErrors<DFIFormData>;
}

export default function GeneralSection({
    control,
    register,
    errors,
}: Props) {
    return (
        <FieldSet>

            <FieldLegend>
                General
            </FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>
                    <FieldLabel>Volume (mL)</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("volume_ml", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError errors={[errors.volume_ml]} />
                </Field>

                <Field>
                    <FieldLabel>Liquefaction Duration (min)</FieldLabel>

                    <Input
                        type="number"
                        {...register("liquefaction_minutes", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.liquefaction_minutes]}
                    />
                </Field>

                <Field>

                    <FieldLabel>
                        Viscosity
                    </FieldLabel>

                    <Controller
                        control={control}
                        name="viscosity"
                        render={({ field }) => (

                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >

                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select viscosity" />
                                </SelectTrigger>

                                <SelectContent>

                                    {VISCOSITIES.map((item) => (

                                        <SelectItem
                                            key={item}
                                            value={item}
                                        >
                                            {item}
                                        </SelectItem>

                                    ))}

                                </SelectContent>

                            </Select>

                        )}
                    />

                    <FieldError
                        errors={[errors.viscosity]}
                    />

                </Field>

                <Field>
                    <FieldLabel>pH</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("ph", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError errors={[errors.ph]} />
                </Field>

                <Field>
                    <FieldLabel>Sperm Concentration (Raw)</FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("sperm_concentration_raw", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.sperm_concentration_raw]}
                    />
                </Field>

            </FieldGroup>

        </FieldSet>
    );
}