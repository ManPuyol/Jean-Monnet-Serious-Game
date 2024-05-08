import { pgTable, serial, boolean, timestamp, integer, varchar, smallint } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { subjects } from "./subjects";
import { z } from "zod";

export const units = pgTable("units", {
	id: serial("id").primaryKey().notNull(),
	description: varchar("description", { length: 256 }).notNull(),
	subjectId: integer("subject_id").references(() => subjects.id).notNull(),
	active: boolean("active").default(true),
	questionsPerQuiz: smallint("questions_per_quiz").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});


export type Unit = typeof units.$inferSelect;
export type InsertUnit = typeof units.$inferInsert;

export const insertUnitSchema = createInsertSchema(units, {
	questionsPerQuiz: z.coerce.number().gte(5).lte(15).int().default(10),
	subjectId: z.optional(z.number()),
});
export const selectUnitSchema = createSelectSchema(units);