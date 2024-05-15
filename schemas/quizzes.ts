import { pgTable, serial, timestamp, uuid, varchar, smallint, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { units } from "./units";

export const quizzes = pgTable("quizzes", {
	id: serial("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	score: smallint("score"),
	meta: varchar("meta", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;