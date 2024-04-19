import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable("languages", {
	id: serial("id").primaryKey().notNull(),
	language: varchar("language", { length: 256 }).notNull(),
});