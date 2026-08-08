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
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
                        {isSelectionMode
                            ? "Select Sample"
                            : isReportsMode
                                ? "Patient Reports"
                                : `${patient.first_name} ${patient.last_name}`}
                    </h1>

                    <p className="mt-2 text-base text-slate-500">
                        {patient.patient_code}
                    </p>
                </div>

                {!isReportsMode && (

                    <div className="flex items-center gap-3">

                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() =>
                                navigate(`/admin/patients/${patient.patient_code}/edit`)
                            }
                        >
                            Edit
                        </Button>

                        <Button
                            size="lg"
                            className="min-w-[190px]"
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

            <div className="grid grid-cols-2 gap-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Age
                    </p>

                    <p className="mt-1 text-lg font-semibold text-slate-800">
                        {patient.age} Years
                    </p>

                </div>

                <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Phone
                    </p>

                    <p className="mt-1 text-lg font-semibold text-slate-800">
                        {patient.phone || "-"}
                    </p>

                </div>
                <div>

                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                        Doctor
                    </p>

                    <p className="mt-1 text-lg font-semibold text-slate-800">
                        {patient.doctor || "-"}
                    </p>

                </div>
            </div>
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">
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
                                        <div className="flex flex-col items-center gap-3 py-10">

                                            <p className="text-lg font-semibold text-slate-600">
                                                No Samples Registered
                                            </p>

                                            <p className="text-sm text-slate-400">
                                                Register the patient's first sample.
                                            </p>

                                        </div>
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
                                            {new Intl.DateTimeFormat("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            }).format(new Date(sample.collection_datetime))}
                                        </TableCell>

                                        <TableCell>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${sample.status === "Completed"
                                                        ? "bg-green-100 text-green-700"
                                                        : sample.status === "Collected"
                                                            ? "bg-blue-100 text-blue-700"
                                                            : sample.status === "Pending"
                                                                ? "bg-yellow-100 text-yellow-700"
                                                                : "bg-slate-100 text-slate-700"
                                                    }`}
                                            >
                                                {sample.status}
                                            </span>

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