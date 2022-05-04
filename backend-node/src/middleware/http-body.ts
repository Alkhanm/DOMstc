import { HttpError } from "http-errors";

export interface IHttpBodyMeta {
    length: number;
}

export interface IHttpBody {
    code: number;
    meta?: IHttpBodyMeta;
    data?: unknown;
}

export function createHttpBody (code: number, data: unknown): IHttpBody {
    let meta: IHttpBodyMeta | undefined;
    if (data && data instanceof Array) {
        meta = {
            length: (data).length,
        };
    }

    return {
        code,
        meta,
        data,
    };
}

export function createHttpBodyError (httpErr: HttpError): IHttpBody {
    return {
        code: httpErr.status || httpErr.statusCode || 500,
        data: httpErr.message,
    };
}
