import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Button, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AlkBarcodeScanner } from "../widgets/alk-barcode-scanner";
import { AlkInput } from "../widgets/alk-input";
import style from "./style";

const NewProduct: React.FC = () => {
    const [barcodeInfo, setBarcodeInfo] = useState<any>();

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.photo}>
                <FontAwesome5 name={"file-image"} size={45} />
                <Text>Adicionar foto</Text>
            </TouchableOpacity>
            <View style={style.fields}>
                <ScrollView>
                    <AlkInput icon={"file-signature"} value="" placeholder="Nome do produto" />
                    <AlkInput icon={"sitemap"} value="" placeholder="Categoria" />
                    <AlkInput icon={"money-bill-wave"} value="" placeholder="Preço de compra" />
                    <AlkInput icon={"layer-group"} value="" placeholder="Quantidade" />
                    <AlkInput icon={"calendar-check"} value="" placeholder="Data da aquisição" />
                    <View style={style.barcode}>
                        <TextInput maxLength={13} placeholder={"Código de barra"} style={style.barcodeInput} />
                        <AlkBarcodeScanner setData={setBarcodeInfo} />
                    </View>
                </ScrollView>
            </View>
            <View style={style.buttons}>
                <Button title={"Salvar"} onPress={() => { }} />
                <Button title={"Cancelar"} onPress={() => { }} />
            </View>
        </View>
    );
}

export { NewProduct };
