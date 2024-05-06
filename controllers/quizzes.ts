"use server";
import { InsertQuiz, quizzes } from "@/schemas/quizzes";
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

// Nº de quizzes hechos por el usuario
export const getCountQuizzesFromUserAndSubject = async (userId : UUID, subjectId: number) => {
    const data = await db
    .select(
        {count: count()}
    )
    .from(quizzes)
    .where(
        and(
            eq(quizzes.userId, userId), 
            eq(quizzes.subjectId, subjectId)
        )
    );

    return data;
}

// Nº de quizzes hechos por el usuario sobre el porcentaje definido en los parametros
export const getCountQuizzesFromUserAbovePercentage = async (userId : UUID, percentage : number) => {
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

// Nº de quizzes hechos por el usuario sobre el porcentaje y asignatura definido en parametros
export const getCountQuizzesFromUserAbovePercentageAndSubject = async (userId : UUID, percentage : number, subjectId: number) => {
    const data = await db
    .select(
        {count: count()}
    )
    .from(quizzes)
    .where(
        and(
            eq(quizzes.userId, userId),
            eq(quizzes.subjectId, subjectId),
            gte(quizzes.score, percentage)
        )
    );

    return data;
}

// Nº de quizzes hechos por el usuario sobre el porcentaje (70%) y asignatura definida en parametros
export const getCountQuizzesPassedFromUserAndSubject = async (userId : UUID, subjectId: number) => {
    const PERCENTAGE_TO_PASS_EXAM = 70;
    const data = await getCountQuizzesFromUserAbovePercentageAndSubject(userId, PERCENTAGE_TO_PASS_EXAM, subjectId);
    return data;
}

// Resultados de los quizzes de una asignatura para las bolas de resultados
export const getScoresFromQuizzesOfUserAndSubject = async (userId : UUID, subjectId: number) => {
    const data = await db
    .select(
        {
            quizzId: quizzes.id,
            score: quizzes.score
        }
    )
    .from(quizzes)
    .where(
        and(
            eq(quizzes.userId, userId), 
            eq(quizzes.subjectId, subjectId)
        )
    );

    return data;
}