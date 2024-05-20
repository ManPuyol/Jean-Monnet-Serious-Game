import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { units } from "./units";

export const questions = pgTable("questions", {
	id: serial("id").primaryKey().notNull(),
	unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	question: varchar("question", { length: 256 }).notNull(),
	hard: boolean("hard").default(false),
	active: boolean("active").default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});

export type Question = typeof questions.$inferSelect