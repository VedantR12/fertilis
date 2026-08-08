import {
    Document,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";
import PDFLayout from "./PDFLayout";
import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { SemenAnalysis } from "@/lib/schemas/semen_analysis";
import PDFTable from "./PDFTable";
import MotilityPieChart from "@/components/pdf/MotilityPieChart";

interface Props {
    sample: Sample;
    patient: Patient;
    analysis: SemenAnalysis;
}

const styles = StyleSheet.create({

    footerTitle: {
        fontSize: 9,
        fontWeight: "bold",
    },

    footerText: {
        fontSize: 7,
        color: "#666",
        marginTop: 2,
    },

    tableSpacing: {
        marginBottom: 10,
    },

    title: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 12,
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginTop: 8,
        marginBottom: 5,
        borderBottomWidth: 1,
        paddingBottom: 4,
    },

    table: {
        width: "100%",
    },

    row: {
        flexDirection: "row",
        marginBottom: 3,
    },

    label: {
        width: "25%",
        fontWeight: "bold",
    },

    value: {
        width: "25%",
    },

    cardsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: 6,
        marginBottom: 10,
    },

    card: {
        width: "48%",
        borderWidth: 1,
        borderColor: "#000",
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 5,
    },

    cardTitle: {
        fontSize: 10,
        color: "#444",
        marginBottom: 6,
    },

    cardValue: {
        fontSize: 12,
        fontWeight: "normal",
        textAlign: "center",
    },

    cardUnit: {
        fontSize: 8,
        color: "#666",
        textAlign: "center",
        marginTop: 2,
    },

});

