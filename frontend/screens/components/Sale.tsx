import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { ProductsDumb } from "../../domain/dumb";
import { IProduct } from "../../domain/interfaces/IProduct";
import { AlkBarcodeReader } from "../widgets/AlkBarcodeReader";
import { AlkButton } from "../widgets/AlkButton";
import { Text, View } from "../widgets/Themed";
import { ProductCard } from "./ProductCard";


export const Sale: React.FC = () => {
    const [search, setSearch] = useState<string>("");

    const [productsAvailable, setProductAvailable] = useState<IProduct[]>(ProductsDumb);
    const [productToBeSold, setProductToBeSold] = useState<IProduct[]>([]);
    const [totalPrice, setTotalPrice] = useState(0)

    function getTotalPrice() {
        return productToBeSold
            .map(p => p.salePrice)
            .reduce((p1, p2) => p1 + p2, 0)
    }

    function addProductToSold(product: IProduct) {
        const alreadySelected = productToBeSold.some(p => p.code === product.code);
        if (!alreadySelected) productToBeSold.push(product);
        else {
            const selectedRemoved = productToBeSold.filter(p => p.code !== product.code);
            setProductToBeSold(selectedRemoved);
        }
        setTotalPrice(getTotalPrice())
    }

    function handlerSale() {
        console.log(productToBeSold)
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
            <View style={styles.searchSeaction}>
                <AlkBarcodeReader setValue={setSearch} />
                <View style={appCss.verticalSeparator} />
                <AlkButton
                    style={styles.searchBtn}
                    children={<MaterialCommunityIcons name="database-search" style={styles.searchIcon} />}
                />
            </View>
            <View style={[appCss.card, styles.recentSection]}>
                <Text> Items a serem vendidos </Text>
                <Text>{search}</Text>
            </View>
            <View style={[appCss.card, styles.saleSection]}>
                <FlatList
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    data={productsAvailable}
                    renderItem={({ item }) => <ProductCard product={item} action={addProductToSold} />}
                />
                <Text style={[appCss.infoText4, { alignSelf: "center" }]}>
                    {`Mostrando ${ProductsDumb.length} de ${ProductsDumb.length}`}
                </Text>
            </View>
            <View style={styles.salesBoxCard}>
                <View style={styles.salesBoxCardInfos}>
                    <Text>R$ {totalPrice}</Text>
                </View>
                <AlkButton
                    onPress={handlerSale}
                    children={<Text>Confirmar</Text>}
                />
            </View>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    searchSeaction: {
        flex: 1,
        width: "100%",
        padding: 5,
        borderWidth: 1,
        borderColor: "#ffffff50",
        flexDirection: "row",
    },
    searchBtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    recentSection: {
        flex: 2,
    },
    saleSection: {
        flex: 7,
    },
    searchIcon: {
        fontSize: 40,
        color: LayoutCss.isDarkTheme ? "white" : "black",
    },
    salesBoxCard: {
        bottom: 20,
        position: "absolute",
        width: "90%",
        height: "10%",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: ColorsCss.grey.darken3,
        borderRadius: 20,
        margin: 10,
        padding: 10
    },
    salesBoxCardInfos: {
        backgroundColor: ColorsCss.grey.darken3,
    }
})