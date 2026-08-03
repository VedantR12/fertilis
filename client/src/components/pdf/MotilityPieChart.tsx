import {
    View,
    Text,
    Svg,
    Path,
    StyleSheet,
} from "@react-pdf/renderer";

interface PieSlice {
    label: string;
    value: number;
}

interface Props {
    slices: PieSlice[];
}

const COLORS = [
    "#2E7D32",
    "#43A047",
    "#7CB342",
    "#F9A825",
    "#FB8C00",
    "#EF5350",
    "#C62828",
    "#8E24AA",
];

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },

    title: {
        fontSize: 12,
        fontWeight: "bold",
        marginBottom: 10,
    },

    legend: {
        marginTop: 8,
        width: 120,
    },

    legendRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
    },

    legendColor: {
        width: 10,
        height: 10,
        marginRight: 8,
    },

    legendText: {
        fontSize: 8,
    },
});

function polarToCartesian(
    cx: number,
    cy: number,
    r: number,
    angle: number
) {
    const rad = ((angle - 90) * Math.PI) / 180;

    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function describeArc(
    cx: number,
    cy: number,
    r: number,
    startAngle: number,
    endAngle: number
) {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);

    const largeArc =
        endAngle - startAngle <= 180 ? 0 : 1;

    return `
M ${cx} ${cy}
L ${start.x} ${start.y}
A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}
Z
`;
}

export default function MotilityPieChart({
    slices,
}: Props) {

    let currentAngle = 0;

    return (
        <View style={styles.container} wrap={false}>

            <Svg
                width={120}
                height={120}
                viewBox="0 0 120 120"
            >

                {slices.map((slice, index) => {

                    const value = slice.value;

                    const sweep = value * 3.6;

                    const path = describeArc(
                        60, 60, 45,
                        currentAngle,
                        currentAngle + sweep
                    );

                    currentAngle += sweep;

                    return (
                        <Path
                            key={index}
                            d={path}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#ffffff"
                            strokeWidth={1}
                        />
                    );
                })}

            </Svg>

            <View style={styles.legend}>

                {slices.map((slice, i) => (

                    <View
                        key={slice.label}
                        style={styles.legendRow}
                    >

                        <View
                            style={{
                                width: 8,
                                height: 8,
                                backgroundColor: COLORS[i % COLORS.length],
                                marginRight: 6,
                                borderWidth: 0.3,
                                borderColor: "#555",
                            }}
                        />

                        <Text style={styles.legendText}>
                            {slice.label} ({slice.value}%)
                        </Text>

                    </View>

                ))}

            </View>

        </View>
    );
}
