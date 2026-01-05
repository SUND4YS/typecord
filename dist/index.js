import { db } from "./db";
import { users } from "./db/schema";
async function main() {
    const res = await db.select().from(users);
    console.log("Users:", res);
    process.exit(0);
}
main().catch((err) => { console.error(err); process.exit(1); });
