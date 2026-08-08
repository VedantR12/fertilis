import {
    View,
    Text,
    Svg,
    Rect,
    StyleSheet,
} from "@react-pdf/renderer";

interface BarData {
    label: string;
    value: number;
    color?: string;
}

interface Props {
    data: BarData[];
}

const DEFAULT_COLORS = [
    "#b92579",
    "#08B5D3",
    "#24C45F",
    "#F67419",
    "#EE4646",
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
});

export default function BarChart({ data }: Props) {
    const chartWidth = 250;
    const chartHeight = 200;

    const leftPadding = 5;
    const bottomPadding = 30;
    const topPadding = 10;

    const usableHeight =
        chartHeight - topPadding - bottomPadding;

    const barWidth = 25;
    const gap = 20;

    const totalBarsWidth =
        data.length * barWidth +
        (data.length - 1) * gap;

    const startX =
        (chartWidth - totalBarsWidth) / 2;

    return (
        <View style={styles.container} wrap={false}>

            <Svg
                width={chartWidth}
                height={usableHeight}
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            >

                <Rect
                    x={leftPadding}
                    y={topPadding + usableHeight}
                    width={chartWidth - leftPadding}
                    height={1}
                    fill="#888"
                />

                {data.map((item, index) => {

                    const height =
                        (item.value / 100) * usableHeight;

                    const x =
                        startX +
                        index * (barWidth + gap);

                    const y =
                        topPadding +
                        usableHeight -
                        height;

                    return (
                        <>
                            <Rect
                                key={item.label}
                                x={x}
                                y={y}
                                width={barWidth}
                                height={height}
                                fill={
                                    item.color ??
                                    DEFAULT_COLORS[index]
                                }
                            />

                            <Text
                                x={x + barWidth / 2 - 7}
                                y={y - 4}
                                style={{
                                    fontSize: 11,
                                }}
                            >
                                {item.value}%
                            </Text>

                            <Text
                                x={x + barWidth / 2}
                                y={chartHeight - 6}
                                style={{
                                    fontSize: 11,
                                    textAnchor: "middle",
                                }}
                            >
                                {item.label}
                            </Text>
                        </>
                    );

                })}

            </Svg>

        </View>
    );
}