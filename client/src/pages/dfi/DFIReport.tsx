import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
    PDFViewer,
    PDFDownloadLink,
} from "@react-pdf/renderer";

import { Button } from "@/components/ui/button";

import DFIPDF from "@/components/pdf/DFIPDF";

import { getSample } from "@/api/samples";
import { getPatient } from "@/api/patients";
import { getDFI } from "@/api/dfi";

import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { DFI } from "@/lib/schemas/dfi";

export default function DFIReport() {

    const { sampleCode } = useParams();

    const navigate = useNavigate();

    const [sample, setSample] =
        useState<Sample | null>(null);

    const [patient, setPatient] =
        useState<Patient | null>(null);

    const [dfi, setDFI] =
        useState<DFI | null>(null);

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
                    dfiData,
                ] = await Promise.all([

                    getPatient(
                        sampleData.patient_code
                    ),

                    getDFI(sampleCode),

                ]);

                setPatient(patientData);

                setDFI(dfiData);

            }

            catch (err) {

                console.error(err);

            }

            finally {

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
                            `/admin/samples/${sampleCode}/dfi`
                        )
                    }
                >
                    Edit Report
                </Button>

                {sample && patient && dfi && (

                    <PDFDownloadLink

                        document={

                            <DFIPDF
                                sample={sample}
                                patient={patient}
                                dfi={dfi}
                            />

                        }

                        fileName={`${sample.sample_code}_DFI_Report.pdf`}
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

            {sample && patient && dfi && (

                <PDFViewer
                    width="100%"
                    height="100%"
                    style={{
                        border: "1px solid #d1d5db",
                        borderRadius: 8,
                    }}
                >

                    <DFIPDF
                        sample={sample}
                        patient={patient}
                        dfi={dfi}
                    />

                </PDFViewer>

            )}

        </div>

    );

}