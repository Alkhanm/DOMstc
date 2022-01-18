import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import ColorsCss from "../../constants/Colors.css";
import { Text } from "./Themed";

export interface AlkRadioButtonItem {
    text: string;
    value: any;
}

interface AlkRadioButtonProps {
    items: AlkRadioButtonItem[];
    defaultSelect?: any;
    onSelectChange: (value: any) => void;
}

export const AlkRadioButton: React.FC<AlkRadioButtonProps> =
    ({ items, onSelectChange, defaultSelect = items[0].value }) => {
        const [selectedValue, setSelectedValue] = useState<any>()

        function handlerSelect(item: AlkRadioButtonItem) {
            onSelectChange(item.value);
            setSelectedValue(item);
        }

        useEffect(() => {
            setSelectedValue(items.find(i => i.value == defaultSelect))
        }, [])

        return (
            <FlatList
                keyExtractor={(e) => e.text}
                overScrollMode="always"
                style={{
                    maxHeight: 200,
                    width: "80%",
                }}
                data={items}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={_ => handlerSelect(item)} style={styles.radioItem}>
                        {selectedValue === item ?
                            <>
                                <MaterialCommunityIcons name="radiobox-marked" style={styles.iconSelected} />
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.labelSelected}>{item.text}</Text>
                            </>
                            :
                            <>
                                <MaterialCommunityIcons name="radiobox-blank" style={styles.icon} />
                                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.label}>{item.text}</Text>
                            </>
                        }
                    </TouchableOpacity>
                )}

            />
        );
    }
/* <View style={vertical ? styles.vertical : {}}>
    {items.map(e =>
        <TouchableOpacity key={e} onPress={_ => handlerSelect(e)} style={styles.radioItem}>
            {selectedValue === e ?
                <MaterialCommunityIcons name="radiobox-marked" style={styles.icon} />
                :
                <MaterialCommunityIcons name="radiobox-blank" style={styles.icon} />
            }
            <Text style={styles.label}>{e}</Text>
        </TouchableOpacity>
    )}
</View>*/
const styles = StyleSheet.create({
    vertical: {
        padding: 5,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    radioItem: {
        marginTop: 5,
        flexDirection: "row",
        alignItems: "center",
    },
    label: {
        fontSize: 13,
        margin: 2,
        textTransform: "uppercase",
        fontWeight: "bold",
        color: ColorsCss.grey.lighten,
    },
    icon: {
        fontSize: 16,
        color: ColorsCss.grey.lighten,
    },
    labelSelected: {
        fontSize: 13,
        margin: 2,
        textTransform: "uppercase",
        fontWeight: "bold",
    },
    iconSelected: {
        fontSize: 16,
        color: "white"
    }
})
