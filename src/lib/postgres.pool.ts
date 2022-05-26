import { Pool } from "pg";
import { config } from "../config/config";

const USER = encodeURIComponent(config.dbUser!);
const PASSWORD = encodeURIComponent(config.dbPassword!);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

export const pool = new Pool({ connectionString: URI });

/* {
  host: "localhost",
  port: 5432,
  user: "root",
  password: "123456",
  database: "my_db_store",
} */
