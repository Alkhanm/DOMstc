import { NextFunction, Response } from "express";
import { ModelStatic } from "sequelize/types";
import * as HttpBody from "../middleware/http-body";
import * as MsgError from "../middleware/msg-error";
import { RequestApi } from "../middleware/request-api";
import { CommomModel } from "../models/commom/commom-model";
import * as CommomServ from "../services/commom-service";
import * as GlobalUtils from "../utils/global-utils";

export function save<M extends CommomModel> (ModelType: ModelStatic<M>, req: RequestApi, res: Response, next: NextFunction, fnSave?: CommomServ.save<M>, fnSaveAll?: CommomServ.saveAll<M>) {
    // Validate request
    if (GlobalUtils.isEmpty(req.body)) {
        next(MsgError.createErrorStatus(400));
        return;
    }

    if (Array.isArray(req.body)) {
        if (fnSaveAll) {
            fnSaveAll(req.body as M[], req.appAttributes!).then((rec: Array<M>) => {
                const records: M[] = [];
                rec.forEach((el: M) => {
                    records.push(el.toJSON());
                });
                res.status(200).json(HttpBody.createHttpBody(200, records));
            }).catch((err: Error) => next(MsgError.solveError(err)));
            return;
        }
        CommomServ.saveAll(ModelType, req.body, req.appAttributes!).then((rec: Array<M>) => {
            const records: M[] = [];
            rec.forEach((el: M) => {
                records.push(el.toJSON());
            });
            res.status(200).json(HttpBody.createHttpBody(200, records));
        }).catch((err: Error) => next(MsgError.solveError(err)));
    } else {
        if (fnSave) {
            fnSave(req.body as M, req.appAttributes!).then((rec: M) => {
                res.status(200).json(HttpBody.createHttpBody(200, rec.toJSON()));
            }).catch((err: Error) => next(MsgError.solveError(err)));
            return;
        }
        CommomServ.save(ModelType, req.body, req.appAttributes!).then((rec: M) => {
            res.status(200).json(HttpBody.createHttpBody(200, rec.toJSON()));
        }).catch((err: Error) => next(MsgError.solveError(err)));
    }
}

export function findAll<M extends CommomModel> (ModelType: ModelStatic<M>, req: RequestApi, res: Response, next: NextFunction, fnFindAll?: CommomServ.findAll<M>) {
    if (fnFindAll) {
        fnFindAll(req.query)
            .then((rec: Array<M>) => {
                const records: M[] = [];
                rec.forEach((el: M) => {
                    records.push(el.toJSON());
                });
                res.status(200).json(HttpBody.createHttpBody(200, records));
            })
            .catch((err: Error) => next(MsgError.solveError(err)));
        return;
    }

    CommomServ.findAll(ModelType, req.query)
        .then((rec: Array<M>) => {
            const records: M[] = [];
            rec.forEach((el: M) => {
                records.push(el.toJSON());
            });
            res.status(200).json(HttpBody.createHttpBody(200, records));
        })
        .catch((err: Error) => next(MsgError.solveError(err)));
}

export function findOne<M extends CommomModel> (ModelType: ModelStatic<M>, req: RequestApi, res: Response, next: NextFunction, fnFindOne?: CommomServ.findOne<M>) {
    if (fnFindOne) {
        fnFindOne(req.query)
            .then((rec: M | null) => {
                res.status(200).json(HttpBody.createHttpBody(200, rec ? rec.toJSON() : ""));
            })
            .catch((err: Error) => next(MsgError.solveError(err)));
        return;
    }

    CommomServ.findOne(ModelType, req.query)
        .then((rec: M | null) => {
            res.status(200).json(HttpBody.createHttpBody(200, rec ? rec.toJSON() : ""));
        })
        .catch((err: Error) => next(MsgError.solveError(err)));
}

export function update<M extends CommomModel> (ModelType: ModelStatic<M>, req: RequestApi, res: Response, next: NextFunction, fnSave?: CommomServ.save<M>) {
    // Validate request
    if (!req.params || !req.params.id) {
        next(MsgError.createErrorStatus(400));
        return;
    }
    if (GlobalUtils.isEmpty(req.body)) {
        next(MsgError.createErrorStatus(400));
        return;
    }
    // Atualizando id
    (req.body as Record<string, unknown>).id = Number(req.params.id);

    // Chama Service
    if (fnSave) {
        fnSave(req.body as M, req.appAttributes!).then((rec: M) => {
            res.status(200).json(HttpBody.createHttpBody(200, rec.toJSON()));
        }).catch((err: Error) => next(MsgError.solveError(err)));
        return;
    }
    CommomServ.save(ModelType, req.body, req.appAttributes!).then((rec: M) => {
        res.status(200).json(HttpBody.createHttpBody(200, rec.toJSON()));
    }).catch((err: Error) => next(MsgError.solveError(err)));
}

export function findById<M extends CommomModel> (ModelType: ModelStatic<M>, req: RequestApi, res: Response, next: NextFunction, fnFindById?: CommomServ.findById<M>) {
    // Validate request
    if (!req.params || !req.params.id) {
        next(MsgError.createErrorStatus(400));
        return;
    }

    if (fnFindById) {
        fnFindById(ModelType, Number(req.params.id))
            .then((rec: M | null) => {
                if (!rec) {
                    next(MsgError.createErrorMsg("Registro não encontrado", 406));
                    return;
                }
                res.status(200).json(HttpBody.createHttpBody(200, rec.toJSON()));
            })
            .catch((err: Error) => next(MsgError.solveError(err)));
        return;
    }

    CommomServ.findById(ModelType, Number(req.params.id))
        .then((rec: M | null) => {
            if (!rec) {
                next(MsgError.createErrorMsg("Registro não encontrado", 406));
                return;
            }
            res.status(200).json(HttpBody.createHttpBody(200, rec.toJSON()));
        })
        .catch((err: Error) => next(MsgError.solveError(err)));
}

export function destroy<M extends CommomModel> (ModelType: ModelStatic<M>, req: RequestApi, res: Response, next: NextFunction) {
    // Validate request
    if (!req.params || !req.params.id) {
        next(MsgError.createErrorStatus(400));
        return;
    }

    CommomServ.destroy(ModelType, Number(req.params.id))
        .then((del: number) => {
            if (del === 0) {
                next(MsgError.createErrorMsg("Registro não encontrado", 404));
                return;
            }
            res.status(202).json();
        }).catch(() => {
            // ERRO EM DELETE E CONSTRAINT
            next(MsgError.createErrorMsgPadraoDel(406));
        });
}
