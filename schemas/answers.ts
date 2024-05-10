import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { questions } from "./questions";

export const answers = pgTable("answers", {
	id: serial("id").primaryKey().notNull(),
	questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	name: varchar("name", { length: 256 }),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow().notNull(),
});