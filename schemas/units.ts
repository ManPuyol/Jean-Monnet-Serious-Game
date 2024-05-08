import { pgTable, serial, boolean, timestamp, integer, varchar, smallint, text } from "drizzle-orm/pg-core";
import { subjects } from "./subjects";

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	subjectId: integer("subject_id").notNull().references(() => subjects.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	active: boolean("active").default(true),
	questionsPerQuiz: smallint("questions_per_quiz").default(10).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	name: text("name"),
});


export type Unit = typeof units.$inferSelect;
export type InsertUnit = typeof units.$inferInsert;