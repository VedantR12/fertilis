import {
    View,
    Text,
    StyleSheet,
} from "@react-pdf/renderer";

interface Props {
    dfi: number;
}

const styles = StyleSheet.create({

    container: {
        marginTop: 10,
        marginBottom: 18,
    },

    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 6,
    },

    subtitle: {
        fontSize: 8,
        color: "#555",
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },

    label: {
        width: 65,
        fontSize: 9,
        fontWeight: "bold",
    },

    range: {
        width: 55,
        fontSize: 9,
        textAlign: "center",
    },

    track: {
        width: 240,
        height: 12,
        backgroundColor: "#ececec",
        borderWidth: 0.5,
        borderColor: "#999",
    },

    patientBox: {
        marginTop: 14,
        borderWidth: 0.6,
        borderColor: "#8ab4ff",
        backgroundColor: "#f6f9ff",
        padding: 10,
        borderRadius: 3,
    },

    patientTitle: {
        fontSize: 10,
        fontWeight: "bold",
        marginBottom: 8,
    },

    patientTrack: {
        width: 260,
        height: 14,
        borderWidth: 0.6,
        borderColor: "#777",
        backgroundColor: "#efefef",
        position: "relative",
    },

    marker: {
        position: "absolute",
        top: -18,
        fontSize: 8,
        fontWeight: "bold",
        color: "#0d47a1",
    },

    axis: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: 260,
        marginTop: 4,
    },

    axisText: {
        fontSize: 7,
        color: "#555",
    },

});

export default function DFIReferenceChart({
    dfi,
}: Props) {


    const patientColor =
        dfi <= 15
            ? "#2E7D32"
            : dfi <= 25
                ? "#7CB342"
                : dfi <= 35
                    ? "#F9A825"
                    : "#D32F2F";

    return (

        <View
            style={styles.container}
            wrap={false}
        >

            <Text style={styles.title}>
                DNA Fragmentation Index Reference
            </Text>

            {/* Excellent */}

            <View style={styles.row}>

                <Text style={styles.label}>
                    Excellent
                </Text>

                <Text style={styles.range}>
                    0–15%
                </Text>

                <View style={styles.track}>

                    <View
                        style={{
                            width: "15%",
                            height: "100%",
                            backgroundColor: "#2E7D32",
                        }}
                    />

                </View>

            </View>

            {/* Good */}

            <View style={styles.row}>

                <Text style={styles.label}>
                    Good
                </Text>

                <Text style={styles.range}>
                    15–25%
                </Text>

                <View style={styles.track}>

                    <View
                        style={{
                            width: "25%",
                            height: "100%",
                            backgroundColor: "#7CB342",
                        }}
                    />

                </View>

            </View>

            {/* Fair */}

            <View style={styles.row}>

                <Text style={styles.label}>
                    Fair
                </Text>

                <Text style={styles.range}>
                    25–35%
                </Text>

                <View style={styles.track}>

                    <View
                        style={{
                            width: "35%",
                            height: "100%",
                            backgroundColor: "#F9A825",
                        }}
                    />

                </View>

            </View>

            {/* Poor */}

            <View style={styles.row}>

                <Text style={styles.label}>
                    Poor
                </Text>

                <Text style={styles.range}>
                    35–100%
                </Text>

                <View style={styles.track}>

                    <View
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#c12020",
                        }}
                    />

                </View>

            </View>

            {/* Patient */}

            <View style={styles.patientBox}>

                <Text style={styles.patientTitle}>
                    Patient's DFI Result ({dfi.toFixed(1)}%)
                </Text>

                <View style={styles.patientTrack}>

                    <View
                        style={{
                            width: `${dfi}%`,
                            height: "100%",
                            backgroundColor: patientColor,
                        }}
                    />

                    

                </View>

                <View style={styles.axis}>

                    <Text style={styles.axisText}>
                        0
                    </Text>

                    <Text style={styles.axisText}>
                        15
                    </Text>

                    <Text style={styles.axisText}>
                        25
                    </Text>

                    <Text style={styles.axisText}>
                        35
                    </Text>

                    <Text style={styles.axisText}>
                        50
                    </Text>

                    <Text style={styles.axisText}>
                        75
                    </Text>

                    <Text style={styles.axisText}>
                        100
                    </Text>

                </View>

            </View>

        </View>

    );

}