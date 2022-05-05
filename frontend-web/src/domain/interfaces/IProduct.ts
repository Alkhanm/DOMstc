import { ICategory } from "./ICategory";
import { IProductStore } from "./IProductStore";

export enum eCompany {
    NENHUMA = "NENHUMA",
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
    category: ICategory;
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
    productStores: IProductStore[];
}