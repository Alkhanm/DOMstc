
import { IItem } from "../interfaces/IItem";
function copy(item: IItem): IItem {
    return {
        product: { ...item.product },
        quantity: item.quantity
    }
}


export const ItemFunctions = {
   copy
}