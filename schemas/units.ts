import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { subjects } from "./subjects";

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  name: varchar('description', { length: 256 }),
  subjectId: integer('subject_id').references(() => subjects.id),
  active: boolean('active').default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});