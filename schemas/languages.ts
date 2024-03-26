import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { resources } from "./resources";

export const languages = pgTable('languages', {
  id: serial('id').primaryKey(),
  resourceId: integer('resource_id').references(() => resources.id),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});