import { DataTypes, Sequelize } from "sequelize";
import { CommomModel } from "./commom/commom-model";

export class ProductModel extends CommomModel {
    declare descTipoPessoa?: string | null;
    declare description: string | null;
}

export default (sequelize: Sequelize): typeof ProductModel => {
    ProductModel.init({
        id: {
            field: "id",
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
        },
        description: {
            type: DataTypes.STRING
        }
    }, {
        sequelize, /* We need to pass the connection instance */
        tableName: "tb_product",
        timestamps: false,
    });
    return ProductModel;
};
