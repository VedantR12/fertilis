import { useNavigate, useParams } from "react-router-dom";

import { createSample } from "@/api/samples";
import { SampleForm } from "@/components/samples/SampleForm";
import type { SampleFormData } from "@/lib/schemas/sample";

export default function RegisterSample() {
  const navigate = useNavigate();
  const { patientCode } = useParams();

  const handleSubmit = async (data: SampleFormData) => {
    if (!patientCode) return;

    try {
      const sample = await createSample({
        ...data,
        patient_code: patientCode,
      });

      console.log("Sample created:", sample);

      navigate(`/admin/patients/${patientCode}`);
    } catch (error) {
      console.error("Failed to create sample:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Register Sample
        </h1>

        <p className="text-muted-foreground">
          Register a new sample for this patient.
        </p>
      </div>

      <SampleForm onSubmit={handleSubmit} />
    </div>
  );
}