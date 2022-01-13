import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeEvent, BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { ProductCreator } from "../../domain/functions/ProductFunctions";
import { IProduct, tCompany } from "../../domain/interfaces/IProduct";
import { AlkButton } from "../widgets/AlkButton";
import { AlkInput } from "../widgets/AlkInput";
import { AlkModal } from "../widgets/AlkModal";
import { Text, View } from "../widgets/Themed";
export default function ProductNew() {
  //TODO: regex para formatar os campos númericos (retirar virgulas, espaços em brancos, etc)

  const [barcodeScanVisibility, setBarcodeScanVisibility] = useState(false)

  const [product, setProduct] = useState<IProduct>({} as IProduct)

  const [company, setCompany] = useState<tCompany | string>("")
  const [brand, setBrand] = useState<string>("")
  const [description, setDescription] = useState<string>("");
  const [purchaseDate, setPurchaseDate] = useState<string>("")
  const [purchasePrice, setPurchasePrice] = useState<string>("")
  const [salePrice, setSalePrice] = useState<string>("")
  const [barcode, setBarcode] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [volume, setVolume] = useState<string>("")
  const [weight, setWeight] = useState<string>("")
  const [unit, setUnit] = useState<string>("")


  useEffect(() => {
    (async () => {
      const { granted } = await BarCodeScanner.requestPermissionsAsync();
      if (!granted) throw new Error("Permissão de acesso a câmera negada")
    })();
  }, []);

  const fillFields = (): IProduct => {
    return ProductCreator(
      description,
      purchaseDate,
      brand,
      Number(purchasePrice),
      Number(salePrice),
      Number(barcode),
      Number(weight),
      Number(volume),
      Number(quantity),
      Number(unit))
  }


  function handlerSave() {
    console.log(fillFields())
  }

  function handleBarCodeScanned({ data }: BarCodeEvent) {
    setBarcode(data);
    setBarcodeScanVisibility(!barcodeScanVisibility)
  };




  const BarcodeScannerComp = (
    <>
      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
      <MaterialCommunityIcons name="scan-helper" style={styles.qrcodeCamIcon} />
    </>
  )
  const BarcodeCardComp = () => (
    <TouchableOpacity style={[styles.card, styles.cardScan]}>
      <MaterialCommunityIcons name="barcode-scan" style={styles.icon} />
      <View>
        <Text style={styles.qrcodeTitle}>Ler código</Text>
        <Text style={styles.qrcodeText}>Clique aqui para preencher os campos automanticamente</Text>
      </View>
    </TouchableOpacity>
  )


  return (
    <View style={styles.container}>
      <AlkModal
        visibleProp={barcodeScanVisibility}
        buttonCloseText="Fechar"
        VisibleElement={BarcodeCardComp}
        children={BarcodeScannerComp}
      />

      <View style={[styles.card, styles.cardFields]}>
        <ScrollView style={styles.scrollInfos} contentContainerStyle={styles.scrollContentInfos}>
          {product.imageURL && <Image source={{ uri: product.imageURL }} style={styles.img} />}
          <TouchableOpacity style={styles.imgAdd}>
            <Text style={styles.imgAddText}>Adicionar imagem</Text>
            <MaterialCommunityIcons name="image-multiple-outline" style={styles.icon} />
          </TouchableOpacity>
          <AlkInput placeholder="Descrição" value={description} onChangeText={setDescription} icon="text" />
          <AlkInput placeholder="Código" value={barcode} keyboardType="numeric" onChangeText={setBarcode} icon="barcode" />
          <AlkInput placeholder="Fabricante" value={company} onChangeText={setCompany} icon="factory" />
          <AlkInput placeholder="Marca" value={brand} onChangeText={setBrand} icon="bag-carry-on" />
          <AlkInput placeholder="Quantidade" value={quantity} keyboardType="numeric" onChangeText={setQuantity} icon="warehouse" />
          <AlkInput placeholder="Unidade por produto" value={unit} keyboardType="numeric" onChangeText={setUnit} icon="warehouse" />
          <AlkInput placeholder="Volume (ml)" value={volume} keyboardType="numeric" onChangeText={setVolume} icon="water" />
          <AlkInput placeholder="Peso (gm)" value={weight} keyboardType="numeric" onChangeText={setWeight} icon="weight" />
          <AlkInput placeholder="Comprado em" value={purchaseDate} onChangeText={setPurchaseDate} icon="calendar" />
          <AlkInput placeholder="Preço de compra (R$)" value={purchasePrice} keyboardType="numeric" onChangeText={setPurchasePrice} icon="wallet-outline" />
          <AlkInput placeholder="Preço de venda (R$)" value={salePrice} keyboardType="numeric" onChangeText={setSalePrice} icon="wallet-plus" />
        </ScrollView>
      </View>
      <View style={[styles.card, styles.cardActions]}>
        <AlkButton propStyle={styles.action} onPress={handlerSave}
          children={<Text>Salvar</Text>} />
        <AlkButton propStyle={styles.action} onPress={() => { }}
          children={<Text>Cancelar</Text>} />
      </View>

    </View>
  );

}
const isDarkTheme = LayoutCss.isDarkTheme
const { height } = Dimensions.get("screen");

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
  cardScan: {
    flex: 1,
    flexDirection: "row"
  },
  cardFields: {
    flex: 8,
  },
  cardActions: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
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
    fontSize: 16,
    margin: 5,
    fontWeight: "bold"
  },
  qrcodeTitle: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  qrcodeText: {
    color: ColorsCss.grey.lighten2,
    marginHorizontal: 8,
    fontSize: 12,
  },
  qrcodeCamIcon: {
    top: height / 3,
    fontSize: 255,
    color: ColorsCss.grey.darken4,
    alignSelf: "center"
  },
  scrollInfos: {},
  scrollContentInfos: {
    alignItems: "center"
  },
  action: {
    width: "45%",
    height: "75%",
  },
});