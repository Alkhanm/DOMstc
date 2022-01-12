import React from 'react';
import { StyleSheet } from "react-native";
import { AlkRadioButton } from "./AlkRadioButton";
import { View } from "./Themed";

type item = {
    label: string;
    value: boolean;
    setValue: (value: boolean) => void;
}

interface AlkRadioButtonGroupProps {
    items: item[]
}

export const AlkRadioButtonGroup: React.FC<AlkRadioButtonGroupProps> = ({ items }) => {

    const callbacks = items.map(i => i.setValue);

    return (
        <View style={styles.container}>
            {
                items.map((item) =>
                    <AlkRadioButton key={item.label} label={item.label} value={item.value} callback={callbacks} onAction={item.setValue} />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    radioButton: {
        flex: 1,
    }
})