import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { Morphology } from "@/lib/schemas/morphology";

import PDFTable from "./PDFTable";
import MotilityPieChart from "./MotilityPieChart";

interface Props {
    sample: Sample;
    patient: Patient;
    morphology: Morphology;
}

const styles = StyleSheet.create({
    pageNumber: {
        position: "absolute",
        bottom: 8,
        right: 30,
        fontSize: 8,
        color: "grey",
    },

    footer: {
        position: "absolute",
        bottom: 20,
        left: 30,
        right: 30,
        borderTopWidth: 0.5,
        borderTopColor: "#999",
        paddingTop: 6,
        alignItems: "center",
    },

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
        marginBottom: 16,
    },

    page: {
        padding: 30,
        fontSize: 10,
        fontFamily: "Helvetica",
    },

    title: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
    },

    sectionTitle: {
        fontSize: 13,
        fontWeight: "bold",
        marginTop: 12,
        marginBottom: 8,
        borderBottomWidth: 1,
        paddingBottom: 4,
    },

    table: {
        width: "100%",
    },

    row: {
        flexDirection: "row",
        marginBottom: 6,
    },

    label: {
        width: "25%",
        fontWeight: "bold",
    },

    value: {
        width: "25%",
    },

    watermark: {
        position: "absolute",
        top: 320,
        left: 80,
        fontSize: 80,
        fontWeight: "bold",
        color: "#eeeeee",
        transform: "rotate(-35deg)",
    },
});

export default function MorphologyPDF({
    sample,
    patient,
    morphology,
}: Props) {

    const reportDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date());

    return (
        <Document>

            <Page
                size="A4"
                style={styles.page}
            >

                <Text
                    fixed
                    style={styles.watermark}
                >
                    Embrogen
                </Text>

                <Text style={styles.title}>
                    SPERM MORPHOLOGY REPORT
                </Text>

                <Text
                    style={{
                        textAlign: "right",
                        marginBottom: 18,
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

                        <Text style={styles.label}>
                            Address
                        </Text>

                        <Text style={styles.value}>
                            {patient.address || "-"}
                        </Text>

                        <Text style={styles.label}>
                            Doctor
                        </Text>

                        <Text style={styles.value}>
                            {patient.doctor || "-"}
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

                <View
                    wrap={false}
                    style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                        marginBottom: 18,
                    }}
                >
                    <View
                        style={{
                            width: "65%",
                            paddingRight: 6,
                        }}
                    >

                        <PDFTable
                            title="Morphology Examination"
                            rows={[
                                {
                                    parameter: "Normal Forms",
                                    result: morphology.normal_forms_percent,
                                    unit: "%",
                                    reference: ">= 4",
                                },
                                {
                                    parameter: "Head Defects",
                                    result: morphology.head_defects_percent,
                                    unit: "%",
                                    reference: "-",
                                },
                                {
                                    parameter: "Midpiece Defects",
                                    result: morphology.midpiece_defects_percent,
                                    unit: "%",
                                    reference: "-",
                                },
                                {
                                    parameter: "Tail Defects",
                                    result: morphology.tail_defects_percent,
                                    unit: "%",
                                    reference: "-",
                                },
                                {
                                    parameter: "Pin Heads",
                                    result: morphology.pin_heads_percent,
                                    unit: "%",
                                    reference: "-",
                                },
                            ]}
                        />
                    </View>
                    <View
                        style={{
                            width: "35%",
                            justifyContent: "center",
                            alignItems: "center",
                            paddingLeft: 10,
                        }}
                    >
                        <MotilityPieChart
                            slices={[
                                {
                                    label: "Normal Forms",
                                    value: morphology.normal_forms_percent,
                                },
                                {
                                    label: "Head Defects",
                                    value: morphology.head_defects_percent,
                                },
                                {
                                    label: "Midpiece Defects",
                                    value: morphology.midpiece_defects_percent,
                                },
                                {
                                    label: "Tail Defects",
                                    value: morphology.tail_defects_percent,
                                },
                                {
                                    label: "Pin Heads",
                                    value: morphology.pin_heads_percent,
                                },
                            ]}
                        />
                    </View>

                </View>

                <View
                    wrap={false}
                    style={{
                        flexDirection: "row",
                        alignItems: "stretch",
                        marginBottom: 18,
                    }}
                >

                    <View
                        style={{
                            width: "65%",
                            paddingRight: 6,
                        }}
                    >

                        <PDFTable
                            title="Vitality"
                            rows={[
                                {
                                    parameter: "Live Sperm",
                                    result: morphology.live_sperm_percent,
                                    unit: "%",
                                    reference: ">= 58",
                                },
                                {
                                    parameter: "Dead Sperm",
                                    result: morphology.dead_sperm_percent,
                                    unit: "%",
                                    reference: "<= 42",
                                },
                            ]}
                        />

                    </View>

                    <View
                        style={{
                            width: "35%",
                            paddingLeft: 10,
                        }}
                    >
                        <MotilityPieChart
                            slices={[
                                {
                                    label: "Live Sperm",
                                    value: morphology.live_sperm_percent,
                                },
                                {
                                    label: "Dead Sperm",
                                    value: morphology.dead_sperm_percent,
                                },
                            ]}
                        />
                    </View>

                </View>

                <PDFTable
                    title="Additional Findings"
                    rows={[
                        {
                            parameter: "Fructose",
                            result: morphology.fructose,
                            unit: "-",
                            reference: "Present",
                        },
                        {
                            parameter: "Aggregation / Agglutination",
                            result: morphology.aggregation_agglutination,
                            unit: "-",
                            reference: "None",
                        },
                    ]}
                />

                <Text style={styles.sectionTitle}>
                    Comments
                </Text>

                <View
                    style={{
                        borderWidth: 1,
                        padding: 8,
                        marginBottom: 20,
                    }}
                >

                    <Text>
                        {morphology.comments || "-"}
                    </Text>

                </View>


                <View
                    style={{
                        marginTop: 40,
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
                                height: 60,
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
                                    marginTop: 15,
                                }}
                            >
                                Name: __________________
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

                <View
                    fixed
                    style={styles.footer}
                >
                    <Text style={styles.footerTitle}>
                        Embrogen
                    </Text>

                    <Text style={styles.footerText}>
                        Advanced Fertility & Andrology Laboratory
                    </Text>

                    <Text style={styles.footerText}>
                        Phone: +91 XXXXX XXXXX | Email: info@embrogen.com
                    </Text>
                </View>

                <Text
                    fixed
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `Page ${pageNumber} of ${totalPages}`
                    }
                />

            </Page>
        </Document>
    );
}