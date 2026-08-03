import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    section: {
        marginBottom: 14,
    },

    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 6,
    },

    header: {
        flexDirection: "row",
        backgroundColor: "#eeeeee",
        borderWidth: 1,
        borderBottomWidth: 0,
    },

    row: {
        flexDirection: "row",
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth: 1,
    },

    parameterCell: {
        width: "40%",
        padding: 5,
        fontSize: 10,
    },

    resultCell: {
        width: "20%",
        padding: 5,
        fontSize: 10,
        textAlign: "center",
    },

    unitCell: {
        width: "15%",
        padding: 5,
        fontSize: 10,
        textAlign: "center",
    },

    referenceCell: {
        width: "25%",
        padding: 5,
        fontSize: 10,
        textAlign: "center",
    },

    parameterHeader: {
        width: "40%",
        padding: 5,
        fontSize: 10,
        fontWeight: "bold",
    },

    resultHeader: {
        width: "20%",
        padding: 5,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
    },

    unitHeader: {
        width: "15%",
        padding: 5,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
    },

    referenceHeader: {
        width: "25%",
        padding: 5,
        fontSize: 10,
        fontWeight: "bold",
        textAlign: "center",
    },
});

interface Row {
    parameter: string;
    result: string | number | null | undefined;
    unit: string;
    reference?: string;
}

interface Props {
    title: string;
    rows: Row[];
}

export default function PDFTable({ title, rows }: Props) {
    return (
        <View
            style={styles.section}
            wrap={false}
        >

            <Text style={styles.title}>
                {title}
            </Text>

            <View style={styles.header}>
                <Text style={styles.parameterHeader}>Parameter</Text>
                <Text style={styles.resultHeader}>Result</Text>
                <Text style={styles.unitHeader}>Unit</Text>
            </View>

            {rows.map((row) => (
                <View style={styles.row} key={row.parameter}>
                    <Text style={styles.parameterCell}>
                        {row.parameter}
                    </Text>

                    <Text style={styles.resultCell}>
                        {row.result ?? "-"}
                    </Text>

                    <Text style={styles.unitCell}>
                        {row.unit}
                    </Text>

                    <Text style={styles.referenceCell}>
                        {row.reference ?? "-"}
                    </Text>
                </View>
            ))}

        </View>
    );
}