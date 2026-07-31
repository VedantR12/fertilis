import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import SemenAnalysisPDF from "@/components/pdf/SemenAnalysisPDF";
import { getSample } from "@/api/samples";
import { getPatient } from "@/api/patients";
import { getSemenAnalysis } from "@/api/semen_analysis";
import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { SemenAnalysis } from "@/lib/schemas/semen_analysis";

const SemenAnalysisReport = () => {
    const { sampleCode } = useParams();

    const [sample, setSample] = useState<Sample | null>(null);
    const [patient, setPatient] = useState<Patient | null>(null);
    const [analysis, setAnalysis] = useState<SemenAnalysis | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadReport() {
            if (!sampleCode) return;

            try {
                const sampleData = await getSample(sampleCode);
                setSample(sampleData);

                const [patientData, analysisData] = await Promise.all([
                    getPatient(sampleData.patient_code),
                    getSemenAnalysis(sampleCode),
                ]);

                setPatient(patientData);
                setAnalysis(analysisData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadReport();
    }, [sampleCode]);

    if (loading) {
        return <div className="p-8">Loading report...</div>;
    }

    return (

        <div
            id="report"
            className="mx-auto my-8 w-full max-w-[210mm] bg-white shadow-lg border border-gray-300 p-10"
        >
            <div className="max-w-[210mm] mx-auto mt-6 mb-4 flex justify-end print:hidden">
                {sample && patient && analysis && (
    <PDFDownloadLink
        document={
            <SemenAnalysisPDF
                sample={sample}
                patient={patient}
                analysis={analysis}
            />
        }
        fileName={`${sample.sample_code}_Semen_Analysis_Report.pdf`}
    >
        {({ loading }) => (
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                {loading ? "Generating PDF..." : "Download PDF"}
            </button>
        )}
    </PDFDownloadLink>
)}
            </div>
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold tracking-wide">
                    SEMEN ANALYSIS REPORT
                </h1>
            </div>

            {/* Patient Information */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-5 tracking-wide">
                    Patient Information
                </h2>

                <table className="w-full border-collapse text-sm">
                    <tbody>
                        <tr>
                            <td className="py-2 font-semibold w-1/4">Patient Name</td>
                            <td className="py-2">
                                {patient?.first_name} {patient?.last_name}
                            </td>

                            <td className="py-2 font-semibold w-1/4">Patient Code</td>
                            <td className="py-2">
                                {patient?.patient_code}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2 font-semibold">Age</td>
                            <td className="py-2">
                                {patient?.age} Years
                            </td>

                            <td className="py-2 font-semibold">Phone</td>
                            <td className="py-2">
                                {patient?.phone}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2 font-semibold">Referring Doctor</td>
                            <td className="py-2">
                                {patient?.doctor}
                            </td>

                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Sample Information */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-5 tracking-wide">
                    Sample Information
                </h2>

                <table className="w-full border-collapse text-sm">
                    <tbody>
                        <tr>
                            <td className="py-2 font-semibold w-1/4">Sample Code</td>
                            <td className="py-2">{sample?.sample_code}</td>

                            <td className="py-2 font-semibold w-1/4">Sample Type</td>
                            <td className="py-2">{sample?.sample_type}</td>
                        </tr>

                        <tr>
                            <td className="py-2 font-semibold">Collection Date</td>
                            <td className="py-2">
                                {sample?.collection_datetime
                                    ? new Date(sample.collection_datetime).toLocaleDateString()
                                    : "-"}
                            </td>

                            <td className="py-2 font-semibold">Collection Time</td>
                            <td className="py-2">
                                {sample?.collection_datetime
                                    ? new Date(sample.collection_datetime).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })
                                    : "-"}
                            </td>
                        </tr>

                        <tr>
                            <td className="py-2 font-semibold">Abstinence</td>
                            <td className="py-2">
                                {sample?.abstinence_days} Days
                            </td>

                            <td className="py-2 font-semibold">Status</td>
                            <td className="py-2">{sample?.status}</td>
                        </tr>

                        <tr>
                            <td className="py-2 font-semibold">Collection Method</td>
                            <td className="py-2">{sample?.collection_method}</td>

                            <td className="py-2 font-semibold">Collection Place</td>
                            <td className="py-2">{sample?.collection_place}</td>
                        </tr>

                        <tr>
                            <td className="py-2 font-semibold">Remarks</td>
                            <td className="py-2" colSpan={3}>
                                {sample?.remarks || "-"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            {/* Results */}
            <section className="mb-8">
                <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-5 tracking-wide">
                    Results
                </h2>

                {/* Macroscopic Examination */}
                <div className="print:break-inside-avoid">
                    <h3 className="font-semibold text-base mb-3 uppercase">
                        Macroscopic Examination
                    </h3>

                    <table className="w-full border border-black border-collapse text-sm mb-6">
                        <thead>
                            <tr className="bg-gray-100 border-b border-black">
                                <th className="text-left px-3 py-2">Parameter</th>
                                <th className="text-left px-3 py-2">Result</th>
                                <th className="text-left px-3 py-2">Unit</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="px-3 py-2">Volume</td>
                                <td className="px-3 py-2">{analysis?.volume_ml}</td>
                                <td className="px-3 py-2">ml</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Appearance</td>
                                <td className="px-3 py-2">{analysis?.appearance}</td>
                                <td className="px-3 py-2">-</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">pH</td>
                                <td className="px-3 py-2">{analysis?.ph}</td>
                                <td className="px-3 py-2">-</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Viscosity</td>
                                <td className="px-3 py-2">{analysis?.viscosity}</td>
                                <td className="px-3 py-2">-</td>
                            </tr>

                            <tr>
                                <td className="px-3 py-2">Liquefaction Time</td>
                                <td className="px-3 py-2">{analysis?.liquefaction_minutes}</td>
                                <td className="px-3 py-2">min</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Microscopic Examination */}
                <div className="print:break-inside-avoid">
                    <h3 className="font-semibold text-base mb-3 uppercase">
                        Microscopic Examination
                    </h3>

                    <table className="w-full border border-black border-collapse text-sm mb-6">
                        <thead>
                            <tr className="bg-gray-100 border-b border-black">
                                <th className="text-left px-3 py-2">Parameter</th>
                                <th className="text-left px-3 py-2">Result</th>
                                <th className="text-left px-3 py-2">Unit</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="px-3 py-2">Sperm Concentration</td>
                                <td className="px-3 py-2">
                                    {analysis?.sperm_concentration_million_ml}
                                </td>
                                <td className="px-3 py-2">million/ml</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">WBC Concentration</td>
                                <td className="px-3 py-2">
                                    {analysis?.wbc_concentration_million_ml}
                                </td>
                                <td className="px-3 py-2">million/ml</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Pus Cells</td>
                                <td className="px-3 py-2">{analysis?.pus_cells}</td>
                                <td className="px-3 py-2">-</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Debris</td>
                                <td className="px-3 py-2">{analysis?.debris}</td>
                                <td className="px-3 py-2">-</td>
                            </tr>

                            <tr>
                                <td className="px-3 py-2">Agglutination</td>
                                <td className="px-3 py-2">{analysis?.agglutination}</td>
                                <td className="px-3 py-2">-</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Motility */}
                <div className="print:break-inside-avoid">
                    <h3 className="font-semibold text-base mb-3 uppercase">
                        Motility
                    </h3>

                    <table className="w-full border border-black border-collapse text-sm mb-6">
                        <thead>
                            <tr className="bg-gray-100 border-b border-black">
                                <th className="text-left px-3 py-2">Parameter</th>
                                <th className="text-left px-3 py-2">Result</th>
                                <th className="text-left px-3 py-2">Unit</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="px-3 py-2">Total Motility</td>
                                <td className="px-3 py-2">{analysis?.total_motility_percent}</td>
                                <td className="px-3 py-2">%</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Progressive Motility</td>
                                <td className="px-3 py-2">{analysis?.progressive_motility_percent}</td>
                                <td className="px-3 py-2">%</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Rapid Progressive</td>
                                <td className="px-3 py-2">{analysis?.rapid_progressive_percent}</td>
                                <td className="px-3 py-2">%</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Slow Progressive</td>
                                <td className="px-3 py-2">{analysis?.slow_progressive_percent}</td>
                                <td className="px-3 py-2">%</td>
                            </tr>

                            <tr className="border-b">
                                <td className="px-3 py-2">Non Progressive</td>
                                <td className="px-3 py-2">{analysis?.non_progressive_percent}</td>
                                <td className="px-3 py-2">%</td>
                            </tr>

                            <tr>
                                <td className="px-3 py-2">Immotile</td>
                                <td className="px-3 py-2">{analysis?.immotile_percent}</td>
                                <td className="px-3 py-2">%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Morphology */}
                <div className="print:break-inside-avoid">
                    <h3 className="font-semibold text-base mb-3 uppercase">
                        Morphology
                    </h3>

                    <table className="w-full border border-black border-collapse text-sm mb-6">
                        <thead>
                            <tr className="bg-gray-100 border-b border-black">
                                <th className="text-left px-3 py-2">Parameter</th>
                                <th className="text-left px-3 py-2">Result</th>
                                <th className="text-left px-3 py-2">Unit</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="border-b">
                                <td className="px-3 py-2">Normal Forms</td>
                                <td className="px-3 py-2">
                                    {analysis?.morphology_normal_percent}
                                </td>
                                <td className="px-3 py-2">%</td>
                            </tr>

                            <tr>
                                <td className="px-3 py-2">Abnormal Forms</td>
                                <td className="px-3 py-2">
                                    {analysis?.morphology_abnormal_percent}
                                </td>
                                <td className="px-3 py-2">%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Comments */}
                <h3 className="font-semibold mb-3">Comments</h3>

                <div className="border border-black p-3 text-sm">
                    {analysis?.comments || "-"}
                </div>
            </section >

            {/* Calculated Values */}
            < section className="mb-12" >
                <h2 className="text-lg font-bold uppercase border-b-2 border-black pb-2 mb-5 tracking-wide">
                    Calculated Values
                </h2>

                <table className="w-full text-sm border border-black">
                    <thead>
                        <tr className="border-b bg-gray-100">
                            <th className="text-left p-2">Parameter</th>
                            <th className="text-left p-2">Result</th>
                            <th className="text-left p-2">Unit</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b">
                            <td className="p-2 font-semibold">
                                Total Sperm Count
                            </td>
                            <td className="px-3 py-2">
                                {analysis?.total_sperm_million}
                            </td>
                            <td className="px-3 py-2">Million</td>
                        </tr>

                        <tr className="border-b">
                            <td className="p-2 font-semibold">
                                Total Motile Sperm Count
                            </td>
                            <td className="px-3 py-2">
                                {analysis?.total_motile_sperm_million}
                            </td>
                            <td className="px-3 py-2">Million</td>
                        </tr>

                        <tr className="border-b">
                            <td className="p-2 font-semibold">
                                Progressive Motile Sperm Count
                            </td>
                            <td className="px-3 py-2">
                                {analysis?.progressive_motile_sperm_million}
                            </td>
                            <td className="px-3 py-2">Million</td>
                        </tr>

                        <tr>
                            <td className="p-2 font-semibold">
                                Morphologically Normal Sperm Count
                            </td>
                            <td className="px-3 py-2">
                                {analysis?.morphologically_normal_sperm_million}
                            </td>
                            <td className="px-3 py-2">Million</td>
                        </tr>
                    </tbody>
                </table>
            </section >

            {/* Footer */}
            < div className="mt-20 flex justify-end" >
                <div className="w-72 text-center">
                    <div className="h-20"></div>

                    <div className="border-t border-black pt-2">
                        <p className="font-semibold">Tested By</p>

                        <p className="text-sm mt-4">
                            Name: _______________________
                        </p>

                        <p className="text-sm mt-6">
                            Signature
                        </p>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default SemenAnalysisReport;