import { IProduct } from "../interfaces/IProduct";
import { IProductStore } from "../interfaces/IProductStore";
import { IStore } from "../interfaces/IStore";

function create(product: IProduct, store: IStore, empty?: boolean): IProductStore {
    return {
        price: product.salePrice,
        quantity: product.quantity ? 1 : product.quantity,
        store: {...store}
    }
}


export const ProductStoreFunctions = {
    create
}