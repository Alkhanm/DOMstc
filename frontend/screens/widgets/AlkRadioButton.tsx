import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import LayoutCss from "../../constants/Layout.css";
import { Text } from "./Themed";


type fn = (value: boolean) => void;

interface AlkRadioButtonProps {
    label: string;
    value: boolean;
    callback: fn[];
    onAction: fn;
}

export const AlkRadioButton: React.FC<AlkRadioButtonProps> = ({ label, value, callback, onAction }) => {

    useEffect(() => {
        if (value) callback.filter(f => f !== onAction).forEach(f => f(false))
    }, [value])

    return (
        <TouchableOpacity onPress={() => onAction(!value)} style={styles.container}>
            {value ?
                    <MaterialCommunityIcons name="radiobox-marked" style={styles.icon} />
                    :
                    <MaterialCommunityIcons name="radiobox-blank" style={styles.icon} />
            }
            <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 5,
        marginHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        borderBottomWidth: 2,
        borderColor: "#ffffff50"
    },
    label: {
        fontSize: 14,
        margin: 2,
        textTransform: "uppercase",
        fontWeight: "bold",
        opacity: 0.8
    },
    icon: {
        fontSize: 14,
        color: LayoutCss.isDarkTheme ? "white" : "black"
    }
})
