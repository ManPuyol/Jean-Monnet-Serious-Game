import { pgTable, serial, boolean, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes";
import { users } from "./users";
import { questions } from "./questions";
import { units } from "./units";


export const quizDetails = pgTable("quiz_details", {
	id: serial("id").primaryKey().notNull(),
	quizId: integer("quiz_id").references(() => quizzes.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	userId: uuid("user_Id").references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	questionId: integer("question_id").references(() => questions.id, { onDelete: "cascade", onUpdate: "cascade" } ),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	unitId: integer("unit_id").references(() => units.id, { onDelete: "cascade", onUpdate: "cascade" } ),
});