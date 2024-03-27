import { pgTable, serial, timestamp, integer, varchar, smallint } from "drizzle-orm/pg-core";
import { users } from "./users";

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  score: smallint('score').notNull(), 
  meta: varchar('meta', { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});