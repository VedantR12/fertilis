import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    PDFViewer,
    PDFDownloadLink,
} from "@react-pdf/renderer";

import { Button } from "@/components/ui/button";

import { getSample } from "@/api/samples";
import { getPatient } from "@/api/patients";
import { getMorphology } from "@/api/morphology";

import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { Morphology } from "@/lib/schemas/morphology";

import MorphologyPDF from "@/components/pdf/MorphologyPDF";

export default function MorphologyReport() {
    const { sampleCode } = useParams();

    const navigate = useNavigate();

    const [sample, setSample] =
        useState<Sample | null>(null);

    const [patient, setPatient] =
        useState<Patient | null>(null);

    const [morphology, setMorphology] =
        useState<Morphology | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        async function loadReport() {
            if (!sampleCode) return;

            try {
                const sampleData =
                    await getSample(sampleCode);

                setSample(sampleData);

                const [
                    patientData,
                    morphologyData,
                ] = await Promise.all([
                    getPatient(
                        sampleData.patient_code
                    ),
                    getMorphology(sampleCode),
                ]);

                setPatient(patientData);
                setMorphology(morphologyData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        loadReport();
    }, [sampleCode]);

    if (loading) {
        return (
            <div className="p-8">
                Loading report...
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-6rem)] flex flex-col gap-4">

            <div className="flex justify-end gap-3">

                <Button
                    variant="outline"
                    onClick={() =>
                        navigate(
                            `/admin/samples/${sampleCode}/morphology`
                        )
                    }
                >
                    Edit Report
                </Button>

                {sample &&
                    patient &&
                    morphology && (
                        <PDFDownloadLink
                            document={
                                <MorphologyPDF
                                    sample={sample}
                                    patient={patient}
                                    morphology={morphology}
                                />
                            }
                            fileName={`${sample.sample_code}_Morphology_Report.pdf`}
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

            {sample &&
                patient &&
                morphology && (
                    <PDFViewer
                        width="100%"
                        height="100%"
                        style={{
                            border:
                                "1px solid #d1d5db",
                            borderRadius: 8,
                        }}
                    >
                        <MorphologyPDF
                            sample={sample}
                            patient={patient}
                            morphology={morphology}
                        />
                    </PDFViewer>
                )}

        </div>
    );
}