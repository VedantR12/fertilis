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
    "#F67419",
    "#C62828",
    "#08B5D3",
    "#FB8C00",
    "#EE4646",
    "#EF5350",
    "#0689ee",
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

function describeDonutArc(
    cx: number,
    cy: number,
    outerRadius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number
) {
    const outerStart = polarToCartesian(cx, cy, outerRadius, endAngle);
    const outerEnd = polarToCartesian(cx, cy, outerRadius, startAngle);

    const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
    const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);

    const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

    return `
        M ${outerStart.x} ${outerStart.y}
        A ${outerRadius} ${outerRadius} 0 ${largeArc} 0 ${outerEnd.x} ${outerEnd.y}
        L ${innerStart.x} ${innerStart.y}
        A ${innerRadius} ${innerRadius} 0 ${largeArc} 1 ${innerEnd.x} ${innerEnd.y}
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
                width={170}
                height={170}
                viewBox="0 0 170 170"
            >

                {slices.map((slice, index) => {

                    const value = slice.value;

                    const gap = 2;

                    const sweep = Math.max(
                        value * 3.6 - gap,
                        0
                    );

                    const path = describeDonutArc(
                        85,
                        85,
                        65,
                        35,
                        currentAngle,
                        currentAngle + sweep
                    );

                    currentAngle += sweep + gap;

                    return (
                        <Path
                            key={index}
                            d={path}
                            fill={COLORS[index % COLORS.length]}
                            stroke="#F3F4F6"
                            strokeWidth={1}
                        />
                    );
                })}

                <Path
    d="
        M 85 50
        A 35 35 0 1 1 84.9 50
        Z
    "
    fill="#ffffff"
/>

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
