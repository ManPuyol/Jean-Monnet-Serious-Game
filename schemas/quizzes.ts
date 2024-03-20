import { pgTable, serial, boolean, timestamp, integer, varchar } from "drizzle-orm/pg-core";
import { users } from "./users";

export const quizzes = pgTable('quizzes', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  // score: , 
  meta: varchar('meta').notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});