export default function SemenAnalysisPDF({
    sample,
    patient,
    analysis,
}: Props) {

    const reportDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date(analysis.created_at));
    const hasMorphology =
        analysis.morphology_normal_percent !== 0 &&
        analysis.morphology_abnormal_percent !== 0;

    return (
        <Document>
            <PDFLayout>

                <Text style={styles.title}>
                    SEMEN ANALYSIS REPORT
                </Text>

                <Text
                    style={{
                        textAlign: "right",
                        marginBottom: 8,
                        fontSize: 10,
                    }}
                >
                    Report Date: {reportDate}
                </Text>

                <Text style={styles.sectionTitle}>
                    Patient Information
                </Text>

                <View style={styles.table}>

                    <View style={styles.row}>
                        <Text style={styles.label}>Patient Name</Text>
                        <Text style={styles.value}>
                            {patient.first_name} {patient.last_name}
                        </Text>

                        <Text style={styles.label}>Patient Code</Text>
                        <Text style={styles.value}>
                            {patient.patient_code}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Age</Text>
                        <Text style={styles.value}>
                            {patient.age} Years
                        </Text>

                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>
                            {patient.phone}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Address</Text>

                        <Text
                            style={{
                                width: "25%",
                                fontSize: 9,
                            }}
                        >
                            {patient.address || "-"}
                        </Text>
                        <Text style={styles.label}>Doctor</Text>
                        <Text style={styles.value}>
                            {patient.doctor}
                        </Text>
                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    Sample Information
                </Text>

                <View style={[styles.table, styles.tableSpacing]}>

                    <View style={styles.row}>
                        <Text style={styles.label}>Sample Code</Text>
                        <Text style={styles.value}>
                            {sample.sample_code}
                        </Text>

                        <Text style={styles.label}>Sample Type</Text>
                        <Text style={styles.value}>
                            {sample.sample_type}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Collection Date</Text>
                        <Text style={styles.value}>
                            {sample.collection_datetime
                                ? new Date(sample.collection_datetime).toLocaleDateString()
                                : "-"}
                        </Text>

                        <Text style={styles.label}>Collection Time</Text>
                        <Text style={styles.value}>
                            {sample.collection_datetime
                                ? new Date(sample.collection_datetime).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "-"}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Abstinence</Text>
                        <Text style={styles.value}>
                            {sample.abstinence_days} Days
                        </Text>

                        <Text style={styles.label}>Status</Text>
                        <Text style={styles.value}>
                            {sample.status}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Collection Method</Text>
                        <Text style={styles.value}>
                            {sample.collection_method}
                        </Text>

                        <Text style={styles.label}>Collection Place</Text>
                        <Text style={styles.value}>
                            {sample.collection_place}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Remarks</Text>
                        <Text style={{ flex: 1 }}>
                            {sample.remarks || "-"}
                        </Text>
                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    Results
                </Text>

                <PDFTable
                    title="Macroscopic Examination"
                    rows={[
                        {
                            parameter: "Volume",
                            result: analysis.volume_ml,
                            unit: "ml",
                            reference: ">= 1.4",
                        },
                        {
                            parameter: "Appearance",
                            result: analysis.appearance,
                            unit: "-",
                            reference: "-",
                        },
                        {
                            parameter: "pH",
                            result: analysis.ph,
                            unit: "-",
                            reference: "7.2–8.0",
                        },
                        {
                            parameter: "Viscosity",
                            result: analysis.viscosity,
                            unit: "-",
                            reference: "-",
                        },
                        {
                            parameter: "Liquefaction Time",
                            result: analysis.liquefaction_minutes,
                            unit: "min",
                            reference: "<= 60",
                        },
                    ]}
                />

                <PDFTable
                    title="Microscopic Examination"
                    rows={[
                        {
                            parameter: "Sperm Concentration",
                            result: analysis.sperm_concentration_million_ml,
                            unit: "million/ml",
                            reference: ">= 16",
                        },
                        {
                            parameter: "WBC Concentration",
                            result: analysis.wbc_concentration_million_ml,
                            unit: "million/ml",
                            reference: "< 1",
                        },
                        {
                            parameter: "Pus Cells",
                            result: analysis.pus_cells,
                            unit: "-",
                            reference: "Nil/Few",
                        },
                        {
                            parameter: "Debris",
                            result: analysis.debris,
                            unit: "-",
                            reference: "Absent/Mild",
                        },
                        {
                            parameter: "Agglutination",
                            result: analysis.agglutination,
                            unit: "-",
                            reference: "Absent",
                        },
                    ]}
                />

                <View
                    wrap={false}
                    style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                        marginBottom: 10,
                    }}
                >

                    <View
                        style={{
                            width: "65%",
                            paddingRight: 6,
                        }}
                    >
                        <PDFTable
                            title="Motility"
                            rows={[
                                {
                                    parameter: "Total Motility",
                                    result: analysis.total_motility_percent,
                                    unit: "%",
                                    reference: ">= 42",
                                },
                                {
                                    parameter: "Progressive Motility",
                                    result: analysis.progressive_motility_percent,
                                    unit: "%",
                                    reference: ">= 30",
                                },
                                {
                                    parameter: "Rapid Progressive",
                                    result: analysis.rapid_progressive_percent,
                                    unit: "%",
                                    reference: "-",
                                },
                                {
                                    parameter: "Slow Progressive",
                                    result: analysis.slow_progressive_percent,
                                    unit: "%",
                                    reference: "-",
                                },
                                {
                                    parameter: "Non Progressive",
                                    result: analysis.non_progressive_percent,
                                    unit: "%",
                                    reference: "<=1",
                                },
                                {
                                    parameter: "Immotile",
                                    result: analysis.immotile_percent,
                                    unit: "%",
                                    reference: "<=20",
                                },
                            ]}
                        />
                    </View>
                    <View
                        style={{
                            width: "35%",
                            paddingLeft: 6,
                        }}
                    >
                        <MotilityPieChart
                            slices={[
                                {
                                    label: "Rapid Progressive",
                                    value: analysis.rapid_progressive_percent,
                                },
                                {
                                    label: "Slow Progressive",
                                    value: analysis.slow_progressive_percent,
                                },
                                {
                                    label: "Non Progressive",
                                    value: analysis.non_progressive_percent,
                                },
                                {
                                    label: "Immotile",
                                    value: analysis.immotile_percent,
                                },
                            ]}
                        />
                    </View>
                </View>

                {hasMorphology && (
                    <PDFTable
                        title="Morphology"
                        rows={[
                            {
                                parameter: "Normal Forms",
                                result: `${analysis.morphology_normal_percent}%`,
                                unit: "%",
                                reference: ">= 4",
                            },
                            {
                                parameter: "Abnormal Forms",
                                result: `${analysis.morphology_abnormal_percent}%`,
                                unit: "%",
                                reference: "< 96",
                            },
                        ]}
                    />
                )}
                <Text style={styles.sectionTitle}>
                    Totals per Ejaculate
                </Text>

                <View style={styles.cardsContainer}>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                            Sperm
                        </Text>

                        <Text style={styles.cardValue}>
                            {analysis.total_sperm_million} Million
                        </Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                            Motile Sperm
                        </Text>

                        <Text style={styles.cardValue}>
                            {analysis.total_motile_sperm_million} Million
                        </Text>

                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>
                            Prog. Motile Sperm
                        </Text>

                        <Text style={styles.cardValue}>
                            {analysis.progressive_motile_sperm_million} Million
                        </Text>
                    </View>
                    {hasMorphology && (
                        <View style={styles.card}>
                            <Text style={styles.cardTitle}>
                                Morph. Normal Sperm
                            </Text>

                            <Text style={styles.cardValue}>
                                {analysis.morphologically_normal_sperm_million == null
                                    ? "N/A"
                                    : analysis.morphologically_normal_sperm_million.toFixed(2)} Million
                            </Text>
                        </View>
                    )}

                </View>

                <Text style={styles.sectionTitle}>
                    Comments
                </Text>

                <View
                    style={{
                        borderWidth: 1,
                        padding: 6,
                        marginBottom: 12,
                    }}
                >
                    <Text>
                        {analysis.comments || "-"}
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 20,
                        alignItems: "flex-end",
                    }}
                >
                    <View
                        style={{
                            width: 180,
                            textAlign: "center",
                        }}
                    >
                        <View
                            style={{
                                height: 35,
                            }}
                        />

                        <View
                            style={{
                                borderTopWidth: 1,
                                paddingTop: 5,
                            }}
                        >
                            <Text>Tested By</Text>

                            <Text
                                style={{
                                    marginTop: 8,
                                }}
                            >__________________
                            </Text>

                            <Text
                                style={{
                                    marginTop: 15,
                                }}
                            >
                                Signature
                            </Text>
                        </View>
                    </View>
                </View>

            </PDFLayout>
        </Document>
    );
}