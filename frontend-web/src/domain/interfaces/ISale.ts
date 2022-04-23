
import { Temporal } from "@js-temporal/polyfill";
import { IItem } from "./IItem";
import { IProduct } from "./IProduct";

export enum eSaleCanal {
    CANAL1 = "FISICO",
    CANAL2 = "AMAZON",
    CANAL3 = "SHOPEE",
    CANAL4 = "MERCADO LIVRE"
}

export interface ISale {
    id: number;
    description?: string;
    date: Temporal.Instant;
    items: IItem[];
    canal: eSaleCanal;
}