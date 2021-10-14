import { FontAwesome5 } from "@expo/vector-icons";
import React from 'react';
import { Button, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MvInput } from "../widgets/mv-input";
import style from "./style";

const NewProduct: React.FC = () => {
    return (
        <View style={style.container}>
            <TouchableOpacity style={style.photo}>
                <FontAwesome5 name={"file-image"} size={45} />
                <Text>Adicionar foto</Text>
            </TouchableOpacity>
            <View style={style.fields}>
                <ScrollView>
                    <MvInput icon={"file-signature"} value="" placeholder="Nome do produto" />
                    <MvInput icon={"sitemap"} value="" placeholder="Categoria" />
                    <MvInput icon={"barcode"} value="" placeholder="Código de barra" />
                    <MvInput icon={"money-bill-wave"} value="" placeholder="Preço de compra" />
                    <MvInput icon={"layer-group"} value="" placeholder="Quantidade" />
                    <MvInput icon={"calendar-check"} value="" placeholder="Data da aquisição" />
                </ScrollView>
            </View>
            <View style={style.buttons}>
                <Button title={"Salvar"} onPress={() => { }} />
                <Button title={"Cancelar"} onPress={() => { }}/>
            </View>
        </View>
    );
}

export { NewProduct };
