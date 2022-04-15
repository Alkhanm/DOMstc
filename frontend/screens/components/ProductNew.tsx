import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useMemo, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from "react-native-gesture-handler";
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { ProductHttp } from "../../domain/api/ProductsHtpp";
import { getCategory, getCompany } from "../../domain/functions/ProductFunctions";
import { formatMonetaryValue } from "../../domain/functions/Utils";
import { eCategory, eCompany, IProduct } from "../../domain/interfaces/IProduct";
import { AlkBarcodeReader } from "../widgets/AlkBarcodeReader";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInput } from "../widgets/AlkInput";
import { AlkModal } from "../widgets/AlkModal";
import { AlkRadioButton, AlkRadioButtonItem } from "../widgets/AlkRadioButton";
import { Text, View } from "../widgets/Themed";


const categoryItems: AlkRadioButtonItem[] = Object.keys(eCategory).map(e => ({
  text: getCategory(e),
  value: e
}))

const companyItems: AlkRadioButtonItem[] = Object.keys(eCompany).map(e => ({
  text: getCompany(e),
  value: e
}))

//TODO: regex para formatar os campos númericos (retirar virgulas, espaços em brancos, etc)
export default function ProductNew() {
  const Navigation = useNavigation()
  const [product, setProduct] = useState<IProduct>({} as IProduct)
  const [description, setDescription] = useState<string>("");
  const [brand, setBrand] = useState<string>("")
  const [category, setCategory] = useState<eCategory>("" as eCategory)
  const [company, setCompany] = useState<eCompany>("" as eCompany)
  const [purchasePriceText, setPurchasePriceText] = useState("0")
  const [salePriceText, setSalePriceText] = useState("0")
  const [barcode, setBarcode] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [unit, setUnit] = useState<string>("")

  const salePrice = useMemo(() => {
    return formatMonetaryValue(salePriceText)
  }, [salePriceText])

  const purchasePrice = useMemo(() => {
    return formatMonetaryValue(purchasePriceText)
  }, [purchasePriceText])


  useEffect(() => {
    (async () => {
      const { granted } = await BarCodeScanner.requestPermissionsAsync();
      if (!granted) throw new Error("Permissão de acesso a câmera negada")
    })();
  }, []);

  const fillFields = (): IProduct => ({
    id: 0,
    unit: 1,
    volume: 0,
    weight: 0,
    brand, category, company, description, salePrice, purchasePrice,
    imageUrl: "",
    variation: "",
    code: Number(barcode),
    quantity: Number(quantity),
    purchaseDate: new Date().toDateString(),
  })

  function handlerSave() {
    const product: IProduct = fillFields();
    ProductHttp.create(product)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContentInfos}>
          {product.imageUrl && <Image source={{ uri: product.imageUrl }} style={styles.img} />}
          <Text style={styles.imgAddText}>Adicionar imagem</Text>
          <TouchableOpacity style={styles.imgAdd}>
            <MaterialCommunityIcons name="image-multiple-outline" style={styles.imgIcon} />
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
          <AlkModal
            VisibleElement={() =>
              <AlkInput
                placeholder="Categoria"
                editable={false}
                value={category ? getCategory(category).toLowerCase() : ""}
                icon="factory" >
                <MaterialCommunityIcons name="arrow-right" size={22} color={ColorsCss.grey.c} />
              </AlkInput>
            }>
            <Text style={appCss.subtitle2}>
              Selecione a categoria
            </Text>
            <AlkRadioButton
              onSelectChange={setCategory}
              defaultSelect={category}
              items={categoryItems} />
          </AlkModal>
          <AlkModal
            VisibleElement={() =>
              <AlkInput
                placeholder="Fabricante"
                value={getCompany(company)}
                editable={false}
                icon="factory" >
                <MaterialCommunityIcons name="arrow-right" size={22} color={ColorsCss.grey.c} />
              </AlkInput>
            }>
            <Text style={appCss.subtitle2}>
              Selecione a fabricante
            </Text>
            <AlkRadioButton
              onSelectChange={setCompany}
              defaultSelect={company}
              items={companyItems} />
          </AlkModal>
          <AlkInput
            placeholder="Marca"
            value={brand}
            onChangeText={setBrand}
            icon="bag-carry-on" />
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
              value={`R$ ${purchasePrice.toString()}`}
              onChangeText={setPurchasePriceText}
              keyboardType="numeric"
              icon="wallet-outline" />
            <AlkInput
              style={{ width: "50%" }}
              placeholder="Preço de venda"
              value={`R$ ${salePrice.toString()}`}
              onChangeText={setSalePriceText}
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
    </View >
  );

}
const isDarkTheme = LayoutCss.isDarkTheme

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 8,
    margin: 15,
    justifyContent: "space-around",
  },
  scrollContentInfos: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "space-between",
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
  imgIcon: {
    color: isDarkTheme ? "white" : "black",
    fontSize: 48
  },
  img: {
    width: 60,
    height: 60
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


});