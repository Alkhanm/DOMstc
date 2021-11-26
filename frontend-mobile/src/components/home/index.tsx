import React from 'react';
import { View } from 'react-native';
import { products } from "../../domain/services/fake";
import { ProductCard } from "../product-card";
import style from "./style-home";


const Home: React.FC = () => {
  return (
    <View style={style.container}>
      {
        products.map(p => <ProductCard product={p} key={p.id} />)
      }
    </View>
  );
}

export { Home };
