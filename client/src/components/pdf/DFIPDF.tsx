import {
    Document,
    Text,
    View,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";

import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { DFI } from "@/lib/schemas/dfi";
import DFIReferenceChart from "./DFIReferenceChart";
import PDFTable from "./PDFTable";
import MotilityPieChart from "./MotilityPieChart";
import PDFLayout from "./PDFLayout";
import haloReference from "@/assets/dfi.png";

interface Props {
    sample: Sample;
    patient: Patient;
    dfi: DFI;
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
        marginBottom: 16,
    },

    title: {
        fontSize: 18,
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
    referenceTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 18,
    },

    referenceImage: {
        width: 250,
        height: "auto",
        alignSelf: "center",
    },

    referenceCaption: {
        marginTop: 12,
        fontSize: 9,
        color: "#555",
        textAlign: "center",
    },
});

export default function DFIPDF({
    sample,
    patient,
    dfi,
}: Props) {

    const reportDate = new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(new Date());

    const fragmentationTotal =
        dfi.non_fragmented_count +
        dfi.fragmented_count;

    const nonFragmentedPercent =
        fragmentationTotal
            ? (
                dfi.non_fragmented_count /
                fragmentationTotal *
                100
            ).toFixed(1)
            : "0.0";

    const fragmentedPercent =
        fragmentationTotal
            ? (
                dfi.fragmented_count /
                fragmentationTotal *
                100
            ).toFixed(1)
            : "0.0";

    const dfiValue =
        fragmentationTotal
            ? (
                dfi.fragmented_count /
                fragmentationTotal *
                100
            )
            : 0;

    const haloTotal =
        dfi.large_halo_count +
        dfi.medium_halo_count +
        dfi.small_halo_count +
        dfi.no_halo_count +
        dfi.degraded_count;

    const largeHaloPercent =
        haloTotal
            ? (
                dfi.large_halo_count /
                haloTotal *
                100
            ).toFixed(1)
            : "0.0";

    const mediumHaloPercent =
        haloTotal
            ? (
                dfi.medium_halo_count /
                haloTotal *
                100
            ).toFixed(1)
            : "0.0";

    const smallHaloPercent =
        haloTotal
            ? (
                dfi.small_halo_count /
                haloTotal *
                100
            ).toFixed(1)
            : "0.0";

    const noHaloPercent =
        haloTotal
            ? (
                dfi.no_halo_count /
                haloTotal *
                100
            ).toFixed(1)
            : "0.0";

    const degradedPercent =
        haloTotal
            ? (
                dfi.degraded_count /
                haloTotal *
                100
            ).toFixed(1)
            : "0.0";

    return (

        <Document>

            <PDFLayout>



                <Text style={styles.title}>
                    DNA FRAGMENTATION INDEX REPORT
                </Text>

                <Text
                    style={{
                        textAlign: "right",
                        marginBottom: 10,
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
                        <Text style={styles.label}>Patient Code</Text>
                        <Text style={styles.value}>
                            {patient.patient_code}
                        </Text>

                        <Text style={styles.label}>Patient Name</Text>
                        <Text style={styles.value}>
                            {patient.first_name} {patient.last_name}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Age</Text>
                        <Text style={styles.value}>
                            {patient.age} Years
                        </Text>

                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>
                            {patient.phone || "-"}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>
                            {patient.address || "-"}
                        </Text>

                        <Text style={styles.label}>Doctor</Text>
                        <Text style={styles.value}>
                            {patient.doctor || "-"}
                        </Text>
                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    Sample Information
                </Text>

                <View style={styles.table}>

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
                        <Text style={styles.label}>
                            Abstinence
                        </Text>

                        <Text style={styles.value}>
                            {sample.abstinence_days} Days
                        </Text>

                        <Text style={styles.label}>
                            Collection Method
                        </Text>

                        <Text style={styles.value}>
                            {sample.collection_method || "-"}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>
                            Collection Place
                        </Text>

                        <Text style={styles.value}>
                            {sample.collection_place || "-"}
                        </Text>

                        <Text style={styles.label}>
                            Remarks
                        </Text>

                        <Text style={styles.value}>
                            {sample.remarks || "-"}
                        </Text>
                    </View>

                </View>

                <View style={styles.tableSpacing}>

                    <View
                        wrap={false}
                        style={{
                            marginTop: 20,
                        }}
                    >

                        <PDFTable
                            title="General Information"
                            rows={[
                                {
                                    parameter: "Volume",
                                    result: dfi.volume_ml,
                                    unit: "mL",
                                    reference: "≥ 1.4",
                                },
                                {
                                    parameter: "Liquefaction",
                                    result: dfi.liquefaction_minutes,
                                    unit: "min",
                                    reference: "≤ 60",
                                },
                                {
                                    parameter: "Viscosity",
                                    result: dfi.viscosity,
                                    unit: "",
                                    reference: "Normal",
                                },
                                {
                                    parameter: "pH",
                                    result: dfi.ph,
                                    unit: "",
                                    reference: "7.2–8.0",
                                },
                                {
                                    parameter: "Sperm Concentration (Raw)",
                                    result: dfi.sperm_concentration_raw,
                                    unit: "Million/mL",
                                    reference: "-",
                                },
                            ]}
                        />
                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    DNA Fragmentation
                </Text>

                <View
                    wrap={false}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >

                    <View
                        style={{
                            flex: 1,
                            paddingRight: 10,
                            minWidth: 0,
                        }}
                    >

                        <PDFTable
                            title=""
                            rows={[
                                {
                                    parameter: "Non Fragmented",
                                    result: `${nonFragmentedPercent}%`,
                                    unit: "%",
                                    reference: ">70%",
                                },
                                {
                                    parameter: "Fragmented",
                                    result: `${fragmentedPercent}%`,
                                    unit: "%",
                                    reference: "<30%",
                                },
                                {
                                    parameter: "Total Cells Counted",
                                    result: fragmentationTotal,
                                    unit: "Cells",
                                    reference: "",
                                },
                            ]}
                        />

                    </View>

                    <View
                        style={{
                            width: 170,
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >


                        <MotilityPieChart
                            slices={[
                                {
                                    label: "Non Fragmented",
                                    value: Number(nonFragmentedPercent),
                                },
                                {
                                    label: "Fragmented",
                                    value: Number(fragmentedPercent),
                                },
                            ]}
                        />

                    </View>

                </View>

                <DFIReferenceChart
                    dfi={dfiValue}
                />

                <Text style={styles.sectionTitle}>
                    Halo Classification
                </Text>

                <View
                    wrap={false}
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 20,
                    }}
                >

                    <View
                        style={{
                            flex: 1,
                            paddingRight: 15,
                        }}
                    >

                        <PDFTable
                            title=""
                            rows={[
                                {
                                    parameter: "Large Halo",
                                    result: `${largeHaloPercent}%`,
                                    unit: "%",
                                },
                                {
                                    parameter: "Medium Halo",
                                    result: `${mediumHaloPercent}%`,
                                    unit: "%",
                                },
                                {
                                    parameter: "Small Halo",
                                    result: `${smallHaloPercent}%`,
                                    unit: "%",
                                },
                                {
                                    parameter: "No Halo",
                                    result: `${noHaloPercent}%`,
                                    unit: "%",
                                },
                                {
                                    parameter: "Degraded",
                                    result: `${degradedPercent}%`,
                                    unit: "%",
                                },
                                {
                                    parameter: "Total Cells Counted",
                                    result: haloTotal,
                                    unit: "Cells",
                                    reference: "",
                                },
                            ]}
                        />

                    </View>

                    <View
                        style={{
                            width: 170,
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                        }}
                    >

                        <MotilityPieChart
                            slices={[
                                {
                                    label: "Large Halo",
                                    value: Number(largeHaloPercent),
                                },
                                {
                                    label: "Medium Halo",
                                    value: Number(mediumHaloPercent),
                                },
                                {
                                    label: "Small Halo",
                                    value: Number(smallHaloPercent),
                                },
                                {
                                    label: "No Halo",
                                    value: Number(noHaloPercent),
                                },
                                {
                                    label: "Degraded",
                                    value: Number(degradedPercent),
                                },
                            ]}
                        />

                    </View>

                </View>

                <Text style={styles.sectionTitle}>
                    Laboratory Remarks
                </Text>

                <View
                    style={{
                        borderWidth: 1,
                        padding: 6,
                        marginBottom: 12,
                        minHeight: 20,
                    }}
                >
                    <Text>
                        {dfi.remarks?.trim() || "-"}
                    </Text>
                </View>



            </PDFLayout>
            <PDFLayout>

                <Text style={styles.referenceTitle}>
                    Representative Halo Classification
                </Text>

                <Image
                    src={haloReference}
                    style={styles.referenceImage}
                />

                <Text style={styles.referenceCaption}>
                    Figure 1. Representative sperm showing Large Halo,
                    Medium Halo, Small Halo, No Halo and Degraded
                    morphology.
                </Text>

                <View
                    style={{
                        marginTop: 250,
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
                                    marginTop: 8,
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