import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

import type { Sample } from "@/lib/schemas/sample";
import type { Patient } from "@/lib/schemas/patient";
import type { DFI } from "@/lib/schemas/dfi";
import DFIReferenceChart from "./DFIReferenceChart";
import PDFTable from "./PDFTable";
import MotilityPieChart from "./MotilityPieChart";

interface Props {
    sample: Sample;
    patient: Patient;
    dfi: DFI;
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
                    DNA FRAGMENTATION INDEX REPORT
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
                            paddingRight: 15,
                        }}
                    >

                        <PDFTable
                            title=""
                            rows={[
                                {
                                    parameter: "Non Fragmented",
                                    result: `${dfi.non_fragmented_count} (${nonFragmentedPercent}%)`,
                                    unit: "Count (%)",
                                    reference: ">70%",
                                },
                                {
                                    parameter: "Fragmented",
                                    result: `${dfi.fragmented_count} (${fragmentedPercent}%)`,
                                    unit: "Count (%)",
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
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
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
                                    result: `${dfi.large_halo_count} (${largeHaloPercent}%)`,
                                    unit: "Count (%)",
                                },
                                {
                                    parameter: "Medium Halo",
                                    result: `${dfi.medium_halo_count} (${mediumHaloPercent}%)`,
                                    unit: "Count (%)",
                                },
                                {
                                    parameter: "Small Halo",
                                    result: `${dfi.small_halo_count} (${smallHaloPercent}%)`,
                                    unit: "Count (%)",
                                },
                                {
                                    parameter: "No Halo",
                                    result: `${dfi.no_halo_count} (${noHaloPercent}%)`,
                                    unit: "Count (%)",
                                },
                                {
                                    parameter: "Degraded",
                                    result: `${dfi.degraded_count} (${degradedPercent}%)`,
                                    unit: "Count (%)",
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
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
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
                        padding: 8,
                        marginBottom: 20,
                        minHeight: 50,
                    }}
                >
                    <Text>
                        {dfi.remarks?.trim() || "-"}
                    </Text>
                </View>

                <View
                    style={{
                        marginTop: 35,
                        alignItems: "flex-end",
                    }}
                >

                    <Text
                        style={{
                            fontWeight: "bold",
                            marginBottom: 5,
                        }}
                    >
                        Tested By
                    </Text>

                    <Text
                        style={{
                            borderTopWidth: 1,
                            paddingTop: 4,
                            width: 120,
                            textAlign: "center",
                        }}
                    >
                        Signature
                    </Text>

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
                    style={styles.pageNumber}
                    fixed
                    render={({ pageNumber, totalPages }) =>
                        `Page ${pageNumber} of ${totalPages}`
                    }
                />

            </Page>

        </Document>

    );
}