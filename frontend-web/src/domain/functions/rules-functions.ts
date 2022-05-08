const emptyRules = (v: string) => (!!v) || "Preencha o campo";
const biggerThan = (value: number) => (v: string) => Number(v) >= value || `Precisa ser maior que ${value}`
const lessThan = (value: number) => (v: string) => (v && Number(v) <= value) || `Precisa ser menor que ${value}`

const storeRules = [
    emptyRules,
    (v: string) => (v !== "NENHUMA") || "Selecione a(s) loja(s)",
]
const priceRules = [
    emptyRules,
    (v: string) => (!!v && Number(v) >= 1) || "Defina o preço de venda"
];

const quantityRules = [
    emptyRules,
    lessThan(10)
];

export const RulesFunctions = {
    storeRules,
    priceRules,
    quantityRules
}