import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { subjects } from "./subjects";
import { resources } from "./resources";

export const topics = pgTable('topics', {
  id: serial('id').primaryKey(),
  name: varchar('description', { length: 256 }),
  subjectId: integer('subject_id').references(() => subjects.id),
  resourceId: integer('resource_id').references(() => resources.id),
  active: boolean('active').default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});