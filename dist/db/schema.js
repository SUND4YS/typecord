import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { create } from "node:domain";
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    createdAt: text("created_at").notNull(),
});
