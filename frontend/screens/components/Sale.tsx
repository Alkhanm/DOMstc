import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { useProductCartContext } from "../../context/ProductCartContext copy";
import { useProductContext } from "../../context/ProductContext";
import { ProductsDumb } from "../../domain/dumb";
import { AlkBarcodeReader } from "../widgets/AlkBarcodeReader";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInfo } from "../widgets/AlkInfo";
import { AlkSwipperCard } from "../widgets/AlkSwipperCard";
import { Text, View } from "../widgets/Themed";
import { ProductCard } from "./ProductCard";
import { ShoppingCart } from "./ShoppingCart";


export const Sale: React.FC = () => {

    const [search, setSearch] = useState<string>("");

    const { products } = useProductContext();
    const ProductCart = useProductCartContext()

    const totalPrice = useMemo(() => {
        return ProductCart.items
            .map(({ product }) => product.salePrice)
            .reduce((p1, p2) => p1 + p2, 0)
    }, [ProductCart.items])

    function handlerSale() {
        // console.log(ProductCart.items)
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
                    data={products}
                    renderItem={({ item }) => <ProductCard key={item.id} product={item} action={ProductCart.add} />}
                />

                <Text style={[appCss.infoText4, { alignSelf: "center" }]}>
                    {`Mostrando ${ProductsDumb.length} de ${ProductsDumb.length}`}
                </Text>
            </View>
            {Boolean(ProductCart.items) &&
                <AlkSwipperCard
                    defaultHeight={140}
                    HeaderComp={() => (
                        <>
                            <AlkInfo
                                label="Valor"
                                value={`R$ ${totalPrice}`}
                                style={styles.salesBoxCardInfo}
                                textStyle={appCss.infoText}
                                labelStyle={styles.salesBoxCardInfoLabel} />
                            <AlkInfo
                                label="Quantidade"
                                value={ProductCart.items.length}
                                style={styles.salesBoxCardInfo}
                                textStyle={appCss.infoText}
                                labelStyle={styles.salesBoxCardInfoLabel} />
                        </>
                    )}
                    MiddleComp={() => (
                        <ShoppingCart />
                    )}
                    BottomComp={() => (
                        <TouchableOpacity
                            activeOpacity={0.85}
                            style={styles.salesButton}
                            onPress={handlerSale}
                        >
                            <Text style={styles.salesButtonText}>Registrar</Text>
                        </TouchableOpacity>
                    )}
                />


            }
        </KeyboardAvoidingView >
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
    salesBoxCardInfo: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        justifyContent: "center",
        backgroundColor: ColorsCss.grey.darken4,
    },
    salesBoxCardInfoLabel: {
        flex: 1,
        fontSize: 14,
        textTransform: "uppercase",
        fontWeight: "bold",
        borderRightWidth: 2,
        borderColor: ColorsCss.grey.darken,
    },
    salesButton: {
        backgroundColor: ColorsCss.grey.darken4,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
    },
    salesButtonText: {
        textTransform: "uppercase",
        fontWeight: "bold"
    }
})