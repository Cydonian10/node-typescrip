import { Client } from "pg";

export async function getConnection() {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "root",
    password: "123456",
    database: "my_db_store",
  });

  await client.connect();
  return client;
}
