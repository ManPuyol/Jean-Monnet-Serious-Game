import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { languages } from "./languages";

export const resources = pgTable('resources', {
  id: serial('id').primaryKey(),
  token: varchar('token', { length: 256 }),
  languageId: integer('language_id').references(() => languages.id),
  resource: varchar('resource', { length: 256 })
});