import {
    Controller,
    type Control,
    type FieldErrors,
} from "react-hook-form";

import type { SemenAnalysisFormData } from "@/lib/schemas/semen_analysis";

import { CRITERIA } from "@/lib/constants/semen_analysis";

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
    errors: FieldErrors<SemenAnalysisFormData>;
}

export default function GeneralSection({
    control,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>General Information</FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">
                <Field>
                    <FieldLabel>Criteria</FieldLabel>

                    <Controller
                        control={control}
                        name="criteria"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select criteria" />
                                </SelectTrigger>

                                <SelectContent>
                                    {CRITERIA.map((item) => (
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
                        errors={[errors.criteria]}
                    />
                </Field>
            </FieldGroup>
        </FieldSet>
    );
}