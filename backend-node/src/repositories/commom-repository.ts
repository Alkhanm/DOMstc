/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
DestroyOptions, FindOptions, Includeable, ModelStatic, Op, OrderItem, Transaction, WhereOptions,
} from "sequelize";
import * as MsgError from "../middleware/msg-error";
import { getModel, getSequelize } from "../models";
import { CommomModel } from "../models/commom/commom-model";
import * as DataUtils from "../utils/data-utils";
import * as GlobalUtils from "../utils/global-utils";

export function buildModel<M extends CommomModel> (ModelType: ModelStatic<M>, record: M, include?: Includeable | Includeable[]): M {
    return getModel<M>(ModelType).build(record, {
        include,
    });
}

export async function findById<M extends CommomModel> (ModelType: ModelStatic<M>, id: number, transaction?: Transaction): Promise<M | null> {
    return getModel<M>(ModelType).findByPk(Number(id), {
        include: { all: true, nested: true },
        transaction,
    });
}

export async function save<M extends CommomModel> (ModelType: ModelStatic<M>, record: M, operadorId: number, tran?: { transaction: Transaction }, saveAndFind?: boolean): Promise<M> {
    let rec: M | null = null;
    if (record.id) {
        // update
        rec = await getModel(ModelType).findByPk(record.id, {
            transaction: tran?.transaction,
        });
        if (!rec) {
            throw MsgError.createErrorMsg(`Id: ${record.id} não encontrado.`, 406);
        }
        rec.set(record);
    } else {
        rec = buildModel(ModelType, record);
    }
    return saveRecord(ModelType, rec, operadorId, tran, saveAndFind);
}

export async function saveRecord<M extends CommomModel> (ModelType: ModelStatic<M>, record: M, operadorId: number, tran?: { transaction: Transaction }, saveAndFind?: boolean): Promise<M> {
    let rec: M | null = await record.save(tran);
    if (saveAndFind === undefined || saveAndFind) {
        rec = await findById(ModelType, rec.id, tran?.transaction);
    }
    return rec!;
}

export async function saveAssociation<M extends CommomModel> (ModelType: ModelStatic<M>, record: any, operadorId: number, include: [{ association: string, ModelType: ModelStatic<any>, fkName: string, action: number }]): Promise<M> {
    const result: M | null = await getSequelize().transaction(async (t) => {
        // SALVANDO PRINCIPAL
        const rec: M = await save(ModelType, record, operadorId, { transaction: t }, false);
        for await (const inc of include) {
            const idAss: number[] = [];
            if (Array.isArray(record[inc.association])) {
                // SALVANDO ASSOCIACAO ARRAY
                for await (const elem of record[inc.association]) {
                    // VINCULANDO O ID
                    elem[inc.fkName] = rec?.id;
                    const elemSav = await save(inc.ModelType, elem, operadorId, { transaction: t }, false);
                    idAss.push(Number(elemSav.id));
                }
                // REMOVENDO OS VINCULOS SE FOR PRECISO
                if (inc.action === 0) {
                    const where: WhereOptions = {
                        id: {
                            [Op.notIn]: idAss,
                        },
                    };
                    where[inc.fkName] = rec?.id;

                    await getModel(inc.ModelType).destroy({
                        where,
                        transaction: t,
                    });
                } else if (inc.action === 1) {
                    const where: WhereOptions = {
                        id: {
                            [Op.notIn]: idAss,
                        },
                        dataExclusao: {
                            [Op.is]: null,
                        },
                    };
                    where[inc.fkName] = rec?.id;

                    await getModel(inc.ModelType).update({
                        operadorAlteracaoId: operadorId,
                        dataAlteracao: DataUtils.dateNowToApiStrDate(),
                        operadorExclusaoId: operadorId,
                        dataExclusao: DataUtils.dateNowToApiStrDate(),
                    }, {
                        where,
                        transaction: t,
                    });
                }
            } else {
                // SALVANDO ASSOCIACAO
                const elemSav = await save(inc.ModelType, record[inc.association], operadorId, { transaction: t }, false);
                // ATUALIZANDO FK
                record[inc.fkName] = elemSav.id;
                await save(ModelType, record, operadorId, { transaction: t }, false);
                idAss.push(Number(elemSav.id));
            }
        }
        // RETURN PRINCIPAL
        return await findById(ModelType, rec.id, t)!;
    });
    return result!;
}

