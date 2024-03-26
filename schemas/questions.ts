import { pgTable, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { topics } from "./topics";
import { resources } from "./resources";

export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  resourceId: integer('resource_id').references(() => resources.id),
  difficulty: integer('difficulty'),
  active: boolean('active').default(true),
  subjectId: integer('subject_id').references(() => topics.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});