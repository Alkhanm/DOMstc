import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps, View, ViewStyle } from "react-native";
import { blue, grey } from "../../../styles/color.css";
interface MvInputProps extends TextInputProps {
    value: string;
    placeholder: string;
    icon?: string;
    iconSize?: number;
    style?: ViewStyle | ViewStyle[];
}

export const AlkInput: React.FC<MvInputProps> = ({
    value,
    placeholder,
    icon,
    iconSize,
    style,
    children,
    ...rest
}) => {
    const [isTyping, setIsTyping] = useState<boolean>(false);

    const iconColor = (): string => {
        return isTyping ? blue.c : grey.darken;
    };

    return (
        <View style={[styles.container, isTyping ? styles.containerFocus : {}, style]}>
            <View style={styles.cardIcon}>
                <FontAwesome5 name={icon} size={iconSize || 25} color={iconColor()} style={styles.icon} />
            </View>
            <View style={styles.cardInput}>
                <View>
                    {(isTyping || Boolean(value.length)) && (
                        <Text style={styles.inputPlaceholder}>{placeholder.toUpperCase()}</Text>
                    )}
                </View>
                <TextInput
                    value={value}
                    onFocus={() => setIsTyping(true)}
                    onBlur={() => setIsTyping(false)}
                    style={styles.input}
                    placeholder={isTyping ? "" : placeholder}
                    {...rest}
                />
            </View>
            <View style={styles.children}>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        marginBottom: 15,
        flexDirection: "row",
        height: 50,
        padding: 5,
        width: "95%",
        borderBottomWidth: 1,
        borderColor: grey.lighten2,
    },
    icon: {
        marginHorizontal: 5
    },
    input: {
        fontSize: 16,
        color: "black",
        width: "80%",
    },
    cardInput: {
        flex: 1,
        justifyContent: "space-between",
        marginTop: 5,
    },
    cardIcon: {
        justifyContent: "flex-end",
    },
    children: {
        justifyContent: "flex-end",
        alignItems: "flex-end"
    },
    containerFocus: {
        backgroundColor: "#fff",
        elevation: 1,
        shadowRadius: 10,
        shadowColor: grey.lighten5,
        borderColor: blue.lighten2,
    },
    inputPlaceholder: {
        opacity: 0.5,
        fontSize: 12,
        fontWeight: "bold",
        color: blue.darken2,
    },
});
