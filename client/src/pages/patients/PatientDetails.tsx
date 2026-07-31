import { useEffect, useState } from "react";
import { getPatientSamples } from "@/api/samples";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
    useNavigate,
    useSearchParams,
    useLocation,
} from "react-router-dom";
import { getPatient } from "@/api/patients";

export default function PatientDetails() {
    const { patientCode } = useParams();

    const [patient, setPatient] = useState<any>(null);
    const [samples, setSamples] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const [searchParams] = useSearchParams();

    const isSelectionMode =
        searchParams.get("mode") === "select";

    const isReportsMode =
        location.pathname.startsWith("/admin/reports");

    const selectedTest =
        searchParams.get("test");

    useEffect(() => {
        async function loadPatient() {
            try {
                if (!patientCode) return;

                const data = await getPatient(patientCode);
                setPatient(data);

                const sampleData = await getPatientSamples(patientCode);
                setSamples(sampleData);
            } finally {
                setLoading(false);
            }
        }

        loadPatient();
    }, [patientCode]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!patient) {
        return <div>Patient not found.</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {isSelectionMode
                            ? "Select Sample"
                            : isReportsMode
                                ? "Patient Reports"
                                : `${patient.first_name} ${patient.last_name}`}
                    </h1>

                    <p className="text-muted-foreground">
                        {patient.patient_code}
                    </p>
                </div>

                {!isReportsMode && (

                    <div className="flex gap-2">

                        <Button
                            variant="outline"
                            onClick={() =>
                                navigate(`/admin/patients/${patient.patient_code}/edit`)
                            }
                        >
                            Edit
                        </Button>

                        <Button
                            onClick={() =>
                                navigate(
                                    isSelectionMode
                                        ? `/admin/patients/${patient.patient_code}/samples/new?mode=select&test=${selectedTest}`
                                        : `/admin/patients/${patient.patient_code}/samples/new`
                                )
                            }
                        >
                            Register Sample
                        </Button>

                    </div>

                )}
            </div>

            <div className="rounded-lg border p-6 space-y-2">
                <p>
                    <strong>Age:</strong> {patient.age}
                </p>

                <p>
                    <strong>Phone:</strong> {patient.phone || "-"}
                </p>

                <p>
                    <strong>Doctor:</strong> {patient.doctor || "-"}
                </p>
            </div>
            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    {isSelectionMode
                        ? "Select Sample"
                        : isReportsMode
                            ? "Available Samples"
                            : "Registered Samples"}
                </h2>

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Sample Code</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Collected</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {samples.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={4}
                                        className="text-center text-muted-foreground"
                                    >
                                        No samples registered.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                samples.map((sample) => (
                                    <TableRow
                                        key={sample.sample_code}
                                        className="cursor-pointer"
                                        onClick={() => {

                                            if (isSelectionMode) {

                                                switch (selectedTest) {

                                                    case "semen-analysis":
                                                        navigate(`/admin/samples/${sample.sample_code}/analysis`);
                                                        break;

                                                    case "morphology":
                                                        navigate(`/admin/samples/${sample.sample_code}/morphology`);
                                                        break;

                                                    case "dfi":
                                                        navigate(`/admin/samples/${sample.sample_code}/dfi`);
                                                        break;

                                                    default:
                                                        navigate(`/admin/samples/${sample.sample_code}`);

                                                }

                                            } else if (isReportsMode) {

                                                navigate(
                                                    `/admin/reports/${patient.patient_code}/${sample.sample_code}`
                                                );

                                            } else {

                                                navigate(
                                                    `/admin/samples/${sample.sample_code}`
                                                );

                                            }
                                        }}
                                    >
                                        <TableCell>
                                            {sample.sample_code}
                                        </TableCell>

                                        <TableCell>
                                            {sample.sample_type}
                                        </TableCell>

                                        <TableCell>
                                            {new Date(
                                                sample.collection_datetime
                                            ).toLocaleString()}
                                        </TableCell>

                                        <TableCell>
                                            {sample.status}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}