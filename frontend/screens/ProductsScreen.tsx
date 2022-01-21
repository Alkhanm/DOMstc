import { useState } from "react";
import { FlatList, StyleSheet } from 'react-native';
import { useProductContext } from "../context/ProductContext";
import { IProduct } from "../domain/interfaces/IProduct";
import { Product } from "./components/Product";
import { ProductOrderFilter } from "./components/ProductOrderFilter";
import { View } from './widgets/Themed';

export const ProductsScreen: React.FC = () => {
  const ProductContext = useProductContext();
  const [productsOrdered, setProductsOrdered] = useState<IProduct[]>(ProductContext.products)

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <ProductOrderFilter
          products={ProductContext.products}
          orderedProducts={productsOrdered}
          setOrderedProducts={setProductsOrdered} />
      </View>
      <FlatList
        style={styles.listContainer}
        data={productsOrdered}
        renderItem={({ item }) => <Product product={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    height: "85%"
  },
  actions: {
    flex: 1.5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
