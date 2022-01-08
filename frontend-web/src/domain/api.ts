import axios from "axios";
import iProduct from "./iProduct";

const api = axios.create({
    baseURL: "http://localhost:8090"
})

const getProducts = async (): Promise<iProduct[]> => {
    const response = await api.get("/products");
    return response.data;
};

const save = async (product: iProduct): Promise<iProduct> => {
    const response = await api.post("/products", product)
    return response.data;
}

async function deleteProduct(id: number){
    await api.delete(`/products/${id}`)
}

export default {
    deleteProduct,
    getProducts,
    save,
}