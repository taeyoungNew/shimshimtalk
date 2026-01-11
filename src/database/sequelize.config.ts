import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_USERNAME,
  DB_PORT,
  DB_DIALECT,
} from "../config";

const config = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT as any, // Sequelize.Dialect 타입 지정 가능
};

export default config;
