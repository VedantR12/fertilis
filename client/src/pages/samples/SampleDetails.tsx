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
            <div>

                <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
                    Sample {sample.sample_code}
                </h1>

                <p className="mt-2 text-base text-slate-500">
                    View sample information and perform laboratory tests.
                </p>

            </div>

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
                            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-[#6C2E87] p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                        >

                            <div>

                                <h3 className="font-medium text-white">
                                    {test.name}
                                </h3>

                                <p className="text-sm text-muted-foreground text-slate-300">

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

                                                    navigate(
                                                        `/admin/samples/${sample.sample_code}/morphology/report`
                                                    );

                                                    break;

                                                case "dfi":

                                                    navigate(
                                                        `/admin/samples/${sample.sample_code}/dfi/report`
                                                    );

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