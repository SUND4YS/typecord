import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "pass",
    database: "myapp",
});
export const db = drizzle(pool);
