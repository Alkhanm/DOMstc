
import { reactive } from "vue";
import { IProduct } from "../domain/interfaces/IProduct";

interface State {
    list: IProduct[]
}

const state: State = reactive({
    list: [],
})

const actions = {
    add: (product: IProduct): IProduct[] => {
        state.list.push(product);
        return state.list;
    },
    addAll: (products: IProduct[]): IProduct[] => {
        state.list = products
        return state.list;
    }
}

export const ProductStore = {
    state,
    actions
}