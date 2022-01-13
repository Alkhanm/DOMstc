import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity } from "react-native";
import ColorsCss from "../../constants/Colors.css";
import { AlkInput } from "../widgets/AlkInput";
import { AlkModal } from "../widgets/AlkModal";
import { Text, View } from "../widgets/Themed";


export const Sale: React.FC = () => {
    const [search, setSearch] = useState<string>("");

    const [barcodeScanVisibility, setBarcodeScanVisibility] = useState(false)

    function handleBarCodeScanned({ data }: BarCodeEvent) {
        setSearch(data);
        setBarcodeScanVisibility(!barcodeScanVisibility)
      };

    const barcodeScan = (
        <TouchableOpacity>
            <MaterialCommunityIcons name="barcode-scan" size={35} color={ColorsCss.grey.lighten} />
        </TouchableOpacity>
    )


    const BarcodeScannerComp = (
        <>
            <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
            <MaterialCommunityIcons name="scan-helper" style={styles.qrcodeCamIcon} />
        </>
    )
    const BarcodeCardComp = () => (
        <TouchableOpacity style={[styles.card, styles.cardScan]}>
            <MaterialCommunityIcons name="barcode-scan" size={60} color={"white"} />
            <View>
                <Text style={styles.qrcodeTitle}>Ler código</Text>
                <Text style={styles.qrcodeText}>Clique aqui para preencher os campos automanticamente</Text>
            </View>
        </TouchableOpacity>
    )


    return (
        <View style={styles.container}>
            <AlkInput
                icon="database-search"
                iconSize={35}
                value={search}
                onChangeText={setSearch}
                style={styles.search}
                placeholder="Buscar produto"
                children={barcodeScan}
            />

            < AlkModal
                visibleProp={barcodeScanVisibility}
                buttonCloseText="Fechar"
                VisibleElement={BarcodeCardComp}
                children={BarcodeScannerComp}
            />
        </View>
    );
}

const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 10
    },
    search: {
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
})