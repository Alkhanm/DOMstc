import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View, ViewProps } from "../widgets/Themed";

interface AlkInfoProps extends ViewProps {
    value: string | number;
    label?: string;
    icon?: React.ComponentProps<typeof Icons>['name'];
}

export const AlkInfo: React.FC<AlkInfoProps> = ({ label, value, icon, ...rest }) => {

    return (
        <View style={[styles.container]}>
            {icon && <Icons name={icon} size={25} color={"white"} />}
            {label && <Text style={[styles.label]} >{label}</Text>}
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        flexDirection: "row",
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