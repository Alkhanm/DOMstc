import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from 'react';
import { Alert, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { useCartContext } from "../../context/CartContext";
import { useProductContext } from "../../context/ProductContext";
import { IProduct, tProductProperty } from "../../domain/interfaces/IProduct";
import { AlkBarcodeReader } from "../widgets/AlkBarcodeReader";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInfo } from "../widgets/AlkInfo";
import { AlkSwipperCard } from "../widgets/AlkSwipperCard";
import { Text, View } from "../widgets/Themed";
import { ProductOrderFilter } from "./ProductOrderFilter";
import { ProductSaleCard } from "./ProductSaleCard";
import { ShoppingCart } from "./ShoppingCart";


export const Sale: React.FC = () => {
    const ProductContext = useProductContext();
    const CartContext = useCartContext();

    const [order, setOrder] = useState<tProductProperty>("purchaseDate")

    const [orderedProducts, setOrderedProducts] = useState<IProduct[]>(ProductContext.products)
    const [search, setSearch] = useState<string>();

    const quantity = useMemo(() =>
        CartContext.items
            .map(({ quantity }) => quantity)
            .reduce((q1, q2) => q1 + q2, 0)
        , [CartContext.items])

    const totalPrice = useMemo(() =>
        CartContext.items
            .map(({ product, quantity }) => product.salePrice * quantity)
            .reduce((p1, p2) => p1 + p2, 0)
            .toFixed(2)
            .replace(".", ",")
        , [CartContext.items])


    function handlerCodebarScanner() {
        const searchedProduct = ProductContext.products
            .find(({ code }) => String(code) === search);
        if (!searchedProduct) return;
        CartContext.add(searchedProduct)
        Alert.alert("Produto adicionado", `${searchedProduct.description} - foi adicionado ao carrinho`)
    }

    function handlerSale() {
        console.log(CartContext.items)
    }

    return (
        <View style={styles.container}>
            <View style={styles.searchSeaction}>
                <AlkBarcodeReader setValue={setSearch} onBarCodeScanned={handlerCodebarScanner} />
                <View style={appCss.verticalSeparator} />
                <AlkButton
                    style={styles.searchBtn}
                    children={<MaterialCommunityIcons name="database-search" style={styles.searchIcon} />}
                />
            </View>
            <View style={[appCss.card, styles.saleSection]}>
                <FlatList
                    ListHeaderComponent={
                        <ProductOrderFilter
                            products={ProductContext.products}
                            orderedProducts={orderedProducts}
                            setOrderedProducts={setOrderedProducts}
                        />
                    }
                    ListFooterComponent={
                        <View style={{ height: 150 }} />
                    }
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    numColumns={2}
                    data={orderedProducts}
                    renderItem={({ item }) => <ProductSaleCard product={item} />}
                />

            </View>
            {Boolean(CartContext.items.length) &&
                <AlkSwipperCard
                    defaultHeight={125}
                    HeaderComp={_ => (<>
                        <AlkInfo
                            label="Valor"
                            value={`R$ ${totalPrice}`}
                            style={styles.salesBoxCardInfo}
                            textStyle={appCss.infoText}
                            labelStyle={styles.salesBoxCardInfoLabel} />
                        <AlkInfo
                            label="Quantidade"
                            value={`${CartContext.items.length} (${quantity})`}
                            style={styles.salesBoxCardInfo}
                            textStyle={appCss.infoText}
                            labelStyle={styles.salesBoxCardInfoLabel} />
                    </>)}
                    MiddleComp={_ => <ShoppingCart />}
                    BottomComp={_ =>
                        <TouchableOpacity
                            onPress={handlerSale}
                            activeOpacity={0.85}
                            style={styles.salesButton}
                        >
                            <Text style={styles.salesButtonText}>Registrar Venda</Text>
                        </TouchableOpacity>
                    }
                />
            }
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 5
    },
    switchSection: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ffffff50",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    },
    searchSeaction: {
        width: "100%",
        padding: 5,
        borderWidth: 1,
        borderColor: "#ffffff50",
        flexDirection: "row"
    },
    searchBtn: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
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