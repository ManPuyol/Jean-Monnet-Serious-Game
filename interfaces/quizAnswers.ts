import { pgTable, integer, uuid, boolean} from "drizzle-orm/pg-core"

export const quizAnswers = pgTable("quizAnswers", {
	userId: uuid("user_id").notNull(),
    questionId: integer("questionId").notNull(),
    correct: boolean("correct").notNull(),
});

export type QuizAnswers = typeof quizAnswers.$inferSelect;