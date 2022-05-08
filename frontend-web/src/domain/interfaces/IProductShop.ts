import { IStore } from "./IStore";

export interface IProductShop {
    id?: number;
    price: number;
    quantity: number;
    store: IStore;
}