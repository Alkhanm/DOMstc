/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import fs from "fs";
import path from "path";
import { ModelStatic, Options, Sequelize } from "sequelize";
import { CommomModel } from "./commom/commom-model";
import { ProductModel } from "./product-model"

interface ConfigAttributes {
  username: string,
  password: string,
  database: string,
  options: Options
}

const db: { [key: string]: Sequelize | typeof Sequelize | any } = {};
// const databases: { [key: string]: typeof db } = {};
// async function initAllDbModules (): Promise<void> {
//   const env = process.env.NODE_ENV || "development";
//   const config: ConfigAttributes[] = (JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config", "db.json"), "utf8")) as { [key: string]: ConfigAttributes[] })[env];
//   const sequelizes = config.map(conf => new Sequelize(conf.database, conf.username, conf.password, conf.options));
//   for await (const sequelize of sequelizes) {
//     databases[sequelize.config.database] = await getDbModule(sequelize);
//   }
// }

// async function getDbModule(sequelize: Sequelize) {
//   // variaveis
//   const basename = path.basename(__filename);

//   const files: string[] = fs.readdirSync(__dirname)
//     .filter((file: string) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".ts" || file.slice(-3) === ".js"));

//   for await (const file of files) {
//     await import(path.join(__dirname, file)).then((model: { default: (s: typeof sequelize) => typeof CommomModel }) => {
//       const md = model.default(sequelize);
//       db[md.name] = md;
//     });
//   }

//   Object.keys(db).forEach((modelName) => {
//     if ("associate" in db[modelName]) {
//       (db[modelName] as typeof CommomModel).associate(db);
//     }
//   });

//   db.sequelize = sequelize;
//   db.Sequelize = sequelize.Sequelize;
//   return db;
// }

(async () => {
  await initDbModules();
  const pesModel = getModel(ProductModel);
  pesModel.findByPk(17).then(console.log).catch(console.log);
})();

export async function initDbModules() {
  // variaveis
  const basename = path.basename(__filename);
  const env = process.env.NODE_ENV || "development";
  const config: ConfigAttributes = (JSON.parse(fs.readFileSync(path.join(__dirname, "..", "config", "db.json"), "utf8")) as { [key: string]: ConfigAttributes })[env];

  const sequelize: Sequelize = new Sequelize(config.database, config.username, config.password, config.options);

  const files: string[] = fs.readdirSync(__dirname)
    .filter((file: string) => (file.indexOf(".") !== 0) && (file !== basename) && (file.slice(-3) === ".ts" || file.slice(-3) === ".js"));

  for await (const file of files) {
    await import(path.join(__dirname, file)).then((model: { default: (s: typeof sequelize) => typeof CommomModel }) => {
      const md = model.default(sequelize);
      db[md.name] = md;
    });
  }

  Object.keys(db).forEach((modelName) => {
    if ("associate" in db[modelName]) {
      (db[modelName] as typeof CommomModel).associate(db);
    }
  });

  db.sequelize = sequelize;
  db.Sequelize = sequelize.Sequelize;
}

export default db;

export function getModel<M extends CommomModel>(ModelType: ModelStatic<M>): ModelStatic<M> {
  return (db[ModelType.name] as ModelStatic<M>);
}

// function getDatabaseAndModel<M extends CommomModel> (ModelType: ModelStatic<M>, database: string): ModelStatic<M> {
//   return (databases[database][ModelType.name] as ModelStatic<M>);
// }

export function getSequelize(): Sequelize {
  return db.sequelize as Sequelize;
}
