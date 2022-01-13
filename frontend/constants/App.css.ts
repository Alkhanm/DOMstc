import { StyleSheet } from 'react-native';
import ColorsCss from "./Colors.css";
import LayoutCss from "./Layout.css";

export const appCss = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    card: {
        flex: 1,
        width: "95%",
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#ffffff50",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    actionText: {
        margin: 5,
        flexDirection: "row",
        fontSize: 12,
        textTransform: "uppercase",
        color: LayoutCss.isDarkTheme ? "white" : "black",
        fontWeight: "bold",
        opacity: 0.9,
    },
    subtitle: {
        paddingLeft: 5,
        fontSize: 18,
        opacity: 0.7
    },
    infoText: {
        fontSize: 17,
        elevation: 6,
        opacity: 0.7,
    },
    infoText2: {
        fontSize: 14,
        elevation: 6,
        opacity: 0.6,
        paddingHorizontal: 10
    },
    infoText3: {
        fontSize: 15,
        opacity: 0.7,
        paddingHorizontal: 10
    },
    infoText4: {
        fontSize: 13,
        color: ColorsCss.grey.darken,
        paddingHorizontal: 10
    },
    textIcon: {
        margin: 5,
        alignSelf: "center",
        flexDirection: "row",
        alignItems: "center",
    },
})