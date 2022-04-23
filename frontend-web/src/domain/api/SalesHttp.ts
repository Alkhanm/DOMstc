import { ISale } from "../interfaces/ISale";
import { http } from "./http";

async function fetch(filter?: string): Promise<ISale[]> {
    const response = await http.get("/sales")
    const sales: ISale[] = response.data
    return sales;
}   

async function fetchOne(code: number): Promise<ISale> {
    const response = await http.get(`/sales/${code}`);
    const sale: ISale = response.data;
    return sale;
}

async function save(sale: ISale): Promise<ISale>{
    const response = await http.post("/sales", sale)
    const saleNew: ISale = response.data;
    return saleNew;
}

async function exclude(sale: ISale): Promise<void> {
    await http.delete(`/sales/${sale.id}`);
}

export const SaleHttp = {
    fetch,
    fetchOne,
    save,
    exclude
}