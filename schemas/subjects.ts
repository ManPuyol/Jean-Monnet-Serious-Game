import { pgTable, serial, boolean, timestamp } from "drizzle-orm/pg-core";

export const subjects = pgTable('subjects', {
  id: serial('id').primaryKey(),
//   name: ,
//   description: ,
  active: boolean('active').default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});