import { IProduct } from "./IProduct";

export enum eSaleCanal {
    CANAL1 = "FISICO",
    CANAL2 = "AMAZON",
    CANAL3 = "SHOPEE",
    CANAL4 = "MERCADO LIVRE"
}

export interface ISale {
    id: number;
    date: Date;
    quantity: number;
    product: IProduct;
    canal: eSaleCanal;
}