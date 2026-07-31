import { PatientForm } from "@/components/patients/PatientForm";
import type { PatientFormData } from "@/lib/schemas/patient";
import { createPatient } from "@/api/patients";

export default function NewPatient() {
  const handleSubmit = async (data: PatientFormData) => {
  try {
    const patient = await createPatient(data);

    console.log("Patient created:", patient);
  } catch (error) {
    console.error("Failed to create patient:", error);
  }
};

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          New Patient
        </h1>

        <p className="text-muted-foreground">
          Register a new patient.
        </p>
      </div>

      <PatientForm onSubmit={handleSubmit} />
    </div>
  );
}