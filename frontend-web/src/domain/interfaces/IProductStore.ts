import { IStore } from "./IStore";

export interface IProductStore {
    id: number;
    price: number;
    qnt: number;
    store: IStore;
}