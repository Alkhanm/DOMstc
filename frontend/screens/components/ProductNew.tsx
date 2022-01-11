import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { AlkModal } from "../widgets/AlkModal";
import { Text, View } from "../widgets/Themed";

export default function ProductNew() {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [barcodeScanVisibility, setBarcodeScanVisibility] = useState(false)

  const [barcode, setBarcode] = useState(0)

  useEffect(() => {
    (async () => {
      const { granted } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(granted);
    })();
  }, []);

  const handlerBarcodeScanVisibility = () => setBarcodeScanVisibility(!barcodeScanVisibility)
  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setBarcode(data)
  };

  if (hasPermission === null) {
    return <Text>Requistando acesso a camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso a camera</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlerBarcodeScanVisibility} style={[styles.card, styles.cardScan]}>
        <MaterialCommunityIcons name="qrcode" size={35} style={styles.qrcodeIcon} />
        <View>
          <Text style={styles.qrcodeTitle}>Ler código</Text>
          <Text style={styles.qrcodeText}>Clique aqui para preencher os campos automanticamente</Text>
        </View>
        <AlkModal visible={true}
          children={
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject} />}
        />
      </TouchableOpacity>
      <View style={[styles.card, styles.cardFields]}>
        <Text>Ler código</Text>
      </View>
      <View style={[styles.card, styles.cardActions]}>
        <Text>Ler código</Text>
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
  cardScan: {
    flex: 1,
    flexDirection: "row"
  },
  cardFields: {
    flex: 8,
  },
  cardActions: {
    flex: 1
  },
  qrcodeIcon: {
    color: isDarkTheme ? "white" : "black",
    fontSize: 58
  },
  qrcodeTitle: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  qrcodeText: {
    color: ColorsCss.grey.lighten2,
    marginHorizontal: 8,
    fontSize: 12,
  }
});
