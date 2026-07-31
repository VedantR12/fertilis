import { PatientForm } from "@/components/patients/PatientForm";
import type { PatientFormData } from "@/lib/schemas/patient";
import { createPatient } from "@/api/patients";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function NewPatient() {

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const isSelectionMode =
        searchParams.get("mode") === "select";

    const selectedTest =
        searchParams.get("test");

    const handleSubmit = async (data: PatientFormData) => {

        try {

            const patient = await createPatient(data);

            if (isSelectionMode) {

                navigate(
                    `/admin/patients/${patient.patient_code}?mode=select&test=${selectedTest}`
                );

            } else {

                navigate(
                    `/admin/patients/${patient.patient_code}`
                );

            }

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