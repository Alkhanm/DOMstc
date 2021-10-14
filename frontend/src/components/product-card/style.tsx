import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        borderWidth: 0.5,
        width: "95%",
        paddingVertical: 2,
        paddingHorizontal: 10,
        justifyContent: "center",
    },
    infoTable: {
        flexDirection: "row",
        alignItems: "center"
    },
    infos: {
        flex: 1,
    },
    description: {
        fontWeight: "bold",
        opacity: 0.8,
        padding: 5,
        backgroundColor: "red"
    },
})