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

async function create(product: IProduct): Promise<IProduct>{
    const response = await http.post("/", product)
    const productNew: IProduct = response.data;
    return productNew;
}

export const ProductHttp = {
    fetch,
    fetchOne,
    create
}