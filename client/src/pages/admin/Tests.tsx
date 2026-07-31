import { TestTube2, Microscope, Dna, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const tests = [
    {
        title: "Semen Analysis",
        description: "Routine semen examination and fertility assessment.",
        icon: TestTube2,
        route: "/admin/patients?mode=select&test=semen-analysis",
    },
    {
        title: "Sperm Morphology",
        description: "Strict morphology assessment of sperm cells.",
        icon: Microscope,
        route: "/admin/patients?mode=select&test=morphology",
    },
    {
        title: "DNA Fragmentation Index",
        description: "Assessment of sperm DNA integrity.",
        icon: Dna,
        route: "/admin/patients?mode=select&test=dfi",
    },
];

export default function Tests() {
    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-bold">
                    Choose Investigation
                </h1>

                <p className="text-muted-foreground mt-2">
                    Select the laboratory investigation you want to perform.
                </p>
            </div>

            <div className="grid gap-6">

                {tests.map((test) => {

                    const Icon = test.icon;

                    return (
                        <div
                            key={test.title}
                            className="rounded-2xl border bg-card p-8 flex items-center justify-between hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-6">

                                <div className="rounded-xl bg-primary/10 p-4">
                                    <Icon className="size-8 text-primary" />
                                </div>

                                <div>

                                    <h2 className="text-xl font-semibold">
                                        {test.title}
                                    </h2>

                                    <p className="text-muted-foreground mt-1">
                                        {test.description}
                                    </p>

                                </div>

                            </div>

                            <Link to={test.route}>
                                <Button size="lg">
                                    Start
                                    <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </Link>

                        </div>
                    );

                })}

            </div>

        </div>
    );
}