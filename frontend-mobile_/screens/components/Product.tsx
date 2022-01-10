import React from 'react';
import { Appearance, Image, StyleSheet } from 'react-native';
import { IProduct } from "../../domain/interfaces/IProduct";
import { AlkButton } from "../widgets/AlkButton";
import { Text, View } from "../widgets/Themed";


export default function Product({ product }: { product: IProduct }) {
    return (
        <View style={styles.container}>
            <View style={[styles.info, styles.descriptionView]}>
                <Text style={styles.descriptionText}>{product.description}</Text>
            </View>
            <View style={styles.content}>
                <View>
                    <Image source={{ uri: product.imageURL }} style={styles.img} />
                </View>
                <View style={styles.infos}>
                    <View style={[styles.info]}>
                        <Text>{product.company}</Text>
                    </View>
                    <View style={[styles.info]}>
                        <Text>{product.brand}</Text>
                    </View>
                    <View style={[styles.info]}>
                        <Text>{product.quantity}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <AlkButton onPress={() => { }}
                    children={<Text> Ação 1</Text>} />
                <AlkButton onPress={() => { }}
                    children={<Text> Ação 2</Text>} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 250,
        marginHorizontal: 5,
        marginVertical: 15,
        padding: 10,
        justifyContent: 'center',
        borderWidth: 0.6,
        borderColor: Appearance.getColorScheme() === "dark" ? "#eee" : "rgba(255,255,255,0.1)"
    },
    content: {
        flex: 1,
        alignItems: "center",
        flexDirection: "row"
    },
    img: {
        width: 120,
        height: 120
    },
    descriptionView: {
        alignItems: "center"
    },
    descriptionText: {
        fontSize: 15,
        textTransform: "uppercase",
        fontWeight: 'bold',
    },
    infos: {
        flex: 1,
        justifyContent: "center"
    },
    info: {
        flex: 1,
        marginHorizontal: 15,
    },
    action: {

    },
    actions: {
        flex: 1,
        marginHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 15,
    }
});