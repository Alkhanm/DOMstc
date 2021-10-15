import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colorCss from "../../../styles/color.css";
import style from "./style";

interface AlkBarcodeScannerProps {
    setData(data: any): void
}

export const AlkBarcodeScanner: React.FC<AlkBarcodeScannerProps> = ({ setData }) => {
    const [modalVisibility, setModalVisibility] = useState(true)

    useEffect(() => {
        (async () => await BarCodeScanner.requestPermissionsAsync())();
    }, []);

    const handleBarCodeScanned = ({ data, type }) => {
        setData(data);
        //setModalVisibility(false)
        console.log(data)
    }

    return (
        <View style={style.container}>
            <Modal
                animationType="slide"
                visible={modalVisibility}
            >
                <View style={style.modalView}>
                    <BarCodeScanner
                        collapsable onBarCodeScanned={handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject} />
                    <View style={style.barCodeBox}>
                        <Text style={style.barCodeText}>Ler código de barra</Text>
                        <MaterialCommunityIcons name="scan-helper" size={300} color={"white"} />
                        <TouchableOpacity onPress={() => setModalVisibility(false)} >
                            <MaterialCommunityIcons style={style.closeScan} name="barcode-off" size={65} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setModalVisibility(true)}>
                <MaterialCommunityIcons name="barcode-scan" size={35} color={colorCss.grey.c} />
            </TouchableOpacity>
        </View>
    )
}