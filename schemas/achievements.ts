import { pgTable, serial, timestamp, integer, varchar } from "drizzle-orm/pg-core";

export const achievements = pgTable('achievements', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    description: varchar('description', { length: 256 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });