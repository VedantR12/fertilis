import type {
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import type { SemenAnalysisFormData } from "@/lib/schemas/semen_analysis";

import { Textarea } from "@/components/ui/textarea";

import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field";

interface Props {
    register: UseFormRegister<SemenAnalysisFormData>;
    errors: FieldErrors<SemenAnalysisFormData>;
}

export default function CommentsSection({
    register,
    errors,
}: Props) {
    return (
        <FieldSet>
            <FieldLegend>Comments</FieldLegend>

            <FieldGroup>

                <Field>
                    <FieldLabel>Laboratory Comments</FieldLabel>

                    <Textarea
                        rows={5}
                        placeholder="Enter observations, remarks, or additional findings..."
                        {...register("comments")}
                    />

                    <FieldError
                        errors={[errors.comments]}
                    />
                </Field>

            </FieldGroup>
        </FieldSet>
    );
}