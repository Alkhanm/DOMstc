import { IProduct } from "../interfaces/IProduct";
import { IProductShop } from "../interfaces/IProductShop";
import { IStore } from "../interfaces/IStore";

function create(product: IProduct, store: IStore, empty?: boolean): IProductShop {
    return {
        price: product.salePrice,
        quantity: product.quantity ? 1 : product.quantity,
        store: {...store}
    }
}


export const ProductShopFunctions = {
    create
}