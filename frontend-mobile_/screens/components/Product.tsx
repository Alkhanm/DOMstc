import React from 'react';
import { Appearance, StyleSheet } from 'react-native';
import { IProduct } from "../../domain/interfaces/IProduct";
import { AlkButton } from "../widgets/AlkButton";
import { Text, View } from "../widgets/Themed";


export default function Product({ product }: { product: IProduct }) {
    return (
        <View style={styles.container}>
            <View style={[styles.infos, styles.descriptionView]}>
                <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
            <View style={{ width: 100, height: 100 }}>
            </View>
            <View>
                <View style={[styles.infos]}>
                    <Text>{product.company}</Text>
                </View>
                <View style={[styles.infos]}>
                    <Text>{product.brand}</Text>
                </View>
                <View style={[styles.infos]}>
                    <Text>{product.quantity}</Text>
                </View>
                <View style={styles.actions}>
                    <AlkButton onPress={() => { }}
                        children={<Text> Ação 1</Text>} />
                    <AlkButton onPress={() => { }}
                        children={<Text> Ação 2</Text>} />
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10,
        justifyContent: 'center',
        borderWidth: 0.6,
        borderColor: Appearance.getColorScheme() === "dark" ? "#eee" : "rgba(255,255,255,0.1)"
    },
    img: {
        width: 100,
        height: 100
    },
    infos: {
        flex: 1,
        justifyContent: "center",
        marginHorizontal: 15,

    },
    descriptionView: {
        alignItems: "center"
    },
    descriptionText: {
        fontSize: 15,
        textTransform: "uppercase",
        fontWeight: 'bold',
    },
    action: {

    },
    actions: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
    }
});