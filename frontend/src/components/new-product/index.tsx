import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from 'react';
import { Button, ScrollView, TouchableOpacity, View } from 'react-native';
import iProduct from "../../domain/interfaces/iProduct";
import colorCss from "../../styles/color.css";
import { AlkBarcodeScanner } from "../widgets/alk-barcode-scanner";
import { AlkInput } from "../widgets/alk-input";
import style from "./style";

const NewProduct: React.FC = () => {
    const [product, setProduct] = useState<iProduct>({} as iProduct);

    const [name, setName] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [qnt, setQnt] = useState<number>(0);
    const [date, setDate] = useState<string>("");
    const [barCode, setBarCode] = useState<number>(0);

    function save() {
        product.name = name;
        product.category = category;
        product.purchasePrice = price;
        product.quantity = qnt;
        product.acquisitionDate = date;
        console.log(product)
    }

    return (
        <View style={style.container}>
            <TouchableOpacity style={style.photo}>
                <FontAwesome5 name={"file-image"} size={45} color={colorCss.grey.c} />
            </TouchableOpacity>
            <View style={style.fields}>
                <ScrollView>
                    <AlkInput
                        placeholder="Nome do produto"
                        icon={"file-signature"}
                        onChangeText={setName}
                        value={name}
                        style={style.field}
                    />
                    <AlkInput
                        placeholder="Categoria"
                        icon={"sitemap"}
                        onChangeText={setCategory}
                        value={category}
                        style={style.field}
                    />
                    <AlkInput
                        placeholder="Preço de compra"
                        icon={"money-bill-wave"}
                        keyboardType="numeric"
                        onChangeText={(value) => setPrice(Number(value))}
                        value={price ? price.toString() : ""}
                        style={style.field}
                    />
                    <AlkInput
                        style={style.field}
                        placeholder="Quantidade"
                        icon={"layer-group"}
                        keyboardType="numeric"
                        onChangeText={(value) => setQnt(Number(value))}
                        value={qnt ? qnt.toString() : ""}
                    />
                    <AlkInput
                        style={style.field}
                        placeholder="Data da aquisição"
                        icon={"calendar-check"}
                        onChangeText={setDate}
                        value={date}
                    />
                    <AlkInput
                        icon="barcode"
                        children={<AlkBarcodeScanner setData={setBarCode} />}
                        value={barCode ? barCode.toString() : ""}
                        onChangeText={(barCode) => setBarCode(Number(barCode))}
                        maxLength={13}
                        keyboardType="numeric"
                        placeholder={"Código de barra"}
                        style={[style.field, style.barcodeInput]} />
                </ScrollView>
            </View>
            <View style={style.buttons}>
                <Button title={"Salvar"} onPress={save} />
                <Button title={"Cancelar"} onPress={() => { }} />
            </View>
        </View>
    );
}

export { NewProduct };
