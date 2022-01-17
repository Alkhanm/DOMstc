import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Appearance, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { appCss } from "../constants/App.css";
import ColorsCss from "../constants/Colors.css";
import LayoutCss from "../constants/Layout.css";
import { useProductContext } from "../context/ProductContext";
import { Product } from "./components/Product";
import { AlkCheckBox } from "./widgets/AlkCheckBox";
import { AlkModalShort } from "./widgets/AlkModalShort";
import { AlkRadioButtonGroup } from "./widgets/AlkRadioButtonGroup";
import { Text, View } from './widgets/Themed';


export const ProductsScreen: React.FC = () => {
  const { products } = useProductContext()

  const [orderModalVisible, setOrderModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const [filterCompany, setFilterCompany] = useState<boolean>(false);
  const [filterPrice, setFilterPrice] = useState<boolean>(false);
  const [filterBrand, setFilterBrand] = useState<boolean>(false);
  const [filterPurchaseDate, setFilterPurchaseDate] = useState<boolean>(false);
  const [filterQuantity, setFilterQuantity] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => setFilterModalVisible(!filterModalVisible)} style={styles.action}>
          <MaterialCommunityIcons name="filter-outline" size={20} color={"white"} />
          <Text style={styles.actionText}>Filtrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOrderModalVisible(!orderModalVisible)} style={styles.action}>
          <MaterialCommunityIcons name="order-alphabetical-ascending" size={25} color={"white"} />
          <Text style={styles.actionText}>Ordenar</Text>
        </TouchableOpacity>
      </View>
      <AlkModalShort visibleProp={filterModalVisible} children={
        <>
          <AlkCheckBox label="AVON" onAction={() => { }} value="any" />
          <AlkCheckBox label="NATURA" onAction={() => { }} value="any" />
        </>
      } />
      <AlkModalShort visibleProp={orderModalVisible} children={
        <View style={styles.modalViewOrder}>
          <View style={appCss.textIcon}>
            <MaterialCommunityIcons name="text-short" size={40} color={LayoutCss.isDarkTheme ? "white" : "blacks"} />
            <Text style={appCss.title}>Ordenar</Text>
          </View>
          <AlkRadioButtonGroup items={[
            { label: "Data de compra", setValue: setFilterPurchaseDate, value: filterPurchaseDate },
            { label: "Marca/Linha", setValue: setFilterBrand, value: filterBrand },
            { label: "Empresa", setValue: setFilterCompany, value: filterCompany },
            { label: "Quantidade", setValue: setFilterQuantity, value: filterQuantity },
            { label: "Preço", setValue: setFilterPrice, value: filterPrice },
          ]} />
        </View>
      } />
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
    flex: 1,
    width: "95%",
    flexDirection: "row",
    height: "15%",
    padding: 5,
    alignItems: "center",
    borderWidth: 0.6,
    borderColor: Appearance.getColorScheme() === "dark" ? "#eee" : "rgba(255,255,255,0.1)"
  },
  action: {
    height: 40,
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

  },
  modalViewOrder: {
    flex: 1,
    backgroundColor: LayoutCss.isDarkTheme ? ColorsCss.dark.background : ColorsCss.light.background,
  }
});
