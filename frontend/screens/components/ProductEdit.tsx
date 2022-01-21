import { Image, ScrollView, StyleSheet } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import { useProductContext } from "../../context/ProductContext";
import { IProduct } from "../../domain/interfaces/IProduct";
import { ProductEditScreenProp } from "../../navigation/types";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInput } from "../widgets/AlkInput";
import { Text, View } from '../widgets/Themed';

export const ProductEdit: React.FC<ProductEditScreenProp> = ({ route }) => {
  const code = route.params.code

  const { products } = useProductContext()
  const product: IProduct = products.find(p => p.code === code) || {} as IProduct

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.description}</Text>
      <View style={styles.content}>
        <Image source={{ uri: product?.imageUrl }} style={styles.img} />
        <ScrollView style={styles.scrollInfos}>
          <AlkInput placeholder="Código" value={String(product.code)} icon="barcode" />
          <AlkInput value="Fabricante" placeholder={String(product.company)} icon="barcode" />
          <AlkInput placeholder="Marca" value={product.brand} icon="bag-carry-on" />
          <AlkInput placeholder="Quantidade" value={String(product.quantity)} icon="warehouse" />
          {
            product.unit &&
            <AlkInput placeholder="Unidade por produto" value={String(product.unit)} icon="warehouse" />
          }
          <AlkInput placeholder="Comprado em" value={product.purchaseDate} icon="calendar" />
          <AlkInput placeholder="Preço de compra" value={`R$${product.purchasePrice}`} icon="wallet-outline" />
          <AlkInput placeholder="Preço de venda" value={`R$${product.salePrice}`} icon="wallet-plus" />
        </ScrollView>
      </View>
      <View style={styles.actions}>
        <AlkButton style={styles.action} onPress={() => { }}
          children={<Text>Salvar</Text>} />
        <AlkButton style={styles.action} onPress={() => { }}
          children={<Text>Cancelar</Text>} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: "center"
  },
  content: {
    flex: 8,
    margin: 15
  },
  scrollInfos: {
    height: "70%",
    width: "100%",
  },
  info: {
    width: "100%",
    margin: 0,
    backgroundColor: ColorsCss.blue.c
  },
  img: {
    width: 100,
    height: 100
  },
  actions: {
    flex: 1.1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  action: {
    width: "45%",
    minHeight: 40,
  },
});

