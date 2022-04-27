import { IStore } from "../interfaces/IStore";
import { http } from "./http";

async function fetchAll(): Promise<IStore[]> {
    const result = await http.get("/stores");
    const stores: IStore[] = result.data;
    return stores;
}


export const StoreHttp = {
    fetchAll
}