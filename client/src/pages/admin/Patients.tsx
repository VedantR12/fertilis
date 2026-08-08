import {
    Link,
    useNavigate,
    useSearchParams,
    useLocation,
} from "react-router-dom";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { getPatients } from "@/services/patient";
import type { Patient } from "@/types/patient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

export default function Patients() {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        total_pages: 1,
        has_next: false,
        has_previous: false,
    });
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const isSelectionMode =
        searchParams.get("mode") === "select";

    const isReportsMode =
        location.pathname === "/admin/reports";

    const selectedTest =
        searchParams.get("test");

    const fetchPatients = async (
        searchTerm = "",
        pageNumber = 1
    ) => {
        try {
            setLoading(true);

            const data = await getPatients({
                search: searchTerm,
                page: pageNumber,
                limit: 20,
            });

            setPatients(data.items);
            setPagination(data.pagination);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPatients(search, page);
        }, 300);

        return () => clearTimeout(timer);
    }, [search, page]);

    return (
        <div className="space-y-8">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
                        {isSelectionMode
                            ? "Select Patient"
                            : isReportsMode
                                ? "Patient Reports"
                                : "Patients"}
                    </h1>

                    <p className="mt-2 text-base text-slate-500">
                        {isSelectionMode
                            ? "Choose an existing patient or register a new patient to continue."
                            : isReportsMode
                                ? "Select a patient to view available reports."
                                : "Manage patient records."}
                    </p>
                </div>

                {!isReportsMode && (
                    <Button
                        size="lg"
                        className="min-w-[170px]"
                    >
                        <Link
                            to={
                                isSelectionMode
                                    ? `/admin/patients/new?mode=select&test=${selectedTest}`
                                    : "/admin/patients/new"
                            }
                        >
                            {isSelectionMode ? "Register Patient" : "New Patient"}
                        </Link>
                    </Button>
                )}
            </div>

            {/* Search */}
            <div className="relative w-full max-w-md">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

                <Input
                    placeholder="Search patients..."
                    className="pl-12"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {/* Table Placeholder */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                <table className="w-full">

                    <thead className="border-b border-slate-200 bg-slate-50">

                        <tr>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Patient Code</th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Name</th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Age</th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Phone</th>

                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>

                        </tr>

                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="py-12 text-center text-gray-500"
                                >
                                    Loading patients...
                                </td>
                            </tr>
                        ) : patients.length === 0 ? (
                            <tr>
                                <div className="flex flex-col items-center gap-2 py-6">

                                    <Users className="h-10 w-10 text-slate-300" />

                                    <p className="font-medium text-slate-600">
                                        No patients found
                                    </p>

                                    <p className="text-sm text-slate-400">
                                        Try a different search or register a new patient.
                                    </p>

                                </div>
                            </tr>
                        ) : (
                            patients.map((patient) => (
                                <tr
                                    key={patient.patient_code}
                                    onClick={() => {

                                        if (isSelectionMode) {

                                            navigate(
                                                `/admin/patients/${patient.patient_code}?mode=select&test=${selectedTest}`
                                            );

                                        } else if (isReportsMode) {

                                            navigate(
                                                `/admin/reports/${patient.patient_code}`
                                            );

                                        } else {

                                            navigate(
                                                `/admin/patients/${patient.patient_code}`
                                            );

                                        }

                                    }}
                                    className="cursor-pointer border-b border-slate-100 transition-all duration-200 hover:bg-blue-50/40"
                                >
                                    <td className="px-6 py-4">
                                        {patient.patient_code}
                                    </td>

                                    <td className="px-6 py-4">
                                        {patient.first_name} {patient.last_name}
                                    </td>

                                    <td className="px-6 py-4">
                                        {patient.age}
                                    </td>

                                    <td className="px-6 py-4">
                                        {patient.phone}
                                    </td>

                                    <td className="px-6 py-4">
                                        <Button
                                            variant="default"
                                            size="sm"
                                            onClick={(e) => {

                                                e.stopPropagation();

                                                if (isSelectionMode) {

                                                    navigate(
                                                        `/admin/patients/${patient.patient_code}?mode=select&test=${selectedTest}`
                                                    );

                                                } else if (isReportsMode) {

                                                    navigate(
                                                        `/admin/reports/${patient.patient_code}`
                                                    );

                                                } else {

                                                    navigate(
                                                        `/admin/patients/${patient.patient_code}`
                                                    );

                                                }

                                            }}
                                        >
                                            {isSelectionMode
                                                ? "Select"
                                                : isReportsMode
                                                    ? "Reports"
                                                    : "View"}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

            </div>

        </div>
    );
}