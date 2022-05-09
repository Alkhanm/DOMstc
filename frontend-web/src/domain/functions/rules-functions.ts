import { IProduct } from "../interfaces/IProduct";
import { IProductShop } from "../interfaces/IProductShop";
import { IStore } from "../interfaces/IStore";

function biggerThan(qnt: number, msg?: string) {
    return (v: string) => (Number(v) >= qnt) || (msg ? msg : `Precisa ser maior que ${qnt}`)
}
function lessThan(qnt: number, msg?: string) {
    return (v: string) => (Number(v) <= qnt) || (msg ? msg : `Precisa ser menor que ${qnt}`)
}

function isNotEmpty(v: string) {
    return (!!v) || "Preencha o campo";
}

const priceRules = [
    isNotEmpty,
];

const defaultRules = [
    isNotEmpty
]

const barcodeRules = [
    isNotEmpty,
    (v: string) => (!!Number(v.trim()) && v.trim().length === 12) || "Valor invalido"
]

const getStoreRules = (storeList: IStore[]) => {
    const storeRule = (v: string) => storeList.some(s => v.includes(s.name)) || "Selecione ao menos uma loja"
    return [
        isNotEmpty,
        storeRule
    ]
}

const getStockRules = (product: IProduct, productShop: IProductShop[]) => {
    const productStock: number = product.quantity;
    const msg = (qnt: number) => `Há apenas ${qnt} unidades disponiveis`;

    if (!productStock) return [isNotEmpty]
    if (!productShop.length) return [isNotEmpty, lessThan(productStock, msg(productStock))]

    const actualStock: number = productShop
        .map(ps => ps.quantity, productShop)
        .reduce((prev, curr) => Number(prev) + Number(curr));

    const availableStock: number = productStock - actualStock;

    return [
        isNotEmpty,
        lessThan(availableStock, msg(availableStock))
    ]
}

export const RulesFunctions = {
    defaultRules,
    priceRules,
    barcodeRules,
    getStoreRules,
    getStockRules
}