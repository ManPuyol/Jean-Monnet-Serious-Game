import { pgTable, serial, boolean, timestamp, integer, varchar, smallint } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { subjects } from "./subjects";

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	description: varchar("description", { length: 256 }),
	subjectId: integer("subject_id").references(() => subjects.id),
	active: boolean("active").default(true),
	questionsPerQuiz: smallint("questions_per_quiz").default(10),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});


export type Unit = typeof units.$inferSelect;
export type InsertUnit = typeof units.$inferInsert;

export const insertUnitSchema = createInsertSchema(units);
export const selectUnitSchema = createSelectSchema(units);