import { IStore } from "./IStore";

export interface IProductStore {
    id: number;
    price: number;
    quantity: number;
    store: IStore;
}