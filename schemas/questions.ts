import { pgTable, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { topics } from "./topics";

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
//   question: ,
  active: boolean('active').default(true),
  subjectId: integer('subject_id').references(() => topics.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});