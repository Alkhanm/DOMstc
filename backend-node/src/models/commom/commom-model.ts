import { Model } from "sequelize";

export class CommomModel extends Model {
    declare id: number;
    declare numVersao: number;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    declare static associate: (models: any) => void;
}
