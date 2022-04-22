
import { reactive } from "vue";
import { ProductHttp } from "../domain/api/ProductsHttp";
import { IProduct } from "../domain/interfaces/IProduct";

interface iProductStore {
    state: {
        list: IProduct[]
    },
    actions: {
        add: (product: IProduct) => IProduct[],
        addAll: (products: IProduct[]) => IProduct[],
        remove: (product: IProduct) => void,
        fetchAll: () => Promise<void>;
    }
}

const ProductStore: iProductStore = {
    state: reactive({
        list: []
    }),
    actions: {
        add: (product: IProduct): IProduct[] => {
            ProductStore.state.list.push(product);
            return ProductStore.state.list;
        },
        addAll: (products: IProduct[]): IProduct[] => {
            ProductStore.state.list = products
            return ProductStore.state.list;
        },
        remove(product: IProduct): void {
            const newList = ProductStore.state.list.filter(p => p.id != product.id);
            ProductStore.state.list = newList;
        },
         fetchAll: async (): Promise<void>  =>{
            const productsResult = await ProductHttp.fetch();
            ProductStore.actions.addAll(productsResult);
        }
    }

}

export { ProductStore };
