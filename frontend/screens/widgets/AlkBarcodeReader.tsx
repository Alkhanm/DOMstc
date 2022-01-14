import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeEvent, BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { AlkModal } from "./AlkModal";
import { Text, View } from "./Themed";


interface AlkBarcodeReaderProps extends TouchableOpacityProps {
    setValue: (value: string) => void;
}


export const AlkBarcodeReader: React.FC<AlkBarcodeReaderProps> = ({ setValue, ...rest }) => {
    const [barcodeScanVisibility, setBarcodeScanVisibility] = useState(false);

    function handleBarCodeScanned({ data }: BarCodeEvent) {
        setValue(data);
        setBarcodeScanVisibility(!barcodeScanVisibility)
    };

    return (
        <AlkModal
            VisibleElement={() => (
                <TouchableOpacity style={rest.style}>
                    <View style={styles.scan}>
                        <MaterialCommunityIcons name="barcode-scan" style={styles.barcodeIcon} />
                        <Text style={styles.barcodeTitle}>Ler código</Text>
                    </View>
                    <Text style={styles.barcodeText}>Clique aqui para preencher os campos automanticamente</Text>
                </TouchableOpacity>
            )}
            children={
                <>
                    <BarCodeScanner onBarCodeScanned={handleBarCodeScanned} style={StyleSheet.absoluteFillObject} />
                    <MaterialCommunityIcons name="scan-helper" style={styles.barcodeCamIcon} />
                </>
            }
            visibleProp={barcodeScanVisibility}
            buttonCloseText="Fechar"
        />
    );
}
const { height } = Dimensions.get("screen");

const styles = StyleSheet.create({
    barcodeTitle: {
        marginHorizontal: 10,
        fontWeight: "bold",
        fontSize: 16,
        textTransform: "uppercase"
    },
    barcodeCamIcon: {
        top: height / 3,
        fontSize: 255,
        color: ColorsCss.grey.darken4,
        alignSelf: "center"
    },
    scan: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    barcodeIcon: {
        fontSize: 35,
        color: LayoutCss.isDarkTheme ? "white" : "black",
    },
    barcodeText: {
        color: ColorsCss.grey.lighten2,
        marginHorizontal: 8,
        fontSize: 12,
    },

})