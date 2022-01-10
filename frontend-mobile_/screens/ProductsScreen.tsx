import { FlatList, StyleSheet } from 'react-native';
import { ProductsDumb } from "../domain/dumb";
import Product from "./components/Product";
import { Text, View } from './widgets/Themed';

export default function ProductsScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Produtos no estoque</Text>

      <FlatList
        style={styles.listContainer}
        data={ProductsDumb}
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
