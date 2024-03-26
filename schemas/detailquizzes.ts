import { pgTable, serial, boolean, timestamp, integer } from "drizzle-orm/pg-core";
import { quizzes } from "./quizzes";
import { users } from "./users";
import { questions } from "./questions";
import { subjects } from "./subjects";
import { answers } from "./answers";


export const detailquizzes = pgTable('detailquizzes', {
    id: serial('id').primaryKey(),
    quizzId: integer('quizz_id').references(() => quizzes.id),
    userId: integer('user_Id').references(() => users.id),
    questionId: integer('question_id').references(() => questions.id),
    subjectId: integer('subject_id').references(() => subjects.id),
    answerId: integer('answer_id').references(() => answers.id),
    correct: boolean('correct').default(false),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  });