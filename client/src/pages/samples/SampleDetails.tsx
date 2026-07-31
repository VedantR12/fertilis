import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getSample } from "@/api/samples";
import type { Sample } from "@/lib/schemas/sample";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";

export default function SampleDetails() {
    const { sampleCode } = useParams();

    const [sample, setSample] = useState<Sample | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        async function loadSample() {
            if (!sampleCode) return;

            try {
                const data = await getSample(sampleCode);
                setSample(data);
            } finally {
                setLoading(false);
            }
        }

        loadSample();
    }, [sampleCode]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!sample) {
        return <div>Sample not found.</div>;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">
                Sample Details
            </h1>

            <Card>
                <CardHeader>
                    <CardTitle>{sample.sample_code}</CardTitle>
                </CardHeader>

                <CardContent className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Patient Code
                        </p>
                        <p>{sample.patient_code}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Sample Type
                        </p>
                        <p>{sample.sample_type}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Collection Date & Time
                        </p>
                        <p>
                            {new Date(
                                sample.collection_datetime
                            ).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Abstinence Days
                        </p>
                        <p>{sample.abstinence_days}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Status
                        </p>
                        <p>{sample.status}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Collection Method
                        </p>
                        <p>{sample.collection_method || "-"}</p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Collection Place
                        </p>
                        <p>{sample.collection_place || "-"}</p>
                    </div>

                    <div className="col-span-2">
                        <p className="text-sm text-muted-foreground">
                            Remarks
                        </p>
                        <p>{sample.remarks || "-"}</p>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Laboratory Tests</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Semen Analysis */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">
                                Semen Analysis
                            </h3>
                        </div>

                        <Button
                            size="sm"
                            onClick={() =>
                                navigate(
                                    `/admin/samples/${sample.sample_code}/analysis`
                                )
                            }
                        >
                        </Button>
                    </div>

                    {/* Morphology */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">
                                Morphology
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Status: Not Started
                            </p>
                        </div>

                        <Button size="sm">
                            Start Test
                        </Button>
                    </div>

                    {/* DNA Fragmentation Index */}
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                            <h3 className="font-medium">
                                DNA Fragmentation Index
                            </h3>

                            <p className="text-sm text-muted-foreground">
                                Status: Not Started
                            </p>
                        </div>

                        <Button size="sm">
                            Start Test
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}