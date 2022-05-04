import { NextFunction, Response } from "express";
import { RequestApi } from "./request-api";

/**
 *
 * @param {RequestWithUser} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {void}
 * @swagger
 *  components:
 *   securitySchemes:
 *     ApiKeyAuth:
 *       type: apiKey
 *       in: header
 *       name: x-access-token
 */
export function isAuthenticated (req: RequestApi, res: Response, next: NextFunction): void {
    // POR ENQUANTO JA DEIXA AUTENTICADO.
    req.appAttributes = {
        operadorId: 1,
    };
    next();

    // CRIAR A AUTENTICACAO NA PROXIMA VERSAO
    /*

import jwt, { JwtPayload } from "jsonwebtoken";
import * as MsgError from "./msg-error";

    const token: string = req.headers["x-access-token"] as string;

    // Validate request
    if (!token) {
        next(MsgError.createErrorMsg("Token não informado.", 400));
        return;
    }

    try {
        const user: JwtPayload = jwt.verify(token, String(process.env.SECRET)) as JwtPayload;
        req.appAttributes = {
            operadorId: Number(user.operadorId),
        };
        next();
    } catch (error) {
        next(MsgError.createErrorMsg("Token inválido ou expirado.", 401));
    }
    */
}
