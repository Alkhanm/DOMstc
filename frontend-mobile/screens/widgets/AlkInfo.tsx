import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import React from 'react';
import { StyleSheet, TextStyle } from "react-native";
import { Text, View, ViewProps } from "../widgets/Themed";

interface AlkInfoProps extends ViewProps {
    value: string | number;
    label?: string;
    icon?: React.ComponentProps<typeof Icons>['name'];
    labelStyle?: TextStyle;
    textStyle?: TextStyle;
}

export const AlkInfo: React.FC<AlkInfoProps> = ({ label, value, icon, labelStyle, textStyle, ...rest }) => {

    return (
        <View style={[styles.container, rest.style]}>
            {icon && <Icons name={icon} size={25} color={"white"} />}
            {label && <Text style={[styles.label, labelStyle]} >{label}</Text>}
            <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.value, textStyle]}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        paddingHorizontal: 5,
        opacity: 0.7
    },
    value: {
        flex: 1,
        flexDirection: "row",
        fontSize: 12,
    }
})