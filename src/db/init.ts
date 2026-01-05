import { Pool } from "pg";

const pool = new Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "pass",
  database: "myapp",
});

async function init() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id serial PRIMARY KEY,
        name text NOT NULL
      )
    `);
    console.log("Table 'users' ensured");
  } finally {
    client.release();
    await pool.end();
  }
}

init().catch((err) => {
  console.error(err);
  process.exit(1);
});
