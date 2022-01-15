import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from "react-native-gesture-handler";
import ColorsCss from "../../constants/Colors.css";
import { useProductCartContext } from "../../context/ProductCartContext copy";
import { AlkInfo } from "../widgets/AlkInfo";
import { Text } from "../widgets/Themed";


export const ShoppingCart: React.FC = () => {
    const ProductCartContext = useProductCartContext();

    return (
        <FlatList
            data={ProductCartContext.items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item: { product, quantity }, index }) => (
                <View style={styles.container} key={index}>
                    <Image style={{ width: "10%" }} source={{ uri: product.imageURL, width: 40, height: 40 }} />
                    <View key={product.id} style={styles.infos}>
                        <AlkInfo value={product.description} style={styles.info} textStyle={{ fontSize: 14 }} />
                        <AlkInfo value={`R$ ${product.salePrice}`} style={styles.info} textStyle={{ fontSize: 14 }} />
                    </View>
                    <View style={styles.qntActions}>
                        <TouchableOpacity onPress={() => ProductCartContext.add(product)} style={styles.qntAction}>
                            <MaterialCommunityIcons name="plus" size={25} color={ColorsCss.grey.darken4} />
                        </TouchableOpacity>
                        <Text style={{ width: 20, textAlign: "center" }}>{quantity}</Text>
                        <TouchableOpacity onPress={() => ProductCartContext.remove(product)} style={styles.qntAction}>
                            <MaterialCommunityIcons name="minus" size={25} color={ColorsCss.grey.darken4} />
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