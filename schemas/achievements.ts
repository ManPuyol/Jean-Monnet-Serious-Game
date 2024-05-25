import { pgTable, serial, smallint, timestamp, varchar } from "drizzle-orm/pg-core";

export const achievements = pgTable("achievements", {
	id: serial("id").primaryKey().notNull(),
	name: varchar("name", { length: 256 }),
	description: varchar("description", { length: 256 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	threshold: smallint("threshold"),
	type: smallint("type"),
});