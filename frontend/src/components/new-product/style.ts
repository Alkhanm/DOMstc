import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10
    },
    photo: {
        width: 120,
        height: 120,
        borderWidth: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10
    },
    fields: {
        flex: 1,
        width: "100%",
        padding: 15,
        borderWidth: 0.5,
        justifyContent: "flex-start"
    },
    field: {
        flex: 1,
        marginBottom: 10
    },
    buttons: {
        marginTop: 5,
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    button: {
        height: 100,
        backgroundColor: "gray"
    }
})