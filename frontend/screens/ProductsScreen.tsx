import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Appearance, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ColorsCss from "../constants/Colors.css";
import { useProductContext } from "../context/ProductContext";
import Product from "./components/Product";
import { AlkRadioButton } from "./widgets/AlkRadioButton";
import { Text, View } from './widgets/Themed';

export const ProductsScreen: React.FC = () => {
  const { products } = useProductContext()

  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filterDescription, setFilterDescription] = useState<boolean>(false);
  const [filterCompany, setFilterCompany] = useState<boolean>(false);
  // const [filterBrand, setFilterBrand] = useState()
  // const [filterQuantity, setFilterQuantity] = useState()
  // const [filterPurchaseDate, setFilterPurchaseDate] = useState()
  // const [filterPrice, setFilterPrice] = useState()


  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <View>
          <TouchableOpacity onPress={() => setFilterModalVisible(!filterModalVisible)} style={styles.action}>
            <MaterialCommunityIcons name="filter-outline" size={20} color={"white"} />
            <Text style={styles.actionText}>Filtrar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setOrderModalVisible(!orderModalVisible)} style={styles.action}>
            <MaterialCommunityIcons name="order-alphabetical-ascending" size={25} color={"white"} />
            <Text style={styles.actionText}>Ordenar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionOptions}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <AlkRadioButton label="Descrição" value={filterDescription} onAction={setFilterDescription} style={styles.actionOption} />
            <AlkRadioButton label="Fabricante" value={filterCompany} onAction={setFilterCompany} style={styles.actionOption} />
          </View>
        </View>
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
    height: "75%"
  },
  actions: {
    flex: 1,
    width: "95%",
    flexDirection: "row",
    height: "25%",
    padding: 5,
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: Appearance.getColorScheme() === "dark" ? "#eee" : "rgba(255,255,255,0.1)"
  },
  action: {
    height: 30,
    marginVertical: 5,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    backgroundColor: ColorsCss.grey.darken3
  },
  actionText: {
    marginHorizontal: 5,
    fontSize: 12,
    color: ColorsCss.grey.lighten5,
    textTransform: "uppercase"
  },
  actionOptions: {
    flex: 1,
    borderColor: ColorsCss.grey.c,
  },
  actionOption: {

  }
});
