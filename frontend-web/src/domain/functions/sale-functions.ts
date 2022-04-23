
import { IItem } from "../interfaces/IItem";
import { ISale } from "../interfaces/ISale";

function getTotalValue(items: IItem[]): number {
    return items
    .map(item => item.product.salePrice * item.quantity)
    .reduce((previous, current) => previous + current, 0)
}


export const SaleFunctions = {
    getTotalValue
}