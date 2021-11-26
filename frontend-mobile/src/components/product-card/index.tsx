import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from 'react';
import { Text, View } from 'react-native';
import iProduct from "../../domain/interfaces/iProduct";
import style from "./style";

const ProductCard = ({ product }: { product: iProduct }) => {
  return (
    <View style={style.container}>
      <View style={style.infoTable}>
        <MaterialCommunityIcons name={"clipboard-outline"} size={45} />
        <View style={style.infos}>
          <Text style={style.description}>{product.description}</Text>
          <Text>Categoria: {product.category}</Text>
          <Text>Companhia: {product.company}</Text>
          <Text>Quantidade: {product.quantity}</Text>
        </View>
        <MaterialCommunityIcons name={"file-edit-outline"} size={45} />
      </View>
    </View>
  );
}

export { ProductCard };
