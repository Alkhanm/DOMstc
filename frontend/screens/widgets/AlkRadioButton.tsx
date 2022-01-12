import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { Text } from "./Themed";

interface AlkRadioButtonProps extends TouchableOpacityProps {
    label: string;
    value: boolean;
    onAction: (value: boolean) => void;
}

export const AlkRadioButton: React.FC<AlkRadioButtonProps> = ({ label, value, onAction }) => {
    return (
        <TouchableOpacity onPress={() => onAction(!value)} style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            {value ?
                <MaterialCommunityIcons name="radiobox-blank" style={styles.icon} />
                :
                <MaterialCommunityIcons name="radiobox-marked" style={styles.icon} />}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: ColorsCss.grey.darken3,
        margin: 1,
        padding: 2
    },
    label: {
        fontSize: 12,
        margin: 2
    },
    icon: {
        fontSize: 14,
        color: LayoutCss.isDarkTheme ? "white" : "black"
    }
})
