import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    modalView: {
        flex: 1,
        backgroundColor: "black"
    },
    barCodeBox: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    barCodeText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
        paddingHorizontal: 50,
    },
    closeScan: {
        paddingHorizontal: 50,
        backgroundColor: 'rgba(52, 52, 52, 0.3)',
    },
    button: {

    },
})