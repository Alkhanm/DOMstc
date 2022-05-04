import createError, { HttpError } from "http-errors";

const MSG_PADRAO = "Ocorreu um erro interno. Contate suporte.";
const MSG_ERRO_DEL = "Este registro não pode ser excluído, ele está vinculado a outro cadastro.";

export function createErrorStatus (statusHttp: number): HttpError {
    return createError(statusHttp);
}

export function createErrorMsg (msg: string, statusHttp?: number): HttpError {
    const httpError: HttpError = createError(msg);
    httpError.status = statusHttp || 500;
    return httpError;
}

export function createErrorMsgPadrao (statusHttp?: number): HttpError {
    const httpError: HttpError = createError(MSG_PADRAO);
    httpError.status = statusHttp || 500;
    return httpError;
}

export function createErrorMsgPadraoDel (statusHttp?: number): HttpError {
    const httpError: HttpError = createError(MSG_ERRO_DEL);
    httpError.status = statusHttp || 500;
    return httpError;
}

export function createInternalError (err: unknown): HttpError {
    const httpError: HttpError = createError(MSG_PADRAO);
    httpError.status = 500;
    httpError.stack = String(err);
    return httpError;
}

export function solveError (err: unknown): HttpError {
    if (err instanceof HttpError) {
        return err;
    }
    return createInternalError(err);
}
