import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { BarCodeScanner } from 'expo-barcode-scanner';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native';
import colorCss from "../../../styles/color.css";
import style from "./style";

interface AlkBarcodeScannerProps {
    setData(data: any): void
}

export const AlkBarcodeScanner: React.FC<AlkBarcodeScannerProps> = ({ setData }) => {
    const [scanned, setScanned] = useState(false);
    const [modalVisibility, setModalVisibility] = useState(false)

    useEffect(() => {
        (async () => await BarCodeScanner.requestPermissionsAsync())();
    }, []);

    const handleBarCodeScanned = ({ data, type }) => {
        console.log(data)
        setData(data);
        setScanned(true);
    }

    function action() {
        setScanned(!scanned);
        setModalVisibility(false);
    }

    return (
        <View style={style.container}>
            <Modal
                animationType="slide"
                visible={modalVisibility}
            >
                <View style={style.container}>
                    <BarCodeScanner
                        collapsable onBarCodeScanned={handleBarCodeScanned}
                        style={StyleSheet.absoluteFillObject} />
                    <View style={style.barCodeBox}>
                        <TouchableOpacity onPress={action}>
                            <FontAwesome5 name="window-close" size={65} color={"white"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <TouchableOpacity onPress={() => setScanned(!scanned)}>
                <MaterialCommunityIcons name="barcode-scan" size={35} color={colorCss.grey.c}/>
            </TouchableOpacity>
        </View>
    )
}