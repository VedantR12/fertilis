import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Field,
    FieldLabel,
    FieldContent,
    FieldError,
} from "@/components/ui/field";

import { z } from "zod";

import {
    patientSchema,
    type PatientFormData,
} from "@/lib/schemas/patient";

interface PatientFormProps {
    defaultValues?: PatientFormData;
    onSubmit: (data: PatientFormData) => Promise<void> | void;
    loading?: boolean;
}

export function PatientForm({
    defaultValues,
    onSubmit,
    loading = false,
}: PatientFormProps) {
    const form = useForm<
        z.input<typeof patientSchema>,
        unknown,
        PatientFormData
    >({
        resolver: zodResolver(patientSchema),
        defaultValues: defaultValues ?? {
            first_name: "",
            last_name: "",
            age: 0,
            phone: "",
            doctor: "",
        },
    });

    useEffect(() => {
        if (defaultValues) {
            form.reset(defaultValues);
        }
    }, [defaultValues, form]);

    return (
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {/* First Name */}
            <Field>
                <FieldLabel htmlFor="first_name">
                    First Name
                </FieldLabel>

                <FieldContent>
                    <Controller
                        control={form.control}
                        name="first_name"
                        render={({ field }) => (
                            <Input
                                id="first_name"
                                placeholder="Enter first name"
                                {...field}
                            />
                        )}
                    />

                    <FieldError>
                        {form.formState.errors.first_name?.message}
                    </FieldError>
                </FieldContent>
            </Field>

            {/* Last Name */}
            <Field>
                <FieldLabel htmlFor="last_name">
                    Last Name
                </FieldLabel>

                <FieldContent>
                    <Controller
                        control={form.control}
                        name="last_name"
                        render={({ field }) => (
                            <Input
                                id="last_name"
                                placeholder="Enter last name"
                                {...field}
                            />
                        )}
                    />

                    <FieldError>
                        {form.formState.errors.last_name?.message}
                    </FieldError>
                </FieldContent>
            </Field>

            {/* Age */}
            <Field>
                <FieldLabel htmlFor="age">
                    Age
                </FieldLabel>

                <FieldContent>
                    <Input
                        id="age"
                        type="number"
                        placeholder="Age"
                        {...form.register("age", {
                            valueAsNumber: true,
                        })}
                    />

                    <FieldError>
                        {form.formState.errors.age?.message}
                    </FieldError>
                </FieldContent>
            </Field>

            {/* Phone */}
            <Field>
                <FieldLabel htmlFor="phone">
                    Phone
                </FieldLabel>

                <FieldContent>
                    <Controller
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <Input
                                id="phone"
                                placeholder="Phone number"
                                {...field}
                            />
                        )}
                    />

                    <FieldError>
                        {form.formState.errors.phone?.message}
                    </FieldError>
                </FieldContent>
            </Field>

            {/* Doctor */}
            <Field>
                <FieldLabel htmlFor="doctor">
                    Doctor
                </FieldLabel>

                <FieldContent>
                    <Controller
                        control={form.control}
                        name="doctor"
                        render={({ field }) => (
                            <Input
                                id="doctor"
                                placeholder="Referring doctor"
                                {...field}
                            />
                        )}
                    />

                    <FieldError>
                        {form.formState.errors.doctor?.message}
                    </FieldError>
                </FieldContent>
            </Field>

            <Button
                type="submit"
                disabled={loading}
            >
                {loading ? "Saving..." : "Save Patient"}
            </Button>
        </form>
    );
}