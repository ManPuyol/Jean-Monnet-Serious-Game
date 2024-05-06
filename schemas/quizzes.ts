import { pgTable, serial, timestamp, uuid, varchar, smallint, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { subjects } from "./subjects";

export const quizzes = pgTable("quizzes", {
	id: serial("id").primaryKey().notNull(),
	userId: uuid("user_id").references(() => users.id),
	score: smallint("score").notNull(),
	meta: varchar("meta", { length: 256 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
	subjectId: integer("subject_id").references(() => subjects.id),
});

export type Quiz = typeof quizzes.$inferSelect;
export type InsertQuiz = typeof quizzes.$inferInsert;