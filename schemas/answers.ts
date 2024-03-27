import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { questions } from "./questions";

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id),
  answer: varchar('name', { length: 256 }),
  correct: boolean(`correct`).default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});