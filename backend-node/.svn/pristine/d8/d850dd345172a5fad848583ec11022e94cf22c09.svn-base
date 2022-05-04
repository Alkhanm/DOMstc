import * as dotenv from "dotenv";

dotenv.config();

interface IConfig {
    idPlanoConta: string;
}

const NODE_ENV: string = process.env.NODE_ENV || "development";

const development: IConfig = {
    idPlanoConta: process.env.ID_CENTRO_CUSTO || "1",
};

const production: IConfig = {
    idPlanoConta: process.env.ID_CENTRO_CUSTO || "1",
};

const test: IConfig = {
    idPlanoConta: process.env.ID_CENTRO_CUSTO || "1",
};

const config: {
    [name: string]: IConfig
} = {
    test,
    development,
    production,
};

export default config[NODE_ENV];
