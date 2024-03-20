import { pgTable, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { subjects } from "./subjects";

export const topics = pgTable('topics', {
  id: serial('id').primaryKey(),
//   name: ,
//   description: ,
  active: boolean('active').default(true),
  subjectId: integer('subject_id').references(() => subjects.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});