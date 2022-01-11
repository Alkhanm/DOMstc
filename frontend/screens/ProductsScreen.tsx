import { FlatList, StyleSheet } from 'react-native';
import { useProductContext } from "../context/ProductContext";
import Product from "./components/Product";
import { Text, View } from './widgets/Themed';

export const ProductsScreen: React.FC = () => {
  const { products } = useProductContext()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos no estoque</Text>
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

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
