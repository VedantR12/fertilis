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
        <div className="space-y-6">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        {isSelectionMode
                            ? "Select Patient"
                            : isReportsMode
                                ? "Patient Reports"
                                : "Patients"}
                    </h1>

                    <p className="text-muted-foreground">
                        {isSelectionMode
                            ? "Choose an existing patient or register a new patient to continue."
                            : isReportsMode
                                ? "Select a patient to view available reports."
                                : "Manage patient records."}
                    </p>
                </div>

                {!isReportsMode && (
                    <Button >
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
            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                <Input
                    placeholder="Search patients..."
                    className="pl-9"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1);
                    }}
                />
            </div>

            {/* Table Placeholder */}
            <div className="rounded-lg border bg-white">

                <table className="w-full">

                    <thead className="border-b bg-gray-50">

                        <tr>

                            <th className="px-4 py-3 text-left">Patient Code</th>

                            <th className="px-4 py-3 text-left">Name</th>

                            <th className="px-4 py-3 text-left">Age</th>

                            <th className="px-4 py-3 text-left">Phone</th>

                            <th className="px-4 py-3 text-left">Actions</th>

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
                                <td
                                    colSpan={5}
                                    className="py-12 text-center text-gray-500"
                                >
                                    No patients found.
                                </td>
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
                                    className="border-b hover:bg-gray-50 cursor-pointer"
                                >
                                    <td className="px-4 py-3">
                                        {patient.patient_code}
                                    </td>

                                    <td className="px-4 py-3">
                                        {patient.first_name} {patient.last_name}
                                    </td>

                                    <td className="px-4 py-3">
                                        {patient.age}
                                    </td>

                                    <td className="px-4 py-3">
                                        {patient.phone}
                                    </td>

                                    <td className="px-4 py-3">
                                        <Button
                                            variant="outline"
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