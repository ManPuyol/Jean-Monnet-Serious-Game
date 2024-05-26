import { pgTable, integer, text } from 'drizzle-orm/pg-core';

export const viewCounterAchievements = pgTable('view_counter_achievements', {
    userId: text('user_id').primaryKey(),
    quizzesDone: integer('quizzes_done'),
    quizzesPassed: integer('quizzes_passed'),
    quizzesPerfect: integer('quizzes_perfect'),
});