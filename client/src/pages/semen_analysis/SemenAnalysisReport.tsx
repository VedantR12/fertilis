import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
    PDFViewer,
    PDFDownloadLink,
} from "@react-pdf/renderer";
import SemenAnalysisPDF from "@/components/pdf/SemenAnalysisPDF";
import { getSample } from "@/api/samples";
import { getPatient } from "@/api/patients";
import { getSemenAnalysis } from "@/api/semen_analysis";
import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { SemenAnalysis } from "@/lib/schemas/semen_analysis";

const SemenAnalysisReport = () => {
    const { sampleCode } = useParams();
const navigate = useNavigate();
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
    <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">

        <div className="flex justify-end gap-3">

            <Button
                variant="outline"
                onClick={() =>
                    navigate(`/admin/samples/${sampleCode}/analysis`)
                }
            >
                Edit Report
            </Button>

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

                        <Button>
                            {loading
                                ? "Generating..."
                                : "Download PDF"}
                        </Button>

                    )}
                </PDFDownloadLink>

            )}

        </div>

        {sample && patient && analysis && (

            <PDFViewer
                width="100%"
                height="100%"
                style={{
                    border: "1px solid #d1d5db",
                    borderRadius: 8,
                }}
            >
                <SemenAnalysisPDF
                    sample={sample}
                    patient={patient}
                    analysis={analysis}
                />
            </PDFViewer>

        )}

    </div>
);
};

export default SemenAnalysisReport;