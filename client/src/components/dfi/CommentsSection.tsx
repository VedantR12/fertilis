import type {
    FieldErrors,
    UseFormRegister,
} from "react-hook-form";

import type { DFIFormData } from "@/lib/schemas/dfi";

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
    register: UseFormRegister<DFIFormData>;
    errors: FieldErrors<DFIFormData>;
}

export default function CommentsSection({
    register,
    errors,
}: Props) {

    return (

        <FieldSet>

            <FieldLegend>
                Remarks
            </FieldLegend>

            <FieldGroup>

                <Field>

                    <FieldLabel>
                        Laboratory Remarks
                    </FieldLabel>

                    <Textarea
                        rows={5}
                        placeholder="Enter observations, remarks, or additional findings..."
                        {...register("remarks")}
                    />

                    <FieldError
                        errors={[errors.remarks]}
                    />

                </Field>

            </FieldGroup>

        </FieldSet>

    );

}