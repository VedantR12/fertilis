import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";

import {
  sampleSchema,
  type SampleFormData,
} from "@/lib/schemas/sample";

interface SampleFormProps {
  defaultValues?: SampleFormData;
  onSubmit: (data: SampleFormData) => Promise<void> | void;
  loading?: boolean;
}

export function SampleForm({
  defaultValues,
  onSubmit,
  loading = false,
}: SampleFormProps) {
  const form = useForm<SampleFormData>({
    resolver: zodResolver(sampleSchema),
    defaultValues:
      defaultValues ?? {
        patient_code: "",
        sample_type: "",
        collection_datetime: "",
        abstinence_days: 0,
        collection_method: "",
        collection_place: "",
        remarks: "",
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
      {/* Sample Type */}
      <Field>
        <FieldLabel>Sample Type</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="sample_type"
            render={({ field }) => (
              <Input
                placeholder="Semen"
                {...field}
              />
            )}
          />

          <FieldError>
            {form.formState.errors.sample_type?.message}
          </FieldError>
        </FieldContent>
      </Field>

      {/* Collection Date & Time */}
      <Field>
        <FieldLabel>Collection Date & Time</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="collection_datetime"
            render={({ field }) => (
              <Input
                type="datetime-local"
                {...field}
              />
            )}
          />

          <FieldError>
            {form.formState.errors.collection_datetime?.message}
          </FieldError>
        </FieldContent>
      </Field>

      {/* Abstinence */}
      <Field>
        <FieldLabel>Abstinence (Days)</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="abstinence_days"
            render={({ field }) => (
              <Input
                type="number"
                {...field}
              />
            )}
          />

          <FieldError>
            {form.formState.errors.abstinence_days?.message}
          </FieldError>
        </FieldContent>
      </Field>

      {/* Collection Method */}
      <Field>
        <FieldLabel>Collection Method</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="collection_method"
            render={({ field }) => (
              <Input
                placeholder="Masturbation"
                {...field}
              />
            )}
          />
        </FieldContent>
      </Field>

      {/* Collection Place */}
      <Field>
        <FieldLabel>Collection Place</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="collection_place"
            render={({ field }) => (
              <Input
                placeholder="Laboratory"
                {...field}
              />
            )}
          />
        </FieldContent>
      </Field>

      {/* Remarks */}
      <Field>
        <FieldLabel>Remarks</FieldLabel>

        <FieldContent>
          <Controller
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <Input
                placeholder="Remarks"
                {...field}
              />
            )}
          />
        </FieldContent>
      </Field>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Register Sample"}
      </Button>
    </form>
  );
}