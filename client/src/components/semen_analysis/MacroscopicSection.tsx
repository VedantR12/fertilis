import {
    Controller,
    type Control,
    type FieldErrors,
    type UseFormRegister,
} from "react-hook-form";
import type { SemenAnalysisFormData } from "@/lib/schemas/semen_analysis";
import {
    APPEARANCES,
    VISCOSITIES,
} from "@/lib/constants/semen_analysis";
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
    control: Control<SemenAnalysisFormData>;
    register: UseFormRegister<SemenAnalysisFormData>;
    errors: FieldErrors<SemenAnalysisFormData>;
}

export default function MacroscopicSection({
    control,
    register,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>
                Macroscopic Examination
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

                    <FieldError
                        errors={[errors.volume_ml]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Appearance</FieldLabel>

                    <Controller
                        control={control}
                        name="appearance"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select appearance" />
                                </SelectTrigger>

                                <SelectContent>
                                    {APPEARANCES.map((item) => (
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
                        errors={[errors.appearance]}
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

                    <FieldError
                        errors={[errors.ph]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Viscosity</FieldLabel>

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
                    <FieldLabel>
                        Liquefaction Time (minutes)
                    </FieldLabel>

                    <Input
                        type="number"
                        {...register(
                            "liquefaction_minutes",
                            {
                                valueAsNumber: true,
                            }
                        )}
                    />

                    <FieldError
                        errors={[
                            errors.liquefaction_minutes,
                        ]}
                    />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}