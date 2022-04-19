export type alertType = "ERROR" | "SUCCESS" | "WARNING" | "INFO";
export type alertEntity = "PRODUCT" | "SALE"
export type alertOperation = "SAVE" | "DELETE" | "FIND";

export interface IAlert {
    msg: string;
    type: alertType;
    operation: alertOperation;
    entity: alertEntity;
}