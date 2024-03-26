import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { resources } from "./resources";

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  resourceId: integer('resource_id').references(() => resources.id)
});