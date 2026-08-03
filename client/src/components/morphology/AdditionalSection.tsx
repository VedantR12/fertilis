import {
    Controller,
    type Control,
    type FieldErrors,
} from "react-hook-form";

import type { MorphologyFormData } from "@/lib/schemas/morphology";

import {
    FRUCTOSE,
    AGGREGATION_AGGLUTINATION,
} from "@/lib/constants/morphology";

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
    control: Control<MorphologyFormData>;
    errors: FieldErrors<MorphologyFormData>;
}

export default function AdditionalSection({
    control,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>Additional Findings</FieldLegend>

            <FieldGroup className="grid gap-4 md:grid-cols-2">

                <Field>
                    <FieldLabel>Fructose</FieldLabel>

                    <Controller
                        control={control}
                        name="fructose"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select fructose" />
                                </SelectTrigger>

                                <SelectContent>
                                    {FRUCTOSE.map((item) => (
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
                        errors={[errors.fructose]}
                    />
                </Field>

                <Field>
                    <FieldLabel>
                        Aggregation / Agglutination
                    </FieldLabel>

                    <Controller
                        control={control}
                        name="aggregation_agglutination"
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select value" />
                                </SelectTrigger>

                                <SelectContent>
                                    {AGGREGATION_AGGLUTINATION.map((item) => (
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
                        errors={[
                            errors.aggregation_agglutination,
                        ]}
                    />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}