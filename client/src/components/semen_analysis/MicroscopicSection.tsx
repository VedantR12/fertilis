import {
    Controller,
    type Control,
    type FieldErrors,
    type UseFormRegister,
} from "react-hook-form";

import type { SemenAnalysisFormData } from "@/lib/schemas/semen_analysis";

import {
    AGGLUTINATION,
    DEBRIS,
    PUS_CELLS,
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

export default function MicroscopicSection({
    control,
    register,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>
                Microscopic Examination
            </FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>
                    <FieldLabel>
                        Sperm Concentration (Million/mL)
                    </FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("sperm_concentration_million_ml", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.sperm_concentration_million_ml]}
                    />
                </Field>

                <Field>
                    <FieldLabel>
                        WBC Concentration (Million/mL)
                    </FieldLabel>

                    <Input
                        type="number"
                        step="0.1"
                        {...register("wbc_concentration_million_ml", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError
                        errors={[errors.wbc_concentration_million_ml]}
                    />
                </Field>

                <Field>
                    <FieldLabel>Pus Cells</FieldLabel>

                    <Controller
                        control={control}
                        name="pus_cells"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select pus cells" />
                                </SelectTrigger>

                                <SelectContent>
                                    {PUS_CELLS.map((item) => (
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

                    <FieldError errors={[errors.pus_cells]} />
                </Field>

                <Field>
                    <FieldLabel>Debris</FieldLabel>

                    <Controller
                        control={control}
                        name="debris"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select debris" />
                                </SelectTrigger>

                                <SelectContent>
                                    {DEBRIS.map((item) => (
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

                    <FieldError errors={[errors.debris]} />
                </Field>

                <Field>
                    <FieldLabel>Agglutination</FieldLabel>

                    <Controller
                        control={control}
                        name="agglutination"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select agglutination" />
                                </SelectTrigger>

                                <SelectContent>
                                    {AGGLUTINATION.map((item) => (
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

                    <FieldError errors={[errors.agglutination]} />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}