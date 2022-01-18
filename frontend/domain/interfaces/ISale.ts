import { IProduct } from "./IProduct";

export interface ISale {
    id: number;
    date: Date;
    quantity: number;
    product: IProduct;
}