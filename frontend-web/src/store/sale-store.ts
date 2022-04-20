
import { reactive } from "vue";
import { ISale } from "../domain/interfaces/ISale";
import { ProductStore } from "./product-store";

interface ISaleStore {
    state: {
        list: ISale[]
    },
    actions: {
        add: (sale: ISale) => ISale[],
        addAll: (sales: ISale[]) => ISale[],
        remove: (sale: ISale) => void,
    }
}

const SaleStore: ISaleStore = {
    state: reactive({
        list: [{
            date: new Date(),
            id: 10,
            product: ProductStore.state.list[0],
            quantity: 2
        }]
    }),
    actions: {
        add: (sale: ISale): ISale[] => {
            SaleStore.state.list.push(sale);
            return SaleStore.state.list;
        },
        addAll: (sales: ISale[]): ISale[] => {
            SaleStore.state.list = sales
            return SaleStore.state.list;
        },
        remove(sale: ISale): void {
            const newList = SaleStore.state.list.filter(p => p.id != sale.id);
            SaleStore.state.list = newList;
        },
    }

}

export { SaleStore };
