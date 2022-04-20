import { ISale } from "../interfaces/ISale";
import { http } from "./http";

async function fetch(filter?: string): Promise<ISale[]> {
    const response = await http.get("/sales")
    const products: ISale[] = response.data
    return products;
}   

async function fetchOne(code: number): Promise<ISale> {
    const response = await http.get(`/sales${code}`);
    const product: ISale = response.data;
    return product;
}

async function save(product: ISale): Promise<ISale>{
    const response = await http.post("/sales", product)
    const productNew: ISale = response.data;
    return productNew;
}
async function exclude(product: ISale): Promise<void> {
    await http.delete(`/sales/${product.id}`);
}

export const SaleHttp = {
    fetch,
    fetchOne,
    save,
    exclude
}