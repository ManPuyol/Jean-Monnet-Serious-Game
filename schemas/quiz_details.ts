import { pgTable, serial, boolean, timestamp, integer, uuid } from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes";
import { users } from "./users";
import { questions } from "./questions";
import { subjects } from "./subjects";


export const quizDetails = pgTable("quiz_details", {
	id: serial("id").primaryKey().notNull(),
	quizId: integer("quiz_id").references(() => quizzes.id),
	userId: uuid("user_Id").references(() => users.id),
	questionId: integer("question_id").references(() => questions.id),
	subjectId: integer("subject_id").references(() => subjects.id),
	correct: boolean("correct").default(false),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
});