export function gerarWhere (where: Record<string, string | null>): WhereOptions {
    const wOR: WhereOptions = {};
    const wAND: WhereOptions = {};

    Object.keys(where).forEach(key => {
        if (key.endsWith("_or_like")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or_like", "")]) {
                const wex = wOR[key.replace("_or_like", "")];
                wOR[key.replace("_or_like", "")] = {
                    wex,
                    [Op.like]: String(where[key]),
                };
            } else {
                wOR[key.replace("_or_like", "")] = {
                    [Op.like]: String(where[key]),
                };
            }
        } else if (key.endsWith("_or_gt")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or_gt", "")]) {
                const wex = wOR[key.replace("_or_gt", "")];
                wOR[key.replace("_or_gt", "")] = {
                    wex,
                    [Op.gt]: String(where[key]),
                };
            } else {
                wOR[key.replace("_or_gt", "")] = {
                    [Op.gt]: String(where[key]),
                };
            }
        } else if (key.endsWith("_or_gte")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or_gte", "")]) {
                const wex = wOR[key.replace("_or_gte", "")];
                wOR[key.replace("_or_gte", "")] = {
                    wex,
                    [Op.gte]: String(where[key]),
                };
            } else {
                wOR[key.replace("_or_gte", "")] = {
                    [Op.gte]: String(where[key]),
                };
            }
        } else if (key.endsWith("_or_lt")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or_lt", "")]) {
                const wex = wOR[key.replace("_or_lt", "")];
                wOR[key.replace("_or_lt", "")] = {
                    wex,
                    [Op.lt]: String(where[key]),
                };
            } else {
                wOR[key.replace("_or_lt", "")] = {
                    [Op.lt]: String(where[key]),
                };
            }
        } else if (key.endsWith("_or_lte")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or_lte", "")]) {
                const wex = wOR[key.replace("_or_lte", "")];
                wOR[key.replace("_or_lte", "")] = {
                    wex,
                    [Op.lte]: String(where[key]),
                };
            } else {
                wOR[key.replace("_or_lte", "")] = {
                    [Op.lte]: String(where[key]),
                };
            }
        } else if (key.endsWith("_or_is")) {
            wOR[key.replace("_or_is", "")] = {
                [Op.is]: null,
            };
        } else if (key.endsWith("_or_not")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or_not", "")]) {
                const wex = wOR[key.replace("_or_not", "")];
                wOR[key.replace("_or_not", "")] = {
                    wex,
                    [Op.not]: where[key],
                };
            } else {
                wOR[key.replace("_or_not", "")] = {
                    [Op.not]: where[key],
                };
            }
        } else if (key.endsWith("_or")) {
            // caso ja tenha o atributo add mais um valor
            if (wOR[key.replace("_or", "")]) {
                const wex = wOR[key.replace("_or", "")];
                wOR[key.replace("_or", "")] = {
                    wex,
                    [Op.eq]: String(where[key]),
                };
            } else {
                wOR[key.replace("_or", "")] = {
                    [Op.eq]: String(where[key]),
                };
            }
        } else if (key.endsWith("_like")) {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key.replace("_like", "")]) {
                const wex = wAND[key.replace("_like", "")];
                wAND[key.replace("_like", "")] = {
                    wex,
                    [Op.like]: String(where[key]),
                };
            } else {
                wAND[key.replace("_like", "")] = {
                    [Op.like]: String(where[key]),
                };
            }
        } else if (key.endsWith("_gt")) {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key.replace("_gt", "")]) {
                const wex = wAND[key.replace("_gt", "")];
                wAND[key.replace("_gt", "")] = {
                    wex,
                    [Op.gt]: String(where[key]),
                };
            } else {
                wAND[key.replace("_gt", "")] = {
                    [Op.gt]: String(where[key]),
                };
            }
        } else if (key.endsWith("_gte")) {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key.replace("_gte", "")]) {
                const wex = wAND[key.replace("_gte", "")];
                wAND[key.replace("_gte", "")] = {
                    wex,
                    [Op.gte]: String(where[key]),
                };
            } else {
                wAND[key.replace("_gte", "")] = {
                    [Op.gte]: String(where[key]),
                };
            }
        } else if (key.endsWith("_lt")) {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key.replace("_lt", "")]) {
                const wex = wAND[key.replace("_lt", "")];
                wAND[key.replace("_lt", "")] = {
                    wex,
                    [Op.lt]: String(where[key]),
                };
            } else {
                wAND[key.replace("_lt", "")] = {
                    [Op.lt]: String(where[key]),
                };
            }
        } else if (key.endsWith("_lte")) {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key.replace("_lte", "")]) {
                const wex = wAND[key.replace("_lte", "")];
                wAND[key.replace("_lte", "")] = {
                    wex,
                    [Op.lte]: String(where[key]),
                };
            } else {
                wAND[key.replace("_lte", "")] = {
                    [Op.lte]: String(where[key]),
                };
            }
        } else if (key.endsWith("_is")) {
            wAND[key.replace("_is", "")] = {
                [Op.is]: null,
            };
        } else if (key.endsWith("_not")) {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key.replace("_not", "")]) {
                const wex = wAND[key.replace("_not", "")];
                wAND[key.replace("_not", "")] = {
                    wex,
                    [Op.not]: where[key],
                };
            } else {
                wAND[key.replace("_not", "")] = {
                    [Op.not]: where[key],
                };
            }
        } else if (key.endsWith("_in")) {
            // caso ja tenha o atributo add mais um valor
            const vArr: string[] = String(where[key]).split(",");
            if (wAND[key.replace("_in", "")]) {
                const wex = wAND[key.replace("_in", "")];
                wAND[key.replace("_in", "")] = {
                    wex,
                    [Op.in]: vArr,
                };
            } else {
                wAND[key.replace("_in", "")] = {
                    [Op.in]: vArr,
                };
            }
        } else {
            // caso ja tenha o atributo add mais um valor
            if (wAND[key]) {
                const wex = wAND[key];
                wAND[key] = {
                    wex,
                    [Op.eq]: where[key],
                };
            } else {
                wAND[key] = {
                    [Op.eq]: where[key],
                };
            }
        }
    });

    let w: WhereOptions = {};
    if (!GlobalUtils.isEmpty(wAND) && !GlobalUtils.isEmpty(wOR)) {
        w = {
            [Op.and]: wAND,
            [Op.or]: wOR,
        };
    } else if (!GlobalUtils.isEmpty(wAND)) {
        w = {
            [Op.and]: wAND,
        };
    } else if (!GlobalUtils.isEmpty(wOR)) {
        w = {
            [Op.or]: wOR,
        };
    }
    return w;
}

