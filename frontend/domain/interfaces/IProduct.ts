export type tCategory = "SABONETE EM BARRA" | "SABONETE LIQUIDO" | "PERFUME" | "COLÔNIA" | "SAMPHOO" | "CONDICIONADOR" | "OUTRO" | "SABONETE EM BARRA SABONETE EM BARRA SABONETE EM BARRA";
export type tCompany = "NATURA" | "AVON" | "HINODE" | "BOTICARIO" | "NATURA NATURA NATURA";

export interface IProduct {
    id: number;
    code: number;
    quantity: number;
    category: tCategory;
    company: tCompany;
    brand: string;
    description: string;
    variation: string;
    purchaseDate: string;
    purchasePrice: number;
    salePrice: number;
    imageURL: string;
    volume?: number | 0;
    weight?: number | 0;
    unit?: number | 1;
}