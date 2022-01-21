import { IProduct } from "../interfaces/IProduct";
import { ISale } from "../interfaces/ISale";

function createSale(product: IProduct, quantity: number) {
    const sale: ISale = {
        id: Math.random() * 100,
        date: new Date(),
        product,
        quantity
    }
    return sale;
}

export {
    createSale,
};
