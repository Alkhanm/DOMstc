import React, { useMemo } from 'react';
import { Appearance, Image, StyleSheet, TouchableOpacity } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import { useCartContext } from "../../context/CartContext";
import { IProduct } from "../../domain/interfaces/IProduct";
import { AlkInfo } from "../widgets/AlkInfo";
import { Text, View } from "../widgets/Themed";

interface ProductSaleCardProps {
    product: IProduct;
}

export const ProductSaleCard: React.FC<ProductSaleCardProps> = ({ product }) => {
    const CartContext = useCartContext();

    const quantity = useMemo(() => {
        return CartContext.items
            .find(item => item.product.code === product.code)?.quantity
    }, [CartContext.items])

    function handlerAdd(){
        CartContext.add(product)
    }
    function handlerRemove(){
        CartContext.remove(product)
    }

    return (
        <TouchableOpacity
            onPress={handlerAdd}
            onLongPress={handlerRemove}
            style={styles.container}
            activeOpacity={0.4}
        >
            <View style={[styles.descriptionBox, Boolean(quantity) && { backgroundColor: ColorsCss.grey.darken }]}>
                {quantity && <Text style={styles.qntText}>{quantity}</Text>}
                <Text style={styles.descriptionText} numberOfLines={2} textBreakStrategy="highQuality"  ellipsizeMode="tail">
                    {product.description}
                </Text>
            </View>
            <View style={styles.content}>
                <Image source={{ uri: product.imageURL }} style={styles.img} />
                <View style={styles.infos}>
                    <AlkInfo
                        label="Preço"
                        value={`R$${product.salePrice} | R$${product.purchasePrice}`}
                    />
                    <AlkInfo
                        label="Categoria"
                        value={product.category}
                    />
                    <AlkInfo
                        label="Marca"
                        value={product.brand}
                    />
                    <AlkInfo
                        label="Fabricante"
                        value={product.company}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5,
        padding: 2,
        alignItems: "flex-start",
        borderWidth: 0.5,
        borderColor: Appearance.getColorScheme() === "dark" ? "#eee" : "rgba(255,255,255,0.1)",
    },
    content: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    img: {
        flex: 1,
        margin: 2,
        width: 70,
        height: 70,
    },
    descriptionBox: {
        width: "100%",
        flexDirection: "row"
    },
    descriptionText: {
        flex: 1,
        flexDirection: "row",
        textTransform: "uppercase",
        fontWeight: 'bold',
        textAlign: "center",
    },
    qntText: {
        paddingHorizontal: 5,
        textAlign: "center",
        textAlignVertical: "center",
        backgroundColor: ColorsCss.blueGrey.lighten1,
    },
    infos: {
        justifyContent: "flex-end"
    },
    info: {
        flex: 1,
    },

});