import { useNavigation } from "@react-navigation/native";
import React from 'react';
import { Appearance, Image, StyleSheet } from 'react-native';
import { IProduct } from "../../domain/interfaces/IProduct";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInfo } from "../widgets/AlkInfo";
import { Text, View } from "../widgets/Themed";


export default function Product({ product }: { product: IProduct }) {
    const { navigate } = useNavigation()

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
                        <AlkInfo label="Código" value={product.code} icon="barcode" />
                    </View>
                    <View style={[styles.info]}>
                        <AlkInfo label="Fabricante" value={product.company} icon="account" />
                    </View>
                    <View style={[styles.info]}>
                        <AlkInfo label="Marca" value={product.brand} icon="bag-carry-on" />
                    </View>
                    <View style={[styles.info]}>
                        <AlkInfo label="Quantidade" value={product.quantity} icon="warehouse" />
                    </View>
                </View>
            </View>
            <View style={styles.actions}>
                <AlkButton propStyle={styles.action} onPress={() => navigate('ProductDetail', { code: product.code })}
                    children={<Text>Detalhes</Text>} />
                <AlkButton propStyle={styles.action} onPress={() => navigate("ProductEdit", { code: product.code })}
                    children={<Text>Editar</Text>} />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 200,
        margin: 5,
        paddingHorizontal: 10,
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
        width: 100,
        height: 100
    },
    descriptionView: {
        alignItems: "center"
    },
    descriptionText: {
        fontSize: 13,
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
        width: "45%",
        height: 30,
    },
    actions: {
        flex: 1,
        marginHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingTop: 5,
    }
});