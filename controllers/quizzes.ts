"use server";
import { InsertQuiz, quizzes, Quiz } from "@/schemas/quizzes";
import { units, Unit } from "@/schemas/units";
import { db } from "@/utils/drizzle/db";
import { UUID } from "crypto";

import { eq, and, count, gt, gte } from "drizzle-orm";

export const addQuiz = async (quiz: InsertQuiz) => {
    await db
    .insert(quizzes)
    .values(quiz);
};

export const allQuizzes = async () => {
    const data = await db
    .select()
    .from(quizzes);

    return data;
};

export const deleteQuiz = async (id: number) => {
  await db
  .delete(quizzes)
  .where(
    eq(quizzes.id, id)
  );
};

export const updateQuiz = async (id: number, quiz: InsertQuiz) => {
    await db
    .update(quizzes)
    .set({
      ...quiz,
      updatedAt: new Date().toDateString(),
    })
    .where(
      eq(quizzes.id, id)
    );
};

export const getActiveQuizzes = async (userId : UUID, subjectID: number) => {
    const data = await db
    .select({
        unit : {
            id : units.id,
            description : units.description,
            name : units.name
        },
        quiz : quizzes
    })
    .from(units)
    .where(eq(units.subjectId, subjectID))
    .leftJoin(quizzes, eq(units.id, quizzes.unitId))

    const result = data.reduce<Record<number, { unit: Unit; quizzes: Quiz[] }>>(
        (acc, row) => {
          const unit = row.unit;
          const quiz = row.quiz;
          if (!acc[unit.id]) {
            acc[unit.id] = { unit, quizzes: [] };
          }
          if (quiz) {
            acc[unit.id].quizzes.push(quiz);
          }
          return acc;
        },
        {}
      );
    
    return result;
}

export const getCountQuizzes = async (userId : UUID) => {
    const data = await db
    .select(
        {count: count()}
    )
    .from(quizzes)
    .where(
      eq(quizzes.userId, userId),
    );

    return data;
}

export const getCountQuizzesAbovePercentage = async (userId : UUID, percentage : number) => {
    const data = await db
    .select(
        {count: count()}
    )
    .from(quizzes)
    .where(
        and(
            eq(quizzes.userId, userId),
            gt(quizzes.score, percentage)
        )
    );

    return data;
}

export const getCountQuizzesPassed = async (userId : UUID) => {
    const PERCENTAGE_TO_PASS_EXAM = 70;
    const data = await getCountQuizzesAbovePercentage(userId, PERCENTAGE_TO_PASS_EXAM);
    return data;
}

export const getQuiz = async (userId : UUID, quizId : number) => {

  // const hayScore = select score from quiz where score IS NOT null
  // if (hayScore)
    // SELECT id FROM questions WHERE NOT EXISTS (SELECT question_id FROM quiz_details WHERE user_id = ... AND unit_id = ...)
    // ORDER BY RANDOM() LIMIT questions_per_quiz
    // INSERT QUIZ_DETAILS
  // {question : questions , question: answers[]}

}