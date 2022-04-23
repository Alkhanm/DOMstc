
import { reactive } from "vue";
import { SaleHttp } from "../domain/api/SalesHttp";
import { eSaleCanal, ISale } from "../domain/interfaces/ISale";
import { ProductStore } from "./product-store";

interface ISaleStore {
    state: {
        list: ISale[]
    },
    actions: {
        add: (sale: ISale) => ISale[],
        addAll: (sales: ISale[]) => ISale[],
        remove: (sale: ISale) => void,
        fetchAll: () => Promise<void>;
    }
}

const SaleStore: ISaleStore = {
    state: reactive({
        list: []
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
        fetchAll: async ():  Promise<void> => {
            const sales = await SaleHttp.fetch()
            SaleStore.actions.addAll(sales)
        }
    }

}

export { SaleStore };
