export enum eCategory {
    SABONETE_EM_BARRA = "SABONETE EM BARRAS",
    CREME_PARA_O_CORPO = "CREME PARA O CORPO",
    SABONETE_LIQUIDO = "SABONETE LIQUIDO",
    PERFUME = "PERFUME",
    COLONIA = "COLÔNIA",
    SAMPHOO = "SAMPHOO",
    CONDICIONADOR = "CONDICIONADOR"
}
export enum eCompany {
    AVON = "AVON",
    BOTICARIO = "BOTICARIO",
    HINODE = "HINODE",
    NATURA = "NATURA",
};

export type tProductProperty = keyof IProduct;

export interface IProduct {
    id: number;
    code: number;
    quantity: number;
    category: eCategory;
    company: eCompany;
    brand: string;
    description: string;
    variation: string;
    purchaseDate: string;
    purchasePrice: number;
    salePrice: number;
    imageUrl: string;
    volume: number | 0;
    weight: number | 0;
    unit: number | 1;
}