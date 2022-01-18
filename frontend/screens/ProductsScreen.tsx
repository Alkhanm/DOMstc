import { FlatList, StyleSheet } from 'react-native';
import { useProductContext } from "../context/ProductContext";
import { Product } from "./components/Product";
import { ProductOrderFilter } from "./components/ProductOrderFilter";
import { View } from './widgets/Themed';


export const ProductsScreen: React.FC = () => {
  const { products } = useProductContext()

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <ProductOrderFilter />
      </View>
      <FlatList
        style={styles.listContainer}
        data={products}
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
