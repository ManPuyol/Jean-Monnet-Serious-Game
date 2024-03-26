import { pgTable, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { resources } from "./resources";
import { questions } from "./questions";

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(),
  questionId: integer('question_id').references(() => questions.id),
  resource: integer('resource').references(() => resources.id),
  correct: boolean(`correct`).default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});