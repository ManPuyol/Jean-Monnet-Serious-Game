import { pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  language: varchar('language', { length: 256 }).notNull(),
});