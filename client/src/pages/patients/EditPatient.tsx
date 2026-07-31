import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { PatientForm } from "@/components/patients/PatientForm";
import {
  getPatient,
  updatePatient,
} from "@/api/patients";

import type { PatientFormData } from "@/lib/schemas/patient";

export default function EditPatient() {
  const { patientCode } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [patient, setPatient] = useState<PatientFormData | null>(null);

  useEffect(() => {
    async function loadPatient() {
      if (!patientCode) return;

      try {
        const data = await getPatient(patientCode);

        setPatient({
          first_name: data.first_name,
          last_name: data.last_name ?? "",
          age: data.age,
          phone: data.phone ?? "",
          doctor: data.doctor ?? "",
        });
      } finally {
        setLoading(false);
      }
    }

    loadPatient();
  }, [patientCode]);

  async function handleSubmit(data: PatientFormData) {
    if (!patientCode) return;

    await updatePatient(patientCode, data);

    navigate(`/admin/patients/${patientCode}`);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!patient) {
    return <div>Patient not found.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Patient</h1>

        <p className="text-muted-foreground">
          Update patient information.
        </p>
      </div>

      <PatientForm
        defaultValues={patient}
        onSubmit={handleSubmit}
      />
    </div>
  );
}