import { pgTable, serial, boolean, integer } from "drizzle-orm/pg-core";
import { resources } from "./resources";

export const answers = pgTable('answers', {
  id: serial('id').primaryKey(), //por que crear pregunta_id ???? es el mismo ID
  resource: integer('resource').references(() => resources.id),
  correct: boolean(`correct`).default(false),
});