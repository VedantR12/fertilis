import {
    Page,
    View,
    Text,
    Image,
    StyleSheet,
} from "@react-pdf/renderer";

import logo from "@/assets/embrogen-logo.png";

export const HEADER_HEIGHT = 140;
export const FOOTER_HEIGHT = 40;
export const PAGE_PADDING = 30;

const styles = StyleSheet.create({

    page: {
        paddingTop: HEADER_HEIGHT,
        paddingBottom: FOOTER_HEIGHT,
        paddingHorizontal: PAGE_PADDING,
        fontSize: 10,
        fontFamily: "Helvetica",
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

    footer: {
        position: "absolute",

        bottom: 12,
        left: PAGE_PADDING,
        right: PAGE_PADDING,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    pageNumber: {
        fontSize: 8,
        color: "grey",
    },

    logo: {
        width: 90,
        height: 45,
        objectFit: "contain",
    },

});

interface Props {
    children: React.ReactNode;
}

export default function PDFLayout({
    children,
}: Props) {

    return (

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

            {children}

            <View
                fixed
                style={styles.footer}
            >

                <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                        `Page ${pageNumber} of ${totalPages}`
                    }
                />

                <Image
                    src={logo}
                    style={styles.logo}
                />

            </View>

        </Page>

    );

}