export async function findAll<M extends CommomModel> (ModelType: ModelStatic<M>, where?: Record<string, string | null>, ordenacao?: string, inativos?: string, allnested?: string): Promise<M[]> {
    // inativos
    if ("dataExclusao" in ModelType.getAttributes()) {
        if (!where) {
            where = {};
        }
        if (!inativos) {
            where.dataExclusao_is = null;
        } else if (inativos === "1") {
            where.dataExclusao_not = null;
        }
    }

    const order: OrderItem[] = [];
    if (ordenacao) {
        // exemplo queryParam: id as desc, nome
        // como funciona no sequelize: ["title"] ou ["title", "DESC"]
        const aux: string[] = ordenacao.split(",");
        for (let i = 0; i < aux.length; i++) {
            const aux1: string[] = aux[i].split(" as ");
            let ordIt: OrderItem;
            if (aux1.length > 1) {
                ordIt = [aux1[0].trim(), aux1[1].trim()];
            } else {
                ordIt = aux1[0].trim();
            }
            order.push(ordIt);
        }
    }

    const opt: FindOptions = {
        include: allnested && allnested === "1" ? { all: true, nested: true } : { all: true },
        where: where ? gerarWhere(where) : undefined,
        order: order || undefined,
    };
    return getModel(ModelType).findAll(opt);
}

export async function findOne<M extends CommomModel> (ModelType: ModelStatic<M>, where?: Record<string, string | null>, ordenacao?: string, inativos?: string, allnested?: string): Promise<M | null> {
    // inativos
    if ("dataExclusao" in ModelType.getAttributes()) {
        if (!where) {
            where = {};
        }
        if (!inativos) {
            where.dataExclusao_is = null;
        } else if (inativos === "1") {
            where.dataExclusao_not = null;
        }
    }

    const order: OrderItem[] = [];
    if (ordenacao) {
        // exemplo queryParam: id as desc, nome
        // como funciona no sequelize: ["title"] ou ["title", "DESC"]
        const aux: string[] = ordenacao.split(",");
        for (let i = 0; i < aux.length; i++) {
            const aux1: string[] = aux[i].split(" as ");
            let ordIt: OrderItem;
            if (aux1.length > 1) {
                ordIt = [aux1[0].trim(), aux1[1].trim()];
            } else {
                ordIt = aux1[0].trim();
            }
            order.push(ordIt);
        }
    }

    const opt: FindOptions = {
        include: allnested && allnested === "1" ? { all: true, nested: true } : { all: true },
        where: where ? gerarWhere(where) : undefined,
        order: order || undefined,
    };
    return getModel(ModelType).findOne(opt);
}

export async function destroy<M extends CommomModel> (ModelType: ModelStatic<M>, id: number): Promise<number> {
    const options: DestroyOptions = {
        where: { id },
        limit: 1,
    };
    return getModel<M>(ModelType).destroy(options);
}

export async function checkExistsAttribute<M extends CommomModel> (ModelType: ModelStatic<M>, record: M, ...attrName: string[]): Promise<M | null> {
    const where: Record<string, string | null> = {};
    for (let index = 0; index < attrName.length; index++) {
        where[attrName[index]] = (record as any)[attrName[index]];
    }

    return findOne(ModelType, where);
}
