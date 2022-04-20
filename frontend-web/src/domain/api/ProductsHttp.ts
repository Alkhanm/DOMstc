import { IProduct } from "../interfaces/IProduct";
import { http } from "./http";


async function fetch(filter?: string): Promise<IProduct[]> {
    const response = await http.get("/products")
    const products: IProduct[] = response.data
    return products;
}   

async function fetchOne(code: number): Promise<IProduct> {
    const response = await http.get(`/products/${code}`);
    const product: IProduct = response.data;
    return product;
}

async function save(product: IProduct): Promise<IProduct>{
    const response = await http.post("/products", product)
    const productNew: IProduct = response.data;
    return productNew;
}
async function exclude(product: IProduct): Promise<void> {
    await http.delete(`/products/${product.id}`);
}

export const ProductHttp = {
    fetch,
    fetchOne,
    save,
    exclude
}