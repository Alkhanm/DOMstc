import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { eCategory, eCompany, IProduct } from "../../domain/interfaces/IProduct";
import { AlkBarcodeReader } from "../widgets/AlkBarcodeReader";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInput } from "../widgets/AlkInput";
import { Text, View } from "../widgets/Themed";

//TODO: regex para formatar os campos númericos (retirar virgulas, espaços em brancos, etc)
export default function ProductNew() {
  const Navigation = useNavigation()
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const [description, setDescription] = useState<string>("");
  const [category, setCategory] = useState<eCategory>("" as eCategory)
  const [brand, setBrand] = useState<string>("")
  const [company, setCompany] = useState<eCompany>("" as eCompany)
  const [purchasePrice, setPurchasePrice] = useState<string>("")
  const [salePrice, setSalePrice] = useState<string>("")
  const [barcode, setBarcode] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [unit, setUnit] = useState<string>("")


  useEffect(() => {
    (async () => {
      const { granted } = await BarCodeScanner.requestPermissionsAsync();
      if (!granted) throw new Error("Permissão de acesso a câmera negada")
    })();
  }, []);

  const fillFields = (): IProduct => {
    return {
      id: 0,
      brand,
      category,
      company,
      imageUrl: "",
      variation: "",
      description,
      code: Number(barcode),
      quantity: Number(quantity),
      salePrice: Number(salePrice),
      purchasePrice: Number(purchasePrice),
      purchaseDate: new Date().toDateString(),
    }
  }


  function handlerSave() {
    console.log(fillFields())
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContentInfos}>
          {product.imageUrl && <Image source={{ uri: product.imageUrl }} style={styles.img} />}
          <Text style={styles.imgAddText}>Adicionar imagem</Text>
          <TouchableOpacity style={styles.imgAdd}>
            <MaterialCommunityIcons name="image-multiple-outline" style={styles.icon} />
          </TouchableOpacity>
          <AlkInput
            placeholder="Código"
            value={barcode}
            onChangeText={setBarcode}
            keyboardType="number-pad"
            icon="barcode" >
            <AlkBarcodeReader setValue={setBarcode}>
              <TouchableOpacity>
                <MaterialCommunityIcons name="barcode-scan" size={25} color={ColorsCss.grey.c} />
              </TouchableOpacity>
            </AlkBarcodeReader>
          </AlkInput>
          <AlkInput
            placeholder="Descrição"
            value={description}
            onChangeText={setDescription}
            icon="text" />
          <AlkInput
            placeholder="Categoria"
            value={category}
            isInputText={false}
            // onChangeText={setCategory}
            icon="bag-carry-on" />
          <AlkInput
            placeholder="Marca"
            value={brand}
            onChangeText={setBrand}
            icon="bag-carry-on" />
          <AlkInput
            placeholder="Fabricante"
            value={company}
            onChangeText={(e) => console.log(e)}
            icon="factory" />
          <AlkInput
            placeholder="Quantidade"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
            icon="warehouse" />
          <View style={{ flexDirection: "row" }}>
            <AlkInput
              style={{ width: "50%" }}
              placeholder="Preço de compra"
              value={purchasePrice}
              onChangeText={setPurchasePrice}
              keyboardType="numeric"
              icon="wallet-outline" />
            <AlkInput
              style={{ width: "50%" }}
              placeholder="Preço de venda"
              value={salePrice}
              onChangeText={setSalePrice}
              keyboardType="numeric"
              icon="wallet-plus" />
          </View>
          <View style={{ flex: 1, marginBottom: 25 }}>
            <AlkInput
              placeholder="Unidade por produto (opcional)"
              value={unit}
              keyboardType="numeric"
              onChangeText={setUnit}
              icon="warehouse" />
          </View>
        </ScrollView>
      </View>
      <View style={styles.actions}>
        <AlkButton style={styles.action} onPress={handlerSave}>
          <Text>Salvar</Text>
        </AlkButton>
        <AlkButton style={styles.action} onPress={Navigation.goBack}>
          <Text>Cancelar</Text>
        </AlkButton>
      </View>
    </View>
  );

}
const isDarkTheme = LayoutCss.isDarkTheme

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: ColorsCss.grey.darken
  },
  content: {
    flex: 8,
  },
  actions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  action: {
    width: "45%",
    height: "75%",
    minHeight: 40
  },
  barcode: {
    borderWidth: 1,
    borderColor: ColorsCss.grey.darken,
    margin: 5,
    padding: 5
  },
  icon: {
    color: isDarkTheme ? "white" : "black",
    fontSize: 58
  },
  img: {
    width: 80,
    height: 80
  },
  imgAdd: {
    alignItems: "center"
  },
  imgAddText: {
    color: ColorsCss.grey.c,
    fontSize: 14,
    textTransform: "uppercase",
    margin: 5,
    fontWeight: "bold"
  },
  scrollContentInfos: {
    alignItems: "center",
  },

});