import React, { useState } from 'react';
import { Appearance, Image, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import { IProduct } from "../../domain/interfaces/IProduct";
import { AlkInfo } from "../widgets/AlkInfo";
import { Text, View } from "../widgets/Themed";

interface ProductCardProps extends TouchableOpacityProps {
    product: IProduct;
    action: (p: IProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, action, ...rest }) => {
    const [selected, setSelected] = useState(false)


    function handlerAction() {
        action(product);
        setSelected(!selected)
    }

    return (
        <TouchableOpacity
            onPress={handlerAction}
            key={product.id}
            style={[styles.container, selected && { backgroundColor: ColorsCss.blue.accent1 }]}
        >
            <Text style={styles.descriptionText} numberOfLines={2} ellipsizeMode="tail">
                {product.description}
            </Text>
            <View style={styles.content}>
                <Image source={{ uri: product.imageURL }} style={styles.img} />
                <View style={styles.infos}>
                    <AlkInfo
                        label="Código"
                        value={product.code}
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
        paddingHorizontal: 1,
        borderWidth: 1,
        alignItems: "flex-start",
        borderColor: Appearance.getColorScheme() === "dark" ? "#eee" : "rgba(255,255,255,0.1)",
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: 70,
        height: 70,
    },
    descriptionText: {
        width: "100%",
        textTransform: "uppercase",
        fontWeight: 'bold',
        textAlign: "center",
    },
    infos: {
        flex: 1,
    },
    info: {
        flex: 1,
    },
});