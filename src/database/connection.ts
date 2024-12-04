import { Sequelize } from "sequelize";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_PORT,
} from "../config";

const sequelizeConnection: Sequelize = new Sequelize(
  DB_DATABASE,
  DB_USERNAME,
  DB_PASSWORD,

  {
    host: DB_HOST,
    dialect: "mysql",
    port: Number(DB_PORT),
  }
);

export default sequelizeConnection;
