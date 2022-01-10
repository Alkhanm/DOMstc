import Icons from "@expo/vector-icons/MaterialCommunityIcons";
import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "../widgets/Themed";

type AlkInfoProps = {
    label?: string;
    value: string | number;
    icon: React.ComponentProps<typeof Icons>['name'];
}

export const AlkInfo: React.FC<AlkInfoProps> = ({ label, value, icon }) => {
    return (
        <View style={styles.container}>
            <Icons name={icon} size={25} color={"white"} />
            {label && <Text style={styles.label}>{label}</Text>}
            <Text style={styles.value}>{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 12,
        padding: 5,
        opacity: 0.7
    },
    value: {

    }
})