import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { Text } from "./Themed";


type fn = (value: boolean) => void;

interface AlkCheckBoxProps extends TouchableOpacityProps {
    label: string;
    value: any;
    onAction: Function;
}

export const AlkCheckBox: React.FC<AlkCheckBoxProps> = ({ label, value, onAction, ...rest }) => {


    return (
        <TouchableOpacity onPress={() => onAction(!value)} style={styles.container} {...rest}>
            <Text style={styles.label}>{label}</Text>
            {
                value ?
                    <MaterialCommunityIcons name="checkbox-marked-outline" style={styles.icon} />
                    :
                    <MaterialCommunityIcons name="checkbox-blank-outline" style={styles.icon} />
            }
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 78,
        height: 45,
        backgroundColor: ColorsCss.grey.darken3,
        margin: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
