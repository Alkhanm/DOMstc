import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import ColorsCss from "../../constants/Colors.css";
import { useCartContext } from "../../context/CartContext";
import { AlkInfo } from "../widgets/AlkInfo";
import { Text } from "../widgets/Themed";

export const ShoppingCart: React.FC = () => {
    const CartContext = useCartContext();

    return (
        <FlatList
            data={CartContext.items}
            keyExtractor={({ product }) => product.code.toString()}
            renderItem={({ item: { product, quantity } }) => (
                <View style={styles.container}>
                    <Image style={{ width: "10%" }} source={{ uri: product.imageUrl, width: 50, height: 50 }} />
                    <View key={product.id} style={styles.infos}>
                        <AlkInfo value={product.description} style={styles.info} textStyle={{ fontSize: 16 }} />
                        <AlkInfo value={`R$ ${product.salePrice}`} style={styles.info} textStyle={{ fontSize: 14 }} />
                    </View>
                    <View style={styles.qntActions}>
                        <TouchableOpacity
                            onPress={_ => CartContext.add(product)}
                            style={[styles.qntAction, { marginRight: 25 }]}>
                            <MaterialCommunityIcons name="plus" size={20} color={ColorsCss.grey.darken4} />
                        </TouchableOpacity>
                        <Text style={{ width: 20, textAlign: "center" }}>{quantity}</Text>
                        <TouchableOpacity
                            onPress={() => CartContext.reduce(product)}
                            style={[styles.qntAction, { marginLeft: 25 }]}>
                            <MaterialCommunityIcons name="minus" size={20} color={ColorsCss.grey.darken4} />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: ColorsCss.grey.darken4,
        margin: 2,
        padding: 10,
        height: 60,
        alignItems: "center",
        justifyContent: "space-between"
    },
    infos: {
        paddingHorizontal: 10,
    },
    info: {
        backgroundColor: ColorsCss.grey.darken4,
    },
    qntActions: {
        flexDirection: "row",
        alignItems: "center",
    },
    qntAction: {
        backgroundColor: "white",
        margin: 5,
        borderRadius: 20
    }
})