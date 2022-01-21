import { IProduct } from "../interfaces/IProduct";
import { http } from "./http";


async function fetch(filter?: string): Promise<IProduct[]> {
    const response = await http.get("/")
    const products: IProduct[] = response.data
    return products;
}   

async function fetchOne(code: number): Promise<IProduct> {
    const response = await http.get(`/${code}`);
    const product: IProduct = response.data;
    return product;
}

export const ProductHttp = {
    fetch,
    fetchOne,
}