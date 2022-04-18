import { reactive } from "vue";
import { IProduct } from "../domain/interfaces/IProduct";

interface State {
    list: IProduct[]
}

const state: State = reactive({
    list: []
})

export const ProductState = {
    state
}