import { ModelStatic } from "sequelize/types";
import { AppAttributes } from "../middleware/app-attributes";
import { CommomModel } from "../models/commom/commom-model";
import * as CommomRepo from "../repositories/commom-repository";

export type findAll<M extends CommomModel> = (query: Record<string, unknown>) => Promise<M[]>;

export type findOne<M extends CommomModel> = (query: Record<string, unknown>) => Promise<M | null>;

export type findById<M extends CommomModel> = (ModelType: ModelStatic<M>, id: number) => Promise<M | null>;

export type save<M extends CommomModel> = (record: M, appAttributes: AppAttributes) => Promise<M>;

export type update<M extends CommomModel> = (record: M, appAttributes: AppAttributes) => Promise<M>;

export type saveAll<M extends CommomModel> = (records: M[], appAttributes: AppAttributes) => Promise<M[]>;

export async function findById<M extends CommomModel> (ModelType: ModelStatic<M>, id: number): Promise<M | null> {
    return CommomRepo.findById(ModelType, id);
}

export async function save<M extends CommomModel> (ModelType: ModelStatic<M>, record: M, appAttributes: AppAttributes): Promise<M> {
    return CommomRepo.save(ModelType, record, appAttributes.operadorId!);
}

export async function saveAll<M extends CommomModel> (ModelType: ModelStatic<M>, records: M[], appAttributes: AppAttributes): Promise<M[]> {
    const arr: M[] = [];
    for await (const rec of records) {
        arr.push(await save(ModelType, rec, appAttributes));
    }
    return arr;
}

export async function findAll<M extends CommomModel> (ModelType: ModelStatic<M>, query?: Record<string, unknown>): Promise<M[]> {
    let allnested = "";
    let inativos = "";
    let ordenacao = "";
    const where: Record<string, string> = {};

    // query
    if (query) {
        Object.keys(query).forEach((key) => {
            if (key === "allnested" && query.allnested) {
                // allnested - carregar tudo
                allnested = String(query.allnested);
            } else if (key === "inativos" && query.inativos) {
                // inativos
                inativos = String(query.inativos);
            } else if (key === "ordenacao") {
                // ordenacao
                ordenacao = String(query.ordenacao);
            } else {
                // where
                where[key] = String(query[key]);
            }
        });
    }

    return CommomRepo.findAll(ModelType, where, ordenacao, inativos, allnested);
}

export async function findOne<M extends CommomModel> (ModelType: ModelStatic<M>, query?: Record<string, unknown>): Promise<M | null> {
    let allnested = "";
    let inativos = "";
    let ordenacao = "";
    const where: Record<string, string> = {};

    // query
    if (query) {
        Object.keys(query).forEach((key) => {
            if (key === "allnested" && query.allnested) {
                // allnested - carregar tudo
                allnested = String(query.allnested);
            } else if (key === "inativos" && query.inativos) {
                // inativos
                inativos = String(query.inativos);
            } else if (key === "ordenacao") {
                // ordenacao
                ordenacao = String(query.ordenacao);
            } else {
                // where
                where[key] = String(query[key]);
            }
        });
    }

    return CommomRepo.findOne(ModelType, where, ordenacao, inativos, allnested);
}

export async function destroy<M extends CommomModel> (ModelType: ModelStatic<M>, id: number): Promise<number> {
    return CommomRepo.destroy(ModelType, id);
}
