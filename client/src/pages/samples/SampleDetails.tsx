import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    getSample,
    getSampleTests,
} from "@/api/samples";
import type { Sample } from "@/lib/schemas/sample";
import {
    useNavigate,
    useParams,
    useLocation,
} from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, } from "@/components/ui/card";

export default function SampleDetails() {
    const { sampleCode } = useParams();

    const [sample, setSample] = useState<Sample | null>(null);
    const [tests, setTests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();

    const isReportsMode =
    location.pathname.startsWith("/admin/reports");

    useEffect(() => {
        async function loadSample() {
            if (!sampleCode) return;

            try {
                const data = await getSample(sampleCode);

                setSample(data);

                const testData =
                    await getSampleTests(sampleCode);

                setTests(testData.tests);
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

                    <CardTitle>

                        {isReportsMode
                            ? "Available Reports"
                            : "Laboratory Tests"}

                    </CardTitle>

                </CardHeader>

                <CardContent className="space-y-4">

                    {tests.map((test) => (

                        <div
                            key={test.id}
                            className="flex items-center justify-between rounded-lg border p-4"
                        >

                            <div>

                                <h3 className="font-medium">
                                    {test.name}
                                </h3>

                                <p className="text-sm text-muted-foreground">

                                    {test.performed
                                        ? "Completed"
                                        : "Not Performed"}

                                </p>

                            </div>

                            {isReportsMode ? (

                                test.performed ? (

                                    <Button
                                        size="sm"
                                        onClick={() => {

                                            switch (test.id) {

                                                case "semen-analysis":

                                                    navigate(
                                                        `/admin/samples/${sample.sample_code}/report`
                                                    );

                                                    break;

                                                case "morphology":

                                                    // We'll create this later
                                                    break;

                                                case "dfi":

                                                    // We'll create this later
                                                    break;

                                            }

                                        }}
                                    >
                                        Preview Report
                                    </Button>

                                ) : (

                                    <Button
                                        size="sm"
                                        disabled
                                    >
                                        Not Performed
                                    </Button>

                                )

                            ) : (

                                <Button
                                    size="sm"
                                    onClick={() => {

                                        switch (test.id) {

                                            case "semen-analysis":

                                                navigate(
                                                    `/admin/samples/${sample.sample_code}/analysis`
                                                );

                                                break;

                                            case "morphology":

                                                navigate(
                                                    `/admin/samples/${sample.sample_code}/morphology`
                                                );

                                                break;

                                            case "dfi":

                                                navigate(
                                                    `/admin/samples/${sample.sample_code}/dfi`
                                                );

                                                break;

                                        }

                                    }}
                                >

                                    {test.performed
                                        ? "Continue"
                                        : "Start Test"}

                                </Button>

                            )}

                        </div>

                    ))}

                </CardContent>

            </Card>
        </div>
    );
}