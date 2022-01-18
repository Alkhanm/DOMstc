import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import { comparatorAscending, comparatorDescending, createFilter } from "../../domain/functions/ProductFunctions";
import { eCategory, eCompany, IProduct, tProductProperty } from "../../domain/interfaces/IProduct";
import { AlkModal } from "../widgets/AlkModal";
import { AlkRadioButton, AlkRadioButtonItem } from "../widgets/AlkRadioButton";
import { Text } from "../widgets/Themed";

type tFilter = (p: IProduct) => IProduct;

interface ProductOrderFilterProps {
    products: IProduct[];
    orderedProducts: IProduct[];
    setOrderedProducts: (products: IProduct[]) => void;
}

const orderOptions: AlkRadioButtonItem[] = [
    { text: "Data", value: "purchaseDate" },
    { text: "Preço de compra", value: "purchasePrice" },
    { text: "Preço de venda", value: "salePrice" },
    { text: "Quantidade disponivel", value: "quantity" },
    { text: "Categoria", value: "category" },
    { text: "Fabricante", value: "company" }
]
// Algum mecanismo não permite que um função seja definida através do setState, 
// por isso optei por usar um objeto que carrega apenas uma função "apply" para representar as funções de filtro disponiveis
const filterCategoryOptions: AlkRadioButtonItem[] = [
    { text: "Todas", value: { apply: (p: IProduct) => p } },
    { text: "Colônia", value: { apply: createFilter("category")(eCategory.COLONIA) } },
    { text: "Shampoo", value: { apply: createFilter("category")(eCategory.SAMPHOO) } },
    { text: "Sabonete em barras", value: { apply: createFilter("category")(eCategory.SABONETE_EM_BARRA) } },
    { text: "Creme corporal", value: { apply: createFilter("category")(eCategory.CREME_PARA_O_CORPO) } },
]
const filterCompanyOptions: AlkRadioButtonItem[] = [
    { text: "Todas", value: { apply: (p: IProduct) => p } },
    { text: "Avon", value: { apply: createFilter("company")(eCompany.AVON) } },
    { text: "Natura", value: { apply: createFilter("company")(eCompany.NATURA) } },
]

export const ProductOrderFilter: React.FC<ProductOrderFilterProps> = ({ products, orderedProducts, setOrderedProducts }) => {
    type tFilterFun = { apply: (e: IProduct) => IProduct };
    const [filterCategory, setFilterCategory] = useState<tFilterFun>(filterCategoryOptions[0].value)
    const [filterCompany, setFilterCompany] = useState<tFilterFun>(filterCompanyOptions[0].value)

    const [order, setOrder] = useState<tProductProperty>("purchaseDate");
    const [descendingOrder, setDescendingOrder] = useState<boolean>(true);

    const descendingColor = useMemo(() => {
        return descendingOrder ? "white" : ColorsCss.grey.lighten;
    }, [descendingOrder]);

    const ascendingColor = useMemo(() => {
        return !descendingOrder ? "white" : ColorsCss.grey.lighten;
    }, [descendingOrder]);

    useEffect(() => {
        const ordered = products
            .filter(filterCategory.apply)
            .filter(filterCompany.apply)
        setOrderedProducts([...ordered])
    }, [filterCategory, filterCompany])

    useEffect(() => {
        const comparator = descendingOrder ? comparatorDescending(order) : comparatorAscending(order);
        const orderedList = orderedProducts.sort(comparator)
        setOrderedProducts([...orderedList]);
    }, [order, descendingOrder])

    return (
        <View style={styles.container}>
            {/* ORDENAR */}
            <AlkModal VisibleElement={() => (
                <TouchableOpacity
                    style={styles.button}>
                    <MaterialCommunityIcons name="order-alphabetical-ascending" size={30} color={"white"} />
                    <Text style={appCss.infoText}>Ordenar</Text>
                </TouchableOpacity>
            )}>
                <Text style={appCss.subtitle}>Ordenar</Text>
                <View style={styles.orderContent}>
                    <TouchableOpacity onPress={_ => setDescendingOrder(false)} style={appCss.textIcon}>
                        <MaterialCommunityIcons name="sort-ascending" size={25} color={ascendingColor} />
                        <Text style={[styles.orderTypeText, { color: ascendingColor }]}>Ascendente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_ => setDescendingOrder(true)} style={appCss.textIcon}>
                        <MaterialCommunityIcons name="sort-descending" size={25} color={descendingColor} />
                        <Text style={[styles.orderTypeText, { color: descendingColor }]}>Descendente</Text>
                    </TouchableOpacity>
                </View>
                <AlkRadioButton defaultSelect={order} onSelectChange={setOrder} items={orderOptions} />
            </AlkModal>
            {/* FILTRAR */}
            <AlkModal VisibleElement={() => (
                <TouchableOpacity
                    style={styles.button}>
                    <MaterialCommunityIcons name="filter" size={30} color={"white"} />
                    <Text style={appCss.infoText}>Filtrar</Text>
                </TouchableOpacity>
            )}>
                <Text style={appCss.subtitle}>Filtrar</Text>
                <Text style={styles.item}>Fabricante</Text>
                <AlkRadioButton
                    items={filterCompanyOptions}
                    onSelectChange={setFilterCompany}
                    defaultSelect={filterCompany}
                />
                <Text style={styles.item}>Categoria</Text>
                <AlkRadioButton
                    onSelectChange={setFilterCategory}
                    items={filterCategoryOptions}
                    defaultSelect={filterCategory}
                />
            </AlkModal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        width: "100%",
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    orderContent: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    orderTypeText: {
        fontSize: 12,
        padding: 5,
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    item: {
        width: "90%",
        fontSize: 16,
        textAlign: "left",
        color: ColorsCss.grey.c,
        fontWeight: "bold"
    },